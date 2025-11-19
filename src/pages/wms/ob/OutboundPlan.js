import React, { useState, useEffect } from 'react';

// components
import { SchTextField, GridDateRenderField, SchDateField, FieldRow } from "../../../components/SearchBar/CmmnTextField.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

// Common
import { client } from '../../../contraints.js';
import { gvGetToday, gvGridFieldNumberFormatter } from "../../../components/Common.js";

// CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";

// Modal
import { useModal } from "../../../context/ModalContext.js";
import OutboundPlanPop from "./OutboundPlanPop.js";
import { PageTitle } from '../../../components/SearchBar/SearchBar.js';

export default function OutboundPlan() {
  const PRO_URL = '/wms/ob/outboundPlan';
  const { openModal } = useModal();
  const { cmmnCdData } = useCommonData();

  // States
  const [selRowId, setSelRowId] = useState(null);
  const [selDtlRowId, setSelDtlRowId] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [dataDtlList, setDataDtlList] = useState([]);
  const [schValues, setSchValues] = useState({
    obNo: "",
    obPlanYmd: gvGetToday(),
  });

  // Main Grid Columns
  const columns = [
    { field: "id",          headerName: "ID", editable: false, width: 20 },
    { field: "dcNm",        headerName: "물류창고", editable: false, width: 120 },
    { field: "obNo",        headerName: "출고번호", editable: false, width: 150 },
    { field: "obGbnNm",     headerName: "출고구분", editable: false, width: 120 },
    { field: "obProgStNm",  headerName: "출고진행상태", editable: false, width: 100 },
    { field: "obPlanYmd",   headerName: "출고예정일자", editable: false, width: 150 },
    { field: "obYmd",       headerName: "출고일자", editable: false, width: 150 },
    { field: "storeNm",     headerName: "배송처", editable: false, width: 100 },
    // { field: "carNo",       headerName: "차량번호", editable: false, width: 100 },
    { field: "useYnNm",     headerName: "사용여부", editable: false, width: 100 },
    { field: "remark",      headerName: "비고", editable: false, width: 300 },
  ];

  // Detail Grid Columns
  const columnsDtl = [
    { field: "id",          headerName: "ID", editable: false, width: 20 },
    { field: "obDetailSeq", headerName: "순번", editable: false, width: 60 },
    { field: "obProgStNm",  headerName: "진행상태", editable: false, width: 100 },
    { field: "itemCd",      headerName: "상품코드", editable: false, width: 100 },
    { field: "itemNm",      headerName: "상품명", editable: false, width: 250 },
    { field: "itemStNm",    headerName: "상품상태", editable: false, width: 100 },
    { field: "planTotQty",  headerName: "예정(총)", editable: false, width: 100, 
      valueFormatter: gvGridFieldNumberFormatter,
    },
    { field: "planBoxQty",  headerName: "예정(박스)", editable: false, width: 100, 
      valueFormatter: gvGridFieldNumberFormatter,
    },
    { field: "planEaQty",   headerName: "예정(낱개)", editable: false, width: 100, 
      valueFormatter: gvGridFieldNumberFormatter,
    },
    { field: "obAmt",       headerName: "출고금액", editable: false, width: 100, 
      valueFormatter: gvGridFieldNumberFormatter,
    },
    { field: "makeLot",     headerName: "제조LOT", editable: false, width: 130 },
    { field: "makeYmd",     headerName: "제조일자", editable: false, width: 150 },
    { field: "distExpiryYmd", headerName: "유통기한일자", editable: false, width: 150 },
    { field: "lotId",       headerName: "LOT_ID", editable: false, width: 100 },
    { field: "remark",      headerName: "비고", editable: false, width: 300 },
  ];

  // Search Handlers
  const onChangeSearch = (event, id) => {
    setSchValues({ ...schValues, [id]: event });
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fnSearch();
    }
  };

  // API Calls
  const fnSearch = () => {
    client.post(`${PRO_URL}/selectOutboundPlanList`, schValues)
      .then((res) => {
        const list = res.data;
        setDataList(list);
        if (list.length > 0) {
          setSelRowId(list[0].id);
          fnSearchDtl(list[0]);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const fnSearchDtl = (rowData) => {
    client.post(`${PRO_URL}/selectOutboundPlanDetailList`, rowData)
      .then((res) => {
        setDataDtlList(res.data);
      })
      .catch((error) => console.error('Error:', error));
  };

  // Outbound Plan Popup
  const onClickAdd = () => {
    openModal('OUTBOUND_PLAN_POP', '출고예정 팝업', <OutboundPlanPop />, handleOutboundPlanUpdate, '1200px', '750px');
  };

  const handleOutboundPlanUpdate = () => {
    fnSearch();
  };

  return (
    <>
      <PageTitle title="출고예정" />
      <ComDeGrid
        onClickSelect={fnSearch}
        onClickAdd={onClickAdd}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="obNo" label="출고번호/명" div="4" onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <SchDateField id="obPlanYmd" label="출고예정일" div="4" selected={schValues.obPlanYmd} onChange={onChangeSearch} />
          </FieldRow>
        }
        title="Outbound List"
        dataList={dataList}
        columns={columns}
        height="250px"
        onRowClick={(params) => { setSelRowId(params.id); fnSearchDtl(params.row); }}
        type="single"
      />
      <ComDeGrid
        title="Outbound Detail List"
        dataList={dataDtlList}
        columns={columnsDtl}
        type="single"
      />
    </>
  );
}
