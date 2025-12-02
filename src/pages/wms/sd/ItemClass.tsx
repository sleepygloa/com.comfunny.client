import React, { useEffect, useState, useCallback } from "react";
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';

// context
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
// [수정] 오타 수정 및 확장자 제거
import { client } from '../../../constraints';
import { 
  gvGridDropdownDisLabel, 
  gvGetRowData 
} from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// --- 데이터 타입 정의 ---
interface ItemClassData {
  id: number;
  clientCd: string;
  itemClassCd: string;
  largeClassCd: string;
  largeClassNm: string;
  middleClassCd: string;
  middleClassNm: string;
  smallClassCd: string;
  smallClassNm: string;
  useYn: string;
  remark: string;
  [key: string]: any;
}

export default function ItemClassManagement() {
  const PRO_URL = '/wms/sd/itemClass';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState<number>(-1);
  const [dataList, setDataList] = useState<ItemClassData[]>([]);
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  // 초기 데이터 값
  const initData: ItemClassData = {
    id: 0, // 초기값 (추가 시 재설정)
    clientCd: '',
    itemClassCd: '',
    largeClassCd: '',
    largeClassNm: '',
    middleClassCd: '',
    middleClassNm: '',
    smallClassCd: '',
    smallClassNm: '',
    useYn: 'Y',
    remark: '',
  };

  const [values, setValues] = useState<ItemClassData>(initData);

  useEffect(() => {
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
  }, [clientCdCmb, useYnCmb, getCmbOfGlobalData]);

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { 
      field: "clientCd", 
      headerName: "고객사코드", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: clientCdCmb,
      width: 120 
    },
    { field: "itemClassCd", headerName: "상품분류코드", editable: false, align: "left", width: 100 },
    { field: "largeClassCd", headerName: "대분류코드", editable: true, align: "left", width: 100 },
    { field: "largeClassNm", headerName: "대분류명", editable: true, align: "left", width: 100 },
    { field: "middleClassCd", headerName: "중분류코드", editable: true, align: "left", width: 100 },
    { field: "middleClassNm", headerName: "중분류명", editable: true, align: "left", width: 100 },
    { field: "smallClassCd", headerName: "소분류코드", editable: true, align: "left", width: 100 },
    { field: "smallClassNm", headerName: "소분류명", editable: true, align: "left", width: 100 },
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

  const onChangeSearch = (event: any, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: event });
    }
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectItemClassList`, data)
      .then((res) => setDataList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  const onClickSelect = fnSearch;

  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initData, id: newId };
    setDataList((prevDataList) => [...prevDataList, newRow]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveItemClass`, rowData)
        .then(() => {
          alert('저장되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteItemClass`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const onClickCopy = () => {
    if (selRowId === -1) {
      alert('복사할 행을 선택해주세요.');
      return;
    }
    openModal('', '', '선택한 행을 복사 하시겠습니까?', () => {
      const rowData = gvGetRowData(dataList, selRowId);
      // ID는 새로 생성하고, 상품분류코드는 초기화
      const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
      const copyData = { ...rowData, id: newId, itemClassCd: '' };
      setDataList((prevDataList) => [...prevDataList, copyData]);
    });
  };

  const handleGridCellClick = (e: any) => {
    setValues(e.row);
    setSelRowId(e.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      setDataList((prevDataList) => 
        prevDataList.map((row) => (row.id === id ? { ...row, [field]: value } : row))
      );
    },
    []
  );

  return (
    <>
      <PageTitle title="상품분류 관리" />
      <SearchBar onClickSelect={onClickSelect} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel} onClickCustom1={onClickCopy} onClickCustomNm1="복사">
        <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch} />
      </SearchBar>

      <ComDeGrid
        title="Item Class List"
        dataList={dataList}
        columns={columns}
        height="750px"
        type="single"
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
      />
    </>
  );
}