import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Button, DialogActions, DialogContent, Box } from '@mui/material'; // Box 추가
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// Common
import { client } from '../../../constraints'; 
import { useModal } from "../../../context/ModalContext";
import { useCommonData } from "../../../context/CommonDataContext";
import { 
  gvGridDropdownDisLabel, 
  gvSetDropdownData, 
  gvGetToday,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser, 
  gvDataGridAddRowAndStatus
} from "../../../components/Common";

import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

import { 
  FrmSelect, 
  FrmTextField, 
  FrmDate, 
  GridDateRenderField, 
  GridDateSetField, 
  GridNumberSetField 
} from '../../../components/SearchBar/CmmnTextField';

// Popup
import OutboundPlanItemPop from './OuboundPlanItemPop';

// --- 인터페이스 정의 ---

const fieldLabels: { [key: string]: string } = {
  obNo: '출고번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  obGbnCd: '출고구분',
  obProgStCd: '출고진행상태',
  obPlanYmd: '출고예정일',
  storeCd: '배송처',
  remark: '비고',
  useYn: '사용여부',
};

interface OutboundPlanFormData {
  obNo: string;
  dcCd: string;
  clientCd: string;
  obGbnCd: string;
  obProgStCd: string;
  obPlanYmd: string;
  storeCd: string;
  carNo: string;
  remark: string;
  useYn: string;
  modFlag?: string;
  data?: any[];
  [key: string]: any;
}

interface OutboundPlanDetailData {
  id: number;
  obNo?: string;
  obDetailSeq?: number;
  obProgStCd: string;
  itemCd?: string;
  itemNm?: string;
  itemStCd: string;
  pkqty?: number;
  planTotQty: number;
  planBoxQty: number;
  planEaQty: number;
  planQty: number;
  ibCost?: number;
  ibVat?: number;
  ibAmt?: number;
  makeLot?: string;
  makeYmd?: string;
  distExpiryYmd?: string;
  useYn: string;
  remark?: string;
  [key: string]: any;
}

interface OutboundPlanPopProps {
  obNo?: string;
}

