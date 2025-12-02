import React, { useEffect, useState, useCallback } from "react";
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
// [수정] 오타 수정 및 확장자 제거
import { client } from '../../../constraints';
import { useCommonData } from "../../../context/CommonDataContext";
import { gvGridDropdownDisLabel, gvGetRowData } from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { useModal } from "../../../context/ModalContext";

// --- 데이터 타입 정의 ---
interface ItemUomData {
  id: number;
  clientCd: string;
  itemCd: string;
  itemNm?: string; // 조회 시 조인되어 나올 수 있음
  stdUomCd: string;
  convUomCd: string;
  convUomQty: string | number;
  useYn: string;
  remark: string;
  [key: string]: any;
}

export default function ItemUomManagement() {
  const PRO_URL = '/wms/sd/itemUom';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState<number>(-1);
  const [dataList, setDataList] = useState<ItemUomData[]>([]);
  
  // 콤보박스 데이터
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [uomCdCmb, setUomCdCmb] = useState<any[]>([]);
  
  const [schValues, setSchValues] = useState({ codeCd: "" });

  // 초기 데이터 값
  const initData: ItemUomData = {
    id: 0, // 초기값 (추가 시 재설정)
    clientCd: '',
    itemCd: '',
    stdUomCd: '',
    convUomCd: '',
    convUomQty: '',
    useYn: 'Y',
    remark: '',
  };

  useEffect(() => {
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (uomCdCmb.length === 0) setUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
  }, [clientCdCmb, useYnCmb, uomCdCmb, getCmbOfGlobalData]);

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { 
      field: "clientCd", 
      headerName: "고객사", 
      editable: false, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: clientCdCmb,
      width: 120
    },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 300 },
    { 
      field: "stdUomCd", 
      headerName: "기준단위", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: uomCdCmb,
      width: 100
    },
    { 
      field: "convUomCd", 
      headerName: "변환단위", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: uomCdCmb,
      width: 100
    },
    { field: "convUomQty", headerName: "변환단위수량", editable: true, align: "right", width: 100, type: 'number' },
    { 
      field: "useYn", 
      headerName: "사용여부", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: useYnCmb,
      width: 80
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
    client.post(`${PRO_URL}/selectItemUomList`, data)
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
      client.post(`${PRO_URL}/saveItemUom`, rowData)
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
      client.post(`${PRO_URL}/deleteItemUom`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const handleGridCellClick = (e: any) => {
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
      <PageTitle title="상품단위 관리" />
      <SearchBar onClickSelect={onClickSelect} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}>
        <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch} />
      </SearchBar>

      <ComDeGrid
        title="Item Uom List"
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