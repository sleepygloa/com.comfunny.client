import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Button, DialogActions, DialogContent, Box, IconButton, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

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
  FrmDate 
} from '../../../components/SearchBar/CmmnTextField';

// Popup
import StockMoveStockOfItemAndLocPop from "./StockMoveStockOfItemAndLocPop";
import StockMoveLocPop from "./StockMoveLocPop";

// --- 인터페이스 정의 ---

const fieldLabels: { [key: string]: string } = {
  moveNo: '이동번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  moveGbnCd: '이동구분',
  workStCd: '이동진행상태',
  workYmd: '작업일자',
};

interface StockMoveFormData {
  moveNo: string;
  dcCd: string;
  clientCd: string;
  moveGbnCd: string;
  workStCd: string;
  workYmd: string;
  modFlag?: string;
  data?: any[];
  [key: string]: any;
}

interface StockMoveDetailData {
  id: number;
  moveNo?: string;
  moveDetailSeq?: number;
  workStCd?: string;
  zoneNm?: string;
  locCd?: string;
  toLocCd?: string;
  itemCd?: string;
  itemNm?: string;
  itemStCd?: string;
  pkqty?: number;
  stockQty?: number;
  stockBoxQty?: number;
  lotId?: string;
  instQty?: number; 
  useYn?: string;
  [key: string]: any;
}

interface StockMovePopProps {
  moveNo?: string;
}

export default function StockMovePop(props: StockMovePopProps) {
  const key = 'STOCK_MOVE_POP';
  const PRO_URL = '/wms/st/stockMove';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { getCodesCmbByGroupCode } = useCommonData();
  
  const [formData, setFormData] = useState<StockMoveFormData>({
    moveNo: '',
    dcCd: '',
    clientCd: '',
    moveGbnCd: '30',
    workStCd: '10',
    workYmd: gvGetToday(),
  });

  const [selRowId, setSelRowId] = useState<GridRowId>(-1); 
  const [dataList, setDataList] = useState<StockMoveDetailData[]>([]);

  const [dcCmb, setDcCmb] = useState<any[]>([]);
  const [clientCmb, setClientCmb] = useState<any[]>([]);
  const [moveGbnCdCmb, setmoveGbnCdCmb] = useState<any[]>([]);
  const [workStCdCmb, setworkStCdCmb] = useState<any[]>([]);
  const [itemStCdCmb, setItemStCdCmb] = useState<any[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "zoneNm", headerName: "존명", width: 100, align: "left" },
    { field: "locCd", headerName: "FR로케이션", width: 100, align: "left" },
    { 
      field: "toLocCd", headerName: "TO로케이션", width: 100, align: "left",
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton size="small" onClick={() => handleLocSearch(params.row)}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 200 },
    { 
      field: "itemStCd", headerName: "상품상태코드", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: itemStCdCmb,
    },
    { field: "pkqty", headerName: "입수", editable: false, align: "right", width: 100 },
    { field: "stockQty", headerName: "재고(총)", editable: false, align: "right", width: 100 },
    { 
      field: "stockBoxQty", headerName: "재고(박스)", editable: false, align: "right", width: 100,
      preProcessEditCellProps: gvGridFieldNumberPreEdit as any,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
      valueParser: (value: any) => gvGridFieldNumberParser(value)
    },
    { field: "lotId", headerName: "LOT_ID", width: 150, align: "left" },
  ];

  useEffect(() => {
    if (props.moveNo && props.moveNo !== '') {
      setFormData(prev => ({ ...prev, modFlag: "I" }));
    } else {
      setFormData(prev => ({ ...prev, modFlag: "U" }));
    }

    if (dcCmb.length === 0) fnSearchDc();
    if (clientCmb.length === 0) fnSearchClient();

    if (moveGbnCdCmb.length === 0) setmoveGbnCdCmb(getCodesCmbByGroupCode('MOVE_GBN_CD'));
    if (workStCdCmb.length === 0) setworkStCdCmb(getCodesCmbByGroupCode('WORK_ST_CD'));
    if (itemStCdCmb.length === 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

  }, [dcCmb, clientCmb, moveGbnCdCmb, workStCdCmb, itemStCdCmb, props.moveNo, getCodesCmbByGroupCode]);

  const handleChange = (value: any, id?: string) => {
    if (!id) return;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const fnSearchDc = async () => {
    await client.post(`wms/ib/inboundPlan/selectDcCmbList`, null)
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }
  
  const fnSearchClient = async () => {
    await client.post(`wms/ib/inboundPlan/selectClientCmbList`, null)
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }

  const handleSubmit = (key: string) => {
    if (modals && modals[key]) {
        // 콜백 처리 로직
    }

    if (formData.dcCd === '') {
      openModal('', 'I', '물류센터 를 선택해주세요.');
      return;
    }
    if (formData.clientCd === '') {
      openModal('', 'I', '고객사 를 선택해주세요.');
      return;
    }
    if (formData.workYmd === '') {
      openModal('', 'I', '작업일자 을 입력해주세요.');
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

        client.post(`${PRO_URL}/saveStockMove`, submitData)
          .then(res => {
            if (res.data.stsCd !== undefined && res.data.stsCd !== 200) {
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
        workStCd: '10',
        itemStCd: '10',
        instQty: data[0].stockQty, 
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
    openModal('FIND_STOCK_LOC_ITEM', '상품 찾기', <StockMoveStockOfItemAndLocPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
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
    ({  }: { id: GridRowId, field: string, value: any }) => {
        // 현재는 로직 없음
    },
    [dataList]
  );

  const handleLocSearch = (row: any) => {
    openModal('FIND_TO_LOC', '로케이션 찾기', <StockMoveLocPop />, (data: any) => {
      if(data) {
        const updatedList = dataList.map((r) =>
          r.id === row.id ? { ...r, toLocCd: data.locCd } : r
        );
        setDataList(updatedList);
      }
    }, '600px', '600px');
  };

  return (
    <>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FrmTextField
                id="moveNo"
                label={fieldLabels["moveNo"]}
                value={formData.moveNo}
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
                id="moveGbnCd"
                label={fieldLabels["moveGbnCd"]}
                value={formData.moveGbnCd}
                options={moveGbnCdCmb}
                onChange={handleChange}
                readonly
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmSelect
                id="workStCd"
                label={fieldLabels["workStCd"]}
                value={formData.workStCd}
                options={workStCdCmb}
                onChange={handleChange}
                readonly
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FrmDate
                label={fieldLabels["workYmd"]}
                selected={formData.workYmd}
                onChange={(val) => handleChange(val, "workYmd")}
              />
            </Grid>
          </Grid>
        </Box>

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