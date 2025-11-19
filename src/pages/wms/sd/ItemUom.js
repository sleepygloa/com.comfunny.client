import React, { useEffect, useState, useCallback } from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField.js";
import { client } from '../../../contraints.js';
import { useCommonData } from "../../../context/CommonDataContext.js";
import { gvGridDropdownDisLabel, gvGetRowData } from "../../../components/Common.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { useModal } from "../../../context/ModalContext.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  clientCd: '고객사',
  itemCd: '상품코드',
  stdUomCd: '기준단위코드',
  convUomCd: '변환단위코드',
  convUomQty: '변환단위코드',
  remark: '비고',
  useYn: '사용여부',
};

export default function ItemUomManagement() {
  const PRO_URL = '/wms/sd/itemUom';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState(-1);
  const [dataList, setDataList] = useState([]);
  const [clientCdCmb, setClientCdCmb] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const [uomCdCmb, setUomCdCmb] = useState([]);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const initData = {
    id: dataList.length + 1,
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
  }, [clientCdCmb, useYnCmb, uomCdCmb]);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "clientCd", headerName: "고객사", editable: false, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: clientCdCmb },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 300 },
    { field: "stdUomCd", headerName: "기준단위", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: uomCdCmb },
    { field: "convUomCd", headerName: "변환단위", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: uomCdCmb },
    { field: "convUomQty", headerName: "변환단위수량", editable: true, align: "right", width: 100 },
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  const onChangeSearch = (event, id) => {
    setSchValues({ ...schValues, [id]: event });
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectItemUomList`, data)
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
      client.post(`${PRO_URL}/saveItemUom`, rowData)
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
      client.post(`${PRO_URL}/deleteItemUom`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch(error => console.log('error = ', error));
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
      <PageTitle title="상품단위 관리" />
      <SearchBar onClickSelect={onClickSelect} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}>
        <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} />
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
