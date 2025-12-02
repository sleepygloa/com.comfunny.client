import React, { useEffect, useState, useCallback } from "react";
import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

// CommonData와 Modal 관련 Context 사용
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// 공통 컴포넌트와 유틸리티 함수
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { client } from '../../../constraints'; // 오타 수정됨
import { 
  gvGridDropdownDisLabel,
  gvGetRowData,
} from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// 데이터 타입 정의
interface AreaData {
  id: number;
  bizCd?: string;
  dcCd: string;
  areaCd: string;
  areaNm: string;
  keepTempeGbnCd: string;
  stdWidth?: number | string;
  stdLength?: number | string;
  stdLocx?: number | string;
  stdLocy?: number | string;
  stdLocz?: number | string;
  remark: string;
  useYn: string;
  [key: string]: any;
}

// `Area` 컴포넌트 정의
export default function Area() {
  const PRO_URL = '/wms/sd/area'; // API URL
  const { openModal } = useModal(); // Modal 열기 함수
  const { getCmbOfGlobalData } = useCommonData(); // 공통 데이터 호출 함수

  const [selRowId, setSelRowId] = useState<number>(-1); // 선택된 행 ID
  const [dataList, setDataList] = useState<AreaData[]>([]); // 데이터 리스트
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]); // 사용 여부 콤보박스 옵션
  const [dcCmb, setDcCmb] = useState<any[]>([]); // 물류 센터 콤보박스 옵션
  const [keepTempGbnCmb, setKeepTempGbnCmb] = useState<any[]>([]); // 보관 온도 구분 콤보박스 옵션
  const [schValues, setSchValues] = useState({ codeCd: "" }); // 검색 조건 값

  // 초기 데이터 값 설정
  const initData: AreaData = {
    id: 0, // 초기값 0, 추가 시 재설정
    bizCd: '',
    dcCd: "",
    areaCd: "",
    areaNm: "",
    keepTempeGbnCd: "",
    remark: "",
    useYn: "Y",
  };

  const [values, setValues] = useState<AreaData>(initData); // 현재 선택된 값

  // DataGrid의 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { 
      field: "dcCd", 
      headerName: "물류창고", 
      editable: true, 
      width: 150, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: dcCmb 
    },
    { field: "areaCd", headerName: "구역코드", editable: true, align: "left", width: 100 },
    { field: "areaNm", headerName: "구역명", editable: true, align: "left", width: 200 },
    { 
      field: "keepTempeGbnCd", 
      headerName: "보관온도구분", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: keepTempGbnCmb 
    },
    { field: "stdWidth", headerName: "가로", editable: true, align: "center", width: 100 },
    { field: "stdLength", headerName: "세로", editable: true, align: "center", width: 100 },
    { field: "stdLocx", headerName: "기준위치X", editable: true, align: "center", width: 100 },
    { field: "stdLocy", headerName: "기준위치Y", editable: true, align: "center", width: 100 },
    { field: "stdLocz", headerName: "기준위치Z", editable: true, align: "center", width: 100 },
    { 
      field: "useYn", 
      headerName: "사용여부", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: useYnCmb 
    },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  // 초기 로드 시 데이터 및 콤보박스 옵션 설정
  useEffect(() => {
    if (selRowId === -1) { // 행이 선택되지 않은 경우
      if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN')); // 사용 여부 콤보박스 설정
      if (keepTempGbnCmb.length === 0) setKeepTempGbnCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD')); // 보관 온도 구분 콤보박스 설정
      if (dcCmb.length === 0) setDcCmb(getCmbOfGlobalData('DC_CD')); // 물류 센터 콤보박스 설정
    }
  }, [selRowId, useYnCmb, keepTempGbnCmb, dcCmb]);

  // 검색 조건 변경 시 호출되는 함수
  const onChangeSearch = (event: any, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: event });
    }
  };

  // 조회 기능 수행
  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd }; // 검색 조건 설정
    client.post(`${PRO_URL}/selectAreaList`, data)
      .then(res => setDataList(res.data)) // 조회 결과를 데이터 리스트로 설정
      .catch(error => console.error('Error fetching area list:', error)); // 오류 시 콘솔에 출력
  };

  // 조회 버튼 클릭 시 호출되는 함수
  const onClickSelect = () => fnSearch();

  // 데이터 리스트에 새 항목 추가
  const onClickAdd = () => {
    // 고유 ID 생성 (기존 max ID + 1)
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initData, id: newId };
    setDataList(prevDataList => [...prevDataList, newRow]);
  };

  // 선택한 행 저장
  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId); // 선택된 행의 데이터 가져오기
    if (!rowData) return; // 데이터가 없으면 종료

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveArea`, rowData) // 서버에 데이터 저장 요청
        .then(() => {
          alert('저장되었습니다.');
          fnSearch(); // 저장 후 데이터 다시 조회
        })
        .catch(error => console.error('Error saving area:', error)); // 오류 시 콘솔에 출력
    });
  };

  // 선택한 행 삭제
  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId); // 선택된 행의 데이터 가져오기
    if (!rowData) return; // 데이터가 없으면 종료

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteArea`, rowData) // 서버에 데이터 삭제 요청
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch(); // 삭제 후 데이터 다시 조회
        })
        .catch(error => console.error('Error deleting area:', error)); // 오류 시 콘솔에 출력
    });
  };

  // 그리드 셀 클릭 시 호출되는 함수
  const handleGridCellClick = (e: any) => {
    setValues(e.row); // 클릭된 행의 데이터를 `values`에 저장
    setSelRowId(e.row.id); // 선택된 행 ID 설정
  };

  // 셀 데이터가 변경되었을 때 호출되는 함수
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      setDataList(prevDataList =>
        prevDataList.map(row => (row.id === id ? { ...row, [field]: value } : row))
      ); // 해당 행의 데이터 업데이트
    },
    []
  );

  return (
    <>
      {/* 페이지 타이틀 */}
      <PageTitle title="구역 관리" />
      
      {/* 검색 바 및 버튼 */}
      <SearchBar onClickSelect={onClickSelect} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}>
        <SchTextField id="codeCd" label="코드/명"  onChange={onChangeSearch}  />
      </SearchBar>

      {/* 데이터 그리드 */}
      <ComDeGrid
        title="Area List" // 그리드 타이틀
        dataList={dataList} // 데이터 리스트
        columns={columns} // 컬럼 정의
        type="single" // 단일 선택 타입
        onCellClick={handleGridCellClick} // 셀 클릭 이벤트 핸들러
        onCellEditCommit={handleEditCellChangeCommitted} // 셀 수정 완료 이벤트 핸들러
      />
    </>
  );
}