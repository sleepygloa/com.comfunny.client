import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useModal } from "../../../context/ModalContext.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { 
  gvGridDropdownDisLabel, 
  gvGridFieldNumberFormatter,
  gvGetRowDataListOfChk
} from "../../../components/Common.js";
import { client } from '../../../contraints.js';
import { DialogContent, DialogActions, Button } from '@mui/material';

// 팝업 컴포넌트
export default function OutboundPlanItemPop(props) {
  const { formData } = props; // 부모 컴포넌트에서 전달된 폼 데이터
  const key = 'FIND_OUTBOUND_ITEM'; // 모달 키값
  const PRO_URL = '/wms/ob/outboundPlan'; // API 엔드포인트
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { getCmbOfGlobalData } = useCommonData(); // 공통 코드 데이터 조회 함수

  // 그리드에서 선택된 행 ID 저장
  const [selRowId, setSelRowId] = useState(); 
  // 데이터 리스트 상태
  const [dataList, setDataList] = useState([]);
  // 선택된 체크박스 행들
  const [dtlChkRows, setDtlChkRows] = useState([]);

  // 콤보박스 데이터 상태
  const [clientCdCmb, setClientCdCmb] = useState([]); // 고객사 콤보박스
  const [keepTempeGbnCdCmb, setKeepTempeGbnCdCmb] = useState([]); // 보관 온도 구분
  const [minUomCdCmb, setMinUomCdCmb] = useState([]); // 최소 단위
  const [setItemYnCmb, setSetItemYnCmb] = useState([]); // 세트 상품 여부
  const [vatYnCmb, setVatYnCmb] = useState([]); // 과세 여부
  const [useYnCmb, setUseYnCmb] = useState([]); // 사용 여부
  const [itemGbnCdCmb, setItemGbnCdCmb] = useState([]); // 상품 구분

  // 그리드 컬럼 정의
  const columns = useMemo(() => [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 300 },
    { field: "itemSpec", headerName: "상품규격", editable: false, align: "left", width: 100 },
    { field: "itemGbnCd", headerName: "상품구분", editable: false, align: "center", type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, valueOptions: itemGbnCdCmb },
    { field: "pkqty", headerName: "입수", editable: false, align: "center", width: 100 },
    { field: "ibCost", headerName: "입고단가", editable: false, align: "right", width: 100, 
      valueFormatter: params => gvGridFieldNumberFormatter(params) },
    { field: "obCost", headerName: "출고단가", editable: false, align: "right", width: 100, 
      valueFormatter: params => gvGridFieldNumberFormatter(params) },
    { field: "keepTempeGbnCd", headerName: "보관온도구분", editable: false, align: "center", type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, valueOptions: keepTempeGbnCdCmb },
    { field: "minUomCd", headerName: "최소단위코드", editable: false, align: "center", type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, valueOptions: minUomCdCmb },
    { field: "setItemYn", headerName: "세트상품여부", editable: false, align: "center", type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, valueOptions: setItemYnCmb },
    { field: "vatYn", headerName: "과세여부", editable: false, align: "center", type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, valueOptions: vatYnCmb },
    { field: "useYn", headerName: "사용여부", editable: false, align: "center", type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb },
    { field: "remark", headerName: "비고", editable: false, align: "left", width: 300 }
  ], [itemGbnCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb]);


  // 초기 데이터 로드
  useEffect(() => {
    if (!clientCdCmb.length) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", '')); // 고객사 콤보박스
    if (!keepTempeGbnCdCmb.length) setKeepTempeGbnCdCmb(getCmbOfGlobalData("KEEP_TEMPE_GBN_CD", '')); // 보관 온도
    if (!minUomCdCmb.length) setMinUomCdCmb(getCmbOfGlobalData("UOM_CD", '')); // 최소 단위
    if (!setItemYnCmb.length) setSetItemYnCmb(getCmbOfGlobalData("YN", '')); // 세트 상품 여부
    if (!vatYnCmb.length) setVatYnCmb(getCmbOfGlobalData("YN", '')); // 과세 여부
    if (!useYnCmb.length) setUseYnCmb(getCmbOfGlobalData("USE_YN", '')); // 사용 여부
    if (!itemGbnCdCmb.length) setItemGbnCdCmb(getCmbOfGlobalData("ITEM_GBN_CD", '')); // 상품 구분
  }, [clientCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb, itemGbnCdCmb]);

  // 데이터 조회
  const fetchDataList = useCallback(() => {
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
    const modalInfo = modals[key];
    if (modalInfo.callback && typeof modalInfo.callback === 'function') {
      const result = modalInfo.callback(getModalData(key).data);
      if (result !== false) closeModal(key);
    }
  }, [modals, closeModal, getModalData]);

  // 그리드에서 체크박스 선택 시 처리 함수
  const handleSelectionChange = useCallback((selectedRows) => {
    setDtlChkRows(selectedRows);
    updateModalData(key, { ...getModalData(key), data: selectedRows });
  }, [dataList, updateModalData, key, getModalData]);


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
        onCellEditCommit={(params) => {
          const updatedDataList = dataList.map(row =>
            row.id === params.id ? { ...row, [params.field]: params.value } : row
          );
          setDataList(updatedDataList); // 셀 수정 후 데이터 리스트 업데이트
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
