import React, { useState, useEffect } from 'react';

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SchTextField, FieldRow } from "../../../components/SearchBar/CmmnTextField.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

// Common
import { client } from '../../../contraints.js';
import { gvGridFieldNumberFormatter } from "../../../components/Common.js";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { useModal } from "../../../context/ModalContext.js";

export default function InboundPlan() {
  const menuTitle = '로케이션별 재고조회';
  const PRO_URL = '/wms/st/stockInqueryByLoc';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState([]);
  const [selRowId, setSelRowId] = useState(-1);
  const [dcCdCmb, setDcCdCmb] = useState([]);
  const [clientCdCmb, setClientCdCmb] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "dcNm", headerName: "물류창고", align: "left", width: 120 },
    { field: "clientNm", headerName: "고객사", align: "left", width: 120 },
    { field: "locCd", headerName: "로케이션", align: "left", width: 120 },
    { field: "itemCd", headerName: "상품코드", align: "left", width: 120 },
    { field: "itemNm", headerName: "상품명", align: "left", width: 300 },
    { field: "itemStNm", headerName: "상품상태", align: "left", width: 120 },
    { field: "stockQty", headerName: "재고수량", align: "right", width: 100, 
      valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    { field: "ibPlanQty", headerName: "입고예정수량", align: "right", width: 100, 
      valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    { field: "obPlanQty", headerName: "출고예정수량", align: "right", width: 100, 
      valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    { field: "holdQty", headerName: "보류수량", align: "right", width: 100, 
      valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    { field: "canStockQty", headerName: "가용재고수량", align: "right", width: 100, 
      valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
  ];

  const [schValues, setSchValues] = useState({
    dcCd: "",
    clientCd: "",
    itemCd: "",
    locCd: ""
  });

  const onChangeSearch = (event, id) => {
    setSchValues((prev) => ({ ...prev, [id]: event }));
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fnSearch();
    }
  };

  useEffect(() => {
    if (dcCdCmb.length === 0) setDcCdCmb(getCmbOfGlobalData("DC_CD", ''));
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
  }, [dcCdCmb, clientCdCmb]);

  const fnSearch = () => {
    const data = { ...schValues };
    client.post(`${PRO_URL}/selectList`, data)
      .then((res) => {
        setDataList(res.data);
        if (res.data.length > 0) setSelRowId(1);
      })
      .catch((error) => console.log('error = ', error));
  };

  const onClickSelect = () => fnSearch();

  return (
    <>
      <PageTitle title={"로케이션별 재고현황"} />
      <ComDeGrid
        onClickSelect={onClickSelect}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="dcCd" label="물류센터" onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <SchTextField id="clientCd" label="고객사" onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <SchTextField id="itemCd" label="상품" onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <SchTextField id="locCd" label="로케이션" onChange={onChangeSearch} onKeyDown={onKeyDown} />
          </FieldRow>
        }
        title={"Stock Inquiry by Location List"}
        dataList={dataList}
        columns={columns}
        height="500px"
        onRowClick={(params) => setSelRowId(params.id)}
        type="single"
      />
    </>
  );
}
