import React, { useState, useEffect } from 'react';

// components
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SchTextField, SchDateField, GridDateRenderField, FieldRow } from "../../../components/SearchBar/CmmnTextField.js";

// Common
import { client } from '../../../contraints.js';
import { gvGridFieldNumberFormatter, gvGetToday } from "../../../components/Common.js";

// Modal
import { useModal } from "../../../context/ModalContext.js";

export default function InboundInq() {
  const menuTitle = '입고현황';
  const PRO_URL = '/wms/ib/inboundInq';
  const { openModal } = useModal();

  const [dataList, setDataList] = useState([]);
  const [dataDtlList, setDataDtlList] = useState([]);
  const [schValues, setSchValues] = useState({
    ibNo: "",
    ibPlanYmd: gvGetToday(),
  });
  const [selRowId, setSelRowId] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "dcNm", headerName: "물류창고", align: "left", width: 120 },
    { field: "ibNo", headerName: "입고번호", align: "left", width: 130 },
    { field: "clientNm", headerName: "고객사", align: "left", width: 120 },
    { field: "ibGbnNm", headerName: "입고구분", align: "left", width: 120 },
    { field: "ibProgStNm", headerName: "입고진행상태", align: "left", width: 100 },
    { field: "ibPlanYmd", headerName: "입고예정일자", align: "left", width: 150, renderCell: (params) => <GridDateRenderField params={params} /> },
    { field: "ibYmd", headerName: "입고일자", align: "left", width: 150, renderCell: (params) => <GridDateRenderField params={params} /> },
    { field: "supplierNm", headerName: "공급처", align: "left", width: 100 },
    { field: "useYnNm", headerName: "사용여부", align: "left", width: 100 },
    { field: "remark", headerName: "비고", align: "left", width: 300 },
  ];

  const columnsDtl = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "ibDetailSeq", headerName: "순번", align: "right", width: 60 },
    { field: "ibProgStNm", headerName: "진행상태", align: "left", width: 100 },
    { field: "itemCd", headerName: "상품코드", align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", align: "left", width: 300 },
    { field: "itemStNm", headerName: "상품상태", align: "left", width: 100 },
    // { field: "planQty", headerName: "예정", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params.value) },
    // { field: "examQty", headerName: "검수", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params.value) },
    // { field: "instQty", headerName: "지시", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params.value) },
    // { field: "putwQty", headerName: "적치", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params.value) },
    // { field: "ibCost", headerName: "입고단가", align: "right", width: 100, valueFormatter: (params) => gvGridFieldNumberFormatter(params.value) },
    // { field: "ibVat", headerName: "입고VAT", align: "right", width: 100, valueFormatter: (params) => gvGridFieldNumberFormatter(params.value) },
    // { field: "ibAmt", headerName: "입고금액", align: "right", width: 100, valueFormatter: (params) => gvGridFieldNumberFormatter(params.value) },
    { field: "makeYmd", headerName: "제조일자", align: "left", width: 150, renderCell: (params) => <GridDateRenderField params={params} /> },
    { field: "distExpiryYmd", headerName: "유통기한일자", align: "left", width: 150, renderCell: (params) => <GridDateRenderField params={params} /> },
    { field: "lotId", headerName: "LOT_ID", align: "left", width: 150 },
    { field: "useYnNm", headerName: "사용여부", align: "left", width: 100 },
    { field: "remark", headerName: "비고", align: "left", width: 300 },
  ];

  const onChangeSearch = (value, id) => {
    setSchValues((prev) => ({ ...prev, [id]: value }));
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fnSearch();
    }
  };

  useEffect(() => {
    fnSearch();
  }, []);

  const fnSearch = () => {
    const data = { ...schValues };
    client.post(`${PRO_URL}/selectInboundInqList`, data)
      .then((res) => {
        setDataList(res.data);
        if (res.data.length > 0) {
          setSelRowId(res.data[0].id);
          fnSearchDtl(res.data[0]);
        }
      })
      .catch((error) => console.log('error = ', error));
  };

  const fnSearchDtl = (rowData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectInboundInqDetailList`, rowData)
      .then((res) => setDataDtlList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  return (
    <>
      <ComDeGrid
        onClickSelect={fnSearch}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="ibNo" label="입고번호/명" onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <SchDateField id="ibPlanYmd" label="입고예정일" selected={schValues.ibPlanYmd} onChange={onChangeSearch} />
          </FieldRow>
        }
        title="Inbound List"
        dataList={dataList}
        columns={columns}
        height="250px"
        onRowClick={(params) => { setSelRowId(params.id); fnSearchDtl(params.row); }}
        type="single"
      />

      <ComDeGrid
        title="Inbound Detail List"
        dataList={dataDtlList}
        columns={columnsDtl}
        // onRowClick={(params) => setSelDtlRowId(params.id)}
        type="single"
      />
    </>
  );
}
