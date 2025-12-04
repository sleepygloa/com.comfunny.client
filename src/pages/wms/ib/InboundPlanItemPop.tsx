import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { DialogActions, DialogContent, Button, Box } from '@mui/material'; // Box 추가
import { GridColDef, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// Common
import { useModal } from "../../../context/ModalContext";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { useCommonData } from "../../../context/CommonDataContext";
import { 
  gvGridDropdownDisLabel, 
  gvGridFieldNumberFormatter,
  gvGetRowDataListOfChk
} from "../../../components/Common";
import { client } from '../../../constraints'; // 오타 수정

// --- 인터페이스 정의 ---

interface InboundItemData {
  id: number;
  itemCd: string;
  itemNm: string;
  itemSpec: string;
  itemGbnCd: string;
  pkqty: number;
  ibCost: number;
  obCost: number;
  keepTempeGbnCd: string;
  minUomCd: string;
  setItemYn: string;
  vatYn: string;
  useYn: string;
  remark: string;
  [key: string]: any;
}

interface InboundPlanItemPopProps {
  formData: {
    clientCd: string;
    [key: string]: any;
  };
}

export default function InboundPlanItemPop(props: InboundPlanItemPopProps) {
  const { formData } = props;
  const key = 'FIND_INBOUND_ITEM';
  const PRO_URL = '/wms/ib/inboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState<GridRowId>(-1); 
  const [dataList, setDataList] = useState<InboundItemData[]>([]);
  const [dtlChkRows, setDtlChkRows] = useState<InboundItemData[]>([]);

  // 콤보박스
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]); 
  const [keepTempeGbnCdCmb, setKeepTempeGbnCdCmb] = useState<any[]>([]); 
  const [minUomCdCmb, setMinUomCdCmb] = useState<any[]>([]); 
  const [setItemYnCmb, setSetItemYnCmb] = useState<any[]>([]); 
  const [vatYnCmb, setVatYnCmb] = useState<any[]>([]); 
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]); 
  const [itemGbnCdCmb, setItemGbnCdCmb] = useState<any[]>([]); 

  // 컬럼 정의
  const columns: GridColDef[] = useMemo(() => [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 300 },
    { field: "itemSpec", headerName: "상품규격", editable: false, align: "left", width: 100 },
    { 
      field: "itemGbnCd", headerName: "상품구분", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: itemGbnCdCmb 
    },
    { field: "pkqty", headerName: "입수", editable: false, align: "center", width: 100 },
    { 
      field: "ibCost", headerName: "입고단가", editable: false, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "obCost", headerName: "출고단가", editable: false, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "keepTempeGbnCd", headerName: "보관온도구분", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: keepTempeGbnCdCmb 
    },
    { 
      field: "minUomCd", headerName: "최소단위코드", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: minUomCdCmb 
    },
    { 
      field: "setItemYn", headerName: "세트상품여부", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: setItemYnCmb 
    },
    { 
      field: "vatYn", headerName: "과세여부", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: vatYnCmb 
    },
    { 
      field: "useYn", headerName: "사용여부", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb 
    },
    { field: "remark", headerName: "비고", editable: false, align: "left", width: 300 }
  ], [itemGbnCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb]);

  useEffect(() => {
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD"));
    if (keepTempeGbnCdCmb.length === 0) setKeepTempeGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD'));
    if (minUomCdCmb.length === 0) setMinUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
    if (setItemYnCmb.length === 0) setSetItemYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (vatYnCmb.length === 0) setVatYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (itemGbnCdCmb.length === 0) setItemGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'ITEM_GBN_CD'));
  }, [clientCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb, itemGbnCdCmb, getCmbOfGlobalData]);

  const fetchDataList = useCallback(() => {
    if (!formData.clientCd) return;
    const data = { clientCd: formData.clientCd };
    client.post(`${PRO_URL}/selectInboundPlanItemPopList`, data)
      .then(res => setDataList(res.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [formData.clientCd]);

  useEffect(() => {
    if (formData.clientCd) fetchDataList();
  }, [formData.clientCd, fetchDataList]);

  const handleSubmit = useCallback(() => {
    if (modals && modals[key]) {
        const modalInfo = modals[key];
        const modalData = getModalData(key);
        // 체크된 데이터가 없으면 현재 상태의 dtlChkRows 사용
        const resultData = (modalData && modalData.data) ? modalData.data : dtlChkRows;

        if (modalInfo.callback && typeof modalInfo.callback === 'function') {
            modalInfo.callback(resultData);
            closeModal(key);
        }
    }
  }, [modals, closeModal, getModalData, dtlChkRows, key]);

  const handleSelectionChange = useCallback((selectedRows: any[]) => {
    setDtlChkRows(selectedRows);
    if(updateModalData && getModalData) {
        updateModalData(key, { ...getModalData(key), data: selectedRows });
    }
  }, [updateModalData, key, getModalData]);

  return (
    <>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ComDeGrid
            onClickSelect={fetchDataList}
            title="Inbound Detail List"
            dataList={dataList}
            columns={columns}
            onRowClick={(params) => setSelRowId(params.id)}
            onCellDoubleClick={() => handleSubmit()}
            type="multi"
            onChangeChks={(chkRows) => handleSelectionChange(chkRows)}
            height="100%"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">확인</Button>
        <Button onClick={() => closeModal(key)} variant="outlined" color="secondary">닫기</Button>
      </DialogActions>
    </>
  );
}