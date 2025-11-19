import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { useModal } from "../../../context/ModalContext.js";
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField.js";
import { client } from '../../../contraints.js';
import {
  gvGridDropdownDisLabel,
  gvGetRowData,
  gvSetDropdownData,
  gvSetLevelDropdownData,
  gvSetLevel2DropdownData,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser,
} from "../../../components/Common.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

// 필드 라벨 정보 관리
const fieldLabels = {
  clientCd: '고객사',
  itemCd: '상품코드',
  itemNm: '상품명',
  // ... 추가 필드
};

export default function Item() {
  const PRO_URL = '/wms/sd/item';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  // 상태 관리
  const [dataList, setDataList] = useState([]);
  const [selRowId, setSelRowId] = useState(-1);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  const [values, setValues] = useState({
    id: dataList.length + 1,
    clientCd: '',
    itemCd: '',
    itemNm: '',
    // ... 추가 필드 초기화
    useYn: 'Y',
  });

  // 콤보박스 데이터 관리
  const [clientCdCmb, setClientCdCmb] = useState([]);
  const [keepTempeGbnCdCmb, setKeepTempeGbnCdCmb] = useState([]);
  const [minUomCdCmb, setMinUomCdCmb] = useState([]);
  const [setItemYnCmb, setSetItemYnCmb] = useState([]);
  const [vatYnCmb, setVatYnCmb] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const [largeClassCdCmb, setLargeClassCdCmb] = useState([]);
  const [largeMiddleClassCdCmb, setLargeMiddleClassCdCmb] = useState([]);
  const [largeMiddleSmallClassCdCmb, setLargeMiddleSmallClassCdCmb] = useState([]);
  const [itemGbnCdCmb, setItemGbnCdCmb] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "clientCd", headerName: "고객사", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: clientCdCmb },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: true, align: "left", width: 300 },
    // ... 추가 컬럼 정의
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb },
  ];

  // 조회
  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectItemList`, data)
      .then(res => setDataList(res.data))
      .catch(error => console.log('error = ', error));
  };

  // 데이터 초기화 및 콤보박스 데이터 로드
  useEffect(() => {
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (keepTempeGbnCdCmb.length === 0) setKeepTempeGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD'));
    if (minUomCdCmb.length === 0) setMinUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
    if (setItemYnCmb.length === 0) setSetItemYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (vatYnCmb.length === 0) setVatYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (itemGbnCdCmb.length === 0) setItemGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'ITEM_GBN_CD'));
    if (largeClassCdCmb.length === 0) loadClassificationData();
  }, [clientCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb, largeClassCdCmb]);

  const loadClassificationData = () => {
    client.post(`${PRO_URL}/selectLargeClassCdList`, {}).then(res => setLargeClassCdCmb(gvSetDropdownData(res.data))).catch(console.log);
    client.post(`${PRO_URL}/selectLargeMiddleClassCdList`, {}).then(res => setLargeMiddleClassCdCmb(gvSetLevelDropdownData(res.data))).catch(console.log);
    client.post(`${PRO_URL}/selectLargeMiddleSmallClassCdList`, {}).then(res => setLargeMiddleSmallClassCdCmb(gvSetLevel2DropdownData(res.data))).catch(console.log);
  };

  const onChangeSearch = (event, id) => setSchValues({ ...schValues, [id]: event });

  const onClickSelect = () => fnSearch();
  const onClickAdd = () => setDataList(prev => [...prev, { ...values, id: prev.length + 1 }]);
  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveItem`, rowData)
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
      client.post(`${PRO_URL}/deleteItem`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch(error => console.log('error = ', error));
    });
  };
  const onClickCopy = () => {
    if (selRowId === -1) {
      openModal('', 'A', '복사할 행을 선택해주세요.');
      return;
    }
    const rowData = gvGetRowData(dataList, selRowId);
    const copyData = { ...rowData, id: dataList.length + 1, itemCd: '', itemClassCd: '' };
    setDataList(prev => [...prev, copyData]);
  };

  const handleGridCellClick = (e) => {
    setValues(e.row);
    setSelRowId(e.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
      if (['horizontal', 'vertical', 'height'].includes(field)) {
        const updatedRows = dataList.map(row => {
          if (row.id === id) {
            const newFieldValues = {
              ...row,
              [field]: Number(value),
              cbm: row.horizontal * row.vertical * row.height,
            };
            return newFieldValues;
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
      <PageTitle title="상품 관리" />
      <SearchBar onClickSelect={onClickSelect} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}>
        <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} />
      </SearchBar>

      <ComDeGrid
        title="Item List"
        dataList={dataList}
        columns={columns}
        height="750px"
        type="single"
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
        onClickCustom1={onClickCopy}
        onClickCustomNm1="복사"
      />
    </>
  );
}