export default function OutboundPlanPop(props: OutboundPlanPopProps) {
  const key = 'OUTBOUND_PLAN_POP';
  const PRO_URL = '/wms/ob/outboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { getCodesCmbByGroupCode } = useCommonData();
  
  const [formData, setFormData] = useState<OutboundPlanFormData>({
    obNo: '',
    dcCd: '',
    clientCd: '',
    obGbnCd: '12',
    obProgStCd: '10',
    obPlanYmd: gvGetToday(),
    storeCd: '',
    carNo: '',
    remark: '',
    useYn: 'Y',
  });

  const [selRowId, setSelRowId] = useState<GridRowId>(-1); 
  const [dataList, setDataList] = useState<OutboundPlanDetailData[]>([]);

  // 콤보박스
  const [dcCmb, setDcCmb] = useState<any[]>([]);
  const [clientCmb, setClientCmb] = useState<any[]>([]);
  const [storeCmb, setStoreCmb] = useState<any[]>([]);
  const [obGbnCdCmb, setObGbnCdCmb] = useState<any[]>([]);
  const [obProgStCdCmb, setObProgStCdCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [itemStCdCmb, setItemStCdCmb] = useState<any[]>([]);

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "obNo", headerName: "출고번호", editable: false, align: "left", width: 120 },
    { field: "obDetailSeq", headerName: "출고상세순번", editable: false, align: "left", width: 120 },
    { 
      field: "obProgStCd", headerName: "출고진행상태코드", align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: obProgStCdCmb,
    },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 300 },
    { 
      field: "itemStCd", headerName: "상품상태코드", editable: false, align: "center", 
      type: "singleSelect", valueOptions: itemStCdCmb, valueFormatter: gvGridDropdownDisLabel,
    },
    { field: "pkqty", headerName: "입수", editable: false, align: "center", width: 100 },
    { field: "planTotQty", headerName: "예정(총)", editable: false, align: "right", width: 100 },
    { 
      field: "planBoxQty", headerName: "예정(박스)", editable: true, align: "right", width: 100,
      preProcessEditCellProps: gvGridFieldNumberPreEdit as any,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
      valueParser: (value: any) => gvGridFieldNumberParser(value)
    },
    { 
      field: "ibCost", headerName: "입고단가", editable: false, align: "left", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "ibVat", headerName: "입고VAT", editable: false, align: "left", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "ibAmt", headerName: "입고금액", editable: false, align: "left", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "makeLot", headerName: "제조LOT", editable: true, align: "left", width: 100,
      valueSetter: (params) => { return GridNumberSetField(params, 'makeLot'); },
    },
    { 
      field: "makeYmd", headerName: "제조일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => { return GridDateSetField(params, 'makeYmd'); },
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { 
      field: "distExpiryYmd", headerName: "유통기한일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => { return GridDateSetField(params, 'distExpiryYmd'); },
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { 
      field: "useYn", headerName: "사용여부", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb,
    },
    { field: "remark", headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  useEffect(() => {
    if (props.obNo && props.obNo !== '') {
      setFormData(prev => ({ ...prev, modFlag: "I" }));
    } else {
      setFormData(prev => ({ ...prev, modFlag: "U" }));
    }
    
    if (storeCmb.length > 0) return;

    if (dcCmb.length === 0) fnSearchDc();
    if (clientCmb.length === 0) fnSearchClient();

    if (useYnCmb.length === 0) setUseYnCmb(getCodesCmbByGroupCode('USE_YN'));
    if (obGbnCdCmb.length === 0) setObGbnCdCmb(getCodesCmbByGroupCode('OB_GBN_CD'));
    if (obProgStCdCmb.length === 0) setObProgStCdCmb(getCodesCmbByGroupCode('OB_PROG_ST_CD'));
    if (itemStCdCmb.length === 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

    if (clientCmb.length > 0 && formData.clientCd !== '') {
        fnSearchStore({ clientCd : formData.clientCd });
    }
  }, [dcCmb, clientCmb, useYnCmb, obGbnCdCmb, obProgStCdCmb, storeCmb, itemStCdCmb, props.obNo, formData.clientCd]);

  const handleChange = (value: any, id?: string) => {
    if (!id) return;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === "clientCd") {
      setFormData(prev => ({ ...prev, ["storeCd"]: '' }));
      fnSearchStore({ "clientCd" : value });
    }
  };

  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcCmbList`, null)
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  };
  
  const fnSearchClient = async () => {
    await client.post(`${PRO_URL}/selectClientCmbList`, null)
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  };
  
  const fnSearchStore = async (data: any) => {
    await client.post(`${PRO_URL}/selectStoreCmbList`, data)
      .then(res => {
        setStoreCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  };

  const handleSubmit = (key: string) => {
    if (formData.dcCd === '') {
      openModal('', 'I', '물류센터 를 선택해주세요.');
      return;
    }
    if (formData.clientCd === '') {
      openModal('', 'I', '고객사 를 선택해주세요.');
      return;
    }
    if (formData.storeCd === '') {
      openModal('', 'I', '배송처 를 선택해주세요.');
      return;
    }
    if (formData.obPlanYmd === '') {
      openModal('', 'I', '출고예정일 을 입력해주세요.');
      return;
    }
    
    openModal('', '', '저장 하시겠습니까?', 
      () => {
        const submitData = { ...formData };
        submitData.data = dataList;

        if (submitData.data.length === 0) {
          openModal('', 'I', '상품을 선택해주세요');
          return;
        }

        client.post(`${PRO_URL}/saveOutboundPlan`, submitData)
          .then(res => {
            if (res.data.stsCd !== 200) {
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '저장 되었습니다.');
            closeModal(key);
          }).catch(error => { 
            console.log('error = ' + error); 
          })
      }
    );
  };

  const handleItemUpdate = (data: any[]) => {
    if (data && data.length > 0) {
      const updatedDataList = gvDataGridAddRowAndStatus(dataList, data, {
        obProgStCd: '10',
        itemStCd: '10',
        planQty : 0,
        planTotQty: 0,
        planBoxQty: 0,
        planEaQty: 0,
        useYn: 'Y',
      });
      setDataList(updatedDataList);
    }
  };

  function onClickAdd() {
    if (formData.clientCd === '') {
      openModal('', 'A', "고객사를 먼저 선택해주세요");
      return;
    }
    openModal('FIND_OUTBOUND_ITEM', '상품 찾기', <OutboundPlanItemPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
  }

  function onClickDel() {
    // 삭제 로직 구현 필요
  }

  function onChangeChks(chkRows: any[]) {
    if (updateModalData && getModalData) {
        updateModalData(key, { ...getModalData(key), 'data': chkRows });
    }
  }
  
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: { id: GridRowId, field: string, value: any }) => {
      if (['planBoxQty', 'planEaQty'].includes(field)) {
        const updatedRows = dataList.map((row) => {
          if (row.id === id) {
            const numValue = Number(value);
            const pkqty = row.pkqty || 0;
            const currentBoxQty = field === 'planBoxQty' ? numValue : (row.planBoxQty || 0);
            const currentEaQty = field === 'planEaQty' ? numValue : (row.planEaQty || 0);
            
            const totalQty = (currentBoxQty * pkqty) + currentEaQty;

            const updatedRow = {
              ...row,
              [field]: numValue,
              planTotQty: totalQty,
              planQty: totalQty,
            };
            return updatedRow;
          }
          return row;
        });
        setDataList(updatedRows);
      }
    },
    [dataList]
  );

  return (
    <>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 폼 영역 */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FrmTextField
                id="obNo"
                label={fieldLabels["obNo"]}
                value={formData.obNo}
                onChange={handleChange}
                readonly
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmSelect
                id="dcCd"
                label={fieldLabels["dcCd"]}
                value={formData.dcCd}
                options={dcCmb}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmSelect
                id="clientCd"
                label={fieldLabels["clientCd"]}
                value={formData.clientCd}
                options={clientCmb}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmSelect
                id="obGbnCd"
                label={fieldLabels["obGbnCd"]}
                value={formData.obGbnCd}
                options={obGbnCdCmb}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmSelect
                id="obProgStCd"
                label={fieldLabels["obProgStCd"]}
                value={formData.obProgStCd}
                options={obProgStCdCmb}
                onChange={handleChange}
                readonly
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmDate
                label={fieldLabels["obPlanYmd"]}
                selected={formData.obPlanYmd}
                onChange={(val) => handleChange(val, "obPlanYmd")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmSelect
                id="storeCd"
                label={fieldLabels["storeCd"]}
                value={formData.storeCd}
                options={storeCmb}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmTextField
                id="remark"
                label={fieldLabels["remark"]}
                value={formData.remark}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmSelect
                id="useYn"
                label={fieldLabels["useYn"]}
                value={formData.useYn}
                options={useYnCmb}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        {/* 그리드 영역 */}
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ComDeGrid 
            onClickAdd={onClickAdd}
            onClickDel={onClickDel}
            dataList={dataList}
            columns={columns}
            onRowClick={(params) => { setSelRowId(params.id) }}
            onCellEditCommit={handleEditCellChangeCommitted}
            type={"multi"}
            onChangeChks={onChangeChks}
            height="100%"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(key)}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}