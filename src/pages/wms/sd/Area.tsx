import React, { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';

// CommonData와 Modal 관련 Context 사용
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// 공통 컴포넌트와 유틸리티 함수
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { client } from '../../../constraints';
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

export default function Area() {
  const PRO_URL = '/wms/sd/area'; 
  const { openModal } = useModal(); 
  const { getCmbOfGlobalData } = useCommonData(); 

  const [selRowId, setSelRowId] = useState<number>(-1); 
  const [dataList, setDataList] = useState<AreaData[]>([]); 
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]); 
  const [dcCmb, setDcCmb] = useState<any[]>([]); 
  const [keepTempGbnCmb, setKeepTempGbnCmb] = useState<any[]>([]); 
  const [schValues, setSchValues] = useState({ codeCd: "" }); 

  // 초기 데이터 값 설정
  const initData: AreaData = {
    id: 0, 
    bizCd: '',
    dcCd: "",
    areaCd: "",
    areaNm: "",
    keepTempeGbnCd: "",
    remark: "",
    useYn: "Y",
  };

  const [values, setValues] = useState<AreaData>(initData); 

  // DataGrid의 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 60 },
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
    if (selRowId === -1) { 
      if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN')); 
      if (keepTempGbnCmb.length === 0) setKeepTempGbnCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD')); 
      if (dcCmb.length === 0) setDcCmb(getCmbOfGlobalData('DC_CD')); 
    }
  }, [selRowId, useYnCmb, keepTempGbnCmb, dcCmb, getCmbOfGlobalData]);

  const onChangeSearch = (value: string, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: value });
    }
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd }; 
    client.post(`${PRO_URL}/selectAreaList`, data)
      .then(res => setDataList(res.data)) 
      .catch(error => console.error('Error fetching area list:', error)); 
  };

  const onClickSelect = () => fnSearch();

  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initData, id: newId };
    setDataList(prevDataList => [...prevDataList, newRow]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId); 
    if (!rowData) return; 

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveArea`, rowData) 
        .then(() => {
          // alert('저장되었습니다.');
          fnSearch(); 
        })
        .catch(error => console.error('Error saving area:', error)); 
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId); 
    if (!rowData) return; 

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteArea`, rowData) 
        .then(() => {
          // alert('삭제되었습니다.');
          fnSearch(); 
        })
        .catch(error => console.error('Error deleting area:', error)); 
    });
  };

  const handleGridCellClick = (params: any) => {
    setValues(params.row); 
    setSelRowId(params.row.id); 
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      setDataList(prevDataList =>
        prevDataList.map(row => (row.id === id ? { ...row, [field]: value } : row))
      ); 
    },
    []
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title="구역 관리" />
      
      <SearchBar 
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave} 
        onClickDel={onClickDel}
      >
        <SchTextField id="codeCd" label="코드/명"  onChange={onChangeSearch}  />
      </SearchBar>

      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          title="Area List" 
          dataList={dataList} 
          columns={columns} 
          type="single" 
          onCellClick={handleGridCellClick} 
          onCellEditCommit={handleEditCellChangeCommitted} 
          height="100%"
        />
      </Box>
    </Box>
  );
}