import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { DialogActions, DialogContent, Button } from '@mui/material';
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
import { client } from '../../../constraints'; // 오타 수정 contraints -> constraints

// --- 인터페이스 정의 ---

// 그리드 행 데이터 인터페이스
interface OutboundItemData {
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

// Props 인터페이스
interface OutboundPlanItemPopProps {
  formData: {
    clientCd: string;
    [key: string]: any;
  };
}

export default function OutboundPlanItemPop(props: OutboundPlanItemPopProps) {
  const { formData } = props;
  const key = 'FIND_OUTBOUND_ITEM'; // 키값 수정 (Inbound -> Outbound)
  const PRO_URL = '/wms/ob/outboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  // 그리드에서 선택된 행 ID 저장
  const [selRowId, setSelRowId] = useState<GridRowId>(-1); 
  // 데이터 리스트 상태
  const [dataList, setDataList] = useState<OutboundItemData[]>([]);
  // 선택된 체크박스 행들
  const [dtlChkRows, setDtlChkRows] = useState<OutboundItemData[]>([]);

  // 콤보박스 데이터 상태 관리
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]); 
  const [keepTempeGbnCdCmb, setKeepTempeGbnCdCmb] = useState<any[]>([]); 
  const [minUomCdCmb, setMinUomCdCmb] = useState<any[]>([]); 
  const [setItemYnCmb, setSetItemYnCmb] = useState<any[]>([]); 
  const [vatYnCmb, setVatYnCmb] = useState<any[]>([]); 
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]); 
  const [itemGbnCdCmb, setItemGbnCdCmb] = useState<any[]>([]); 

  // 데이터 그리드 컬럼 설정
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

  // 최초 렌더링 시 콤보박스 데이터 초기화
  useEffect(() => {
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD"));
    if (keepTempeGbnCdCmb.length === 0) setKeepTempeGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD'));
    if (minUomCdCmb.length === 0) setMinUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
    if (setItemYnCmb.length === 0) setSetItemYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (vatYnCmb.length === 0) setVatYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (itemGbnCdCmb.length === 0) setItemGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'ITEM_GBN_CD'));
  }, [clientCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb, itemGbnCdCmb, getCmbOfGlobalData]);

  // 서버에서 데이터 리스트를 가져오는 함수
  const fetchDataList = useCallback(() => {
    if (!formData.clientCd) return;
    const data = { clientCd: formData.clientCd };
    client.post(`${PRO_URL}/selectOutboundPlanItemPopList`, data)
      .then(res => setDataList(res.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [formData.clientCd]);

  // formData의 clientCd가 변경될 때마다 데이터를 다시 가져옴
  useEffect(() => {
    if (formData.clientCd) fetchDataList();
  }, [formData.clientCd, fetchDataList]);

  // 모달 확인 버튼 클릭 시 데이터 처리
  const handleSubmit = useCallback(() => {
    if (modals && modals[key]) {
        const modalInfo = modals[key];
        const modalData = getModalData(key);
        
        // 데이터가 선택되지 않았는데 확인을 눌렀을 경우, 현재 체크된 데이터를 사용
        const resultData = (modalData && modalData.data) ? modalData.data : dtlChkRows;

        if (modalInfo.callback && typeof modalInfo.callback === 'function') {
            modalInfo.callback(resultData);
            closeModal(key);
        }
    }
  }, [modals, closeModal, getModalData, dtlChkRows, key]);

  // 그리드에서 체크박스 선택 시 처리 함수
  const handleSelectionChange = useCallback((selectedRows: any[]) => {
    setDtlChkRows(selectedRows);
    if(updateModalData && getModalData) {
        updateModalData(key, { ...getModalData(key), data: selectedRows });
    }
  }, [updateModalData, key, getModalData]);

  return (
    <>
      <DialogContent>
        <ComDeGrid
          onClickSelect={fetchDataList} // 조회 버튼 클릭 시 호출
          title="Outbound Detail List" // 그리드 제목
          dataList={dataList} // 데이터 리스트
          columns={columns} // 컬럼 정의
          onRowClick={(params) => setSelRowId(params.id)} // 행 클릭 시 선택된 행 ID 업데이트
          onCellDoubleClick={() => handleSubmit()} // 행 더블클릭 시 handleSubmit 함수 호출
          // onCellEditCommit은 편집 가능한 컬럼이 있을 때 사용
          onCellEditCommit={(params) => {
            const updatedDataList = dataList.map(row =>
              row.id === params.id ? { ...row, [params.field]: params.value } : row
            );
            setDataList(updatedDataList); 
          }}
          type="multi"
          onChangeChks={(chkRows) => handleSelectionChange(chkRows)} // 체크박스 선택 시 처리
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}