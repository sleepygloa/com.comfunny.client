import React, { useEffect, useState, useCallback } from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField.js";
import { client } from '../../../contraints.js';
import { gvGridDropdownDisLabel, gvGetRowData } from "../../../components/Common.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { useModal } from "../../../context/ModalContext.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  clientCd: '고객사',
  itemCd: '상품코드',
  itemClassCd: '상품분류코드',
  largeClassCd: '대분류코드',
  largeClassNm: '대분류명',
  middleClassCd: '중분류코드',
  middleClassNm: '중분류명',
  smallClassCd: '소분류코드',
  smallClassNm: '소분류명',
  remark: '비고',
  useYn: '사용여부',
};

export default function ItemClassManagement() {
  const PRO_URL = '/wms/sd/itemClass';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState(-1);
  const [dataList, setDataList] = useState([]);
  const [clientCdCmb, setClientCdCmb] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const initData = {
    id: dataList.length + 1,
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

  useEffect(() => {
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
  }, [clientCdCmb, useYnCmb]);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "clientCd", headerName: "고객사코드", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: clientCdCmb },
    { field: "itemClassCd", headerName: "상품분류코드", editable: false, align: "left", width: 100 },
    { field: "largeClassCd", headerName: "대분류코드", editable: true, align: "left", width: 100 },
    { field: "largeClassNm", headerName: "대분류명", editable: true, align: "left", width: 100 },
    { field: "middleClassCd", headerName: "중분류코드", editable: true, align: "left", width: 100 },
    { field: "middleClassNm", headerName: "중분류명", editable: true, align: "left", width: 100 },
    { field: "smallClassCd", headerName: "소분류코드", editable: true, align: "left", width: 100 },
    { field: "smallClassNm", headerName: "소분류명", editable: true, align: "left", width: 100 },
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  const onChangeSearch = (event, id) => {
    setSchValues({ ...schValues, [id]: event });
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectItemClassList`, data)
      .then(res => setDataList(res.data))
      .catch(error => console.log('error = ', error));
  };

  const onClickSelect = fnSearch;

  const onClickAdd = () => {
    setDataList(prevDataList => [...prevDataList, { ...initData, id: prevDataList.length + 1 }]);
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
        .catch(error => console.log('error = ', error));
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
        .catch(error => console.log('error = ', error));
    });
  };

  const onClickCopy = () => {
    if (selRowId === -1) {
      alert('복사할 행을 선택해주세요.');
      return;
    }
    openModal('', '', '선택한 행을 복사 하시겠습니까?', () => {
      const rowData = gvGetRowData(dataList, selRowId);
      const copyData = { ...rowData, id: dataList.length + 1, itemClassCd: '' };
      setDataList(prevDataList => [...prevDataList, copyData]);
    });
  };

  const handleGridCellClick = (e) => {
    setSelRowId(e.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
      setDataList(prevDataList => prevDataList.map(row => (row.id === id ? { ...row, [field]: value } : row)));
    },
    []
  );

  return (
    <>
      <PageTitle title="상품분류 관리" />
      <SearchBar onClickSelect={onClickSelect} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel} onClickCustom1={onClickCopy} onClickCustomNm1="복사">
        <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} />
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
