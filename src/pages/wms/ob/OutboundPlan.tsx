import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material"; // Box import 추가
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// components
import { SchTextField, GridDateRenderField, SchDateField, FieldRow } from "../../../components/SearchBar/CmmnTextField";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { PageTitle, SearchBar } from '../../../components/SearchBar/SearchBar'; // SearchBar import 추가

// Common
import { client } from '../../../constraints'; 
import { gvGetToday, gvGridFieldNumberFormatter } from "../../../components/Common";

// CommonData
import { useCommonData } from "../../../context/CommonDataContext";

// Modal
import { useModal } from "../../../context/ModalContext";
// import OutboundPlanPop from "./OutboundPlanPop";

// --- 인터페이스 정의 ---

interface OutboundPlanData {
  id: number;
  dcNm: string;
  obNo: string;
  obGbnNm: string;
  obProgStNm: string;
  obPlanYmd: string;
  obYmd: string;
  storeNm: string;
  useYnNm: string;
  remark: string;
  [key: string]: any;
}

interface OutboundPlanDetailData {
  id: number;
  obDetailSeq: number;
  obProgStNm: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  planTotQty: number;
  planBoxQty: number;
  planEaQty: number;
  obAmt: number;
  makeLot: string;
  makeYmd: string;
  distExpiryYmd: string;
  lotId: string;
  remark: string;
  [key: string]: any;
}

interface SearchValues {
  obNo: string;
  obPlanYmd: string;
  [key: string]: any;
}

export default function OutboundPlan() {
  const menuTitle = '출고예정';
  const PRO_URL = '/wms/ob/outboundPlan';
  const { openModal } = useModal();
  useCommonData();

  // States
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null);
  const [selDtlRowId, setSelDtlRowId] = useState<GridRowId | null>(null);
  const [dataList, setDataList] = useState<OutboundPlanData[]>([]);
  const [dataDtlList, setDataDtlList] = useState<OutboundPlanDetailData[]>([]);
  const [schValues, setSchValues] = useState<SearchValues>({
    obNo: "",
    obPlanYmd: gvGetToday(),
  });

  // Main Grid Columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, width: 20, align: "center" },
    { field: "dcNm", headerName: "물류창고", editable: false, width: 120, align: "left" },
    { field: "obNo", headerName: "출고번호", editable: false, width: 150, align: "left" },
    { field: "obGbnNm", headerName: "출고구분", editable: false, width: 120, align: "left" },
    { field: "obProgStNm", headerName: "출고진행상태", editable: false, width: 100, align: "left" },
    { 
      field: "obPlanYmd", headerName: "출고예정일자", editable: false, width: 150, align: "left",
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { 
      field: "obYmd", headerName: "출고일자", editable: false, width: 150, align: "left",
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { field: "storeNm", headerName: "배송처", editable: false, width: 100, align: "left" },
    { field: "useYnNm", headerName: "사용여부", editable: false, width: 100, align: "left" },
    { field: "remark", headerName: "비고", editable: false, width: 300, align: "left" },
  ];

  // Detail Grid Columns
  const columnsDtl: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, width: 20, align: "center" },
    { field: "obDetailSeq", headerName: "순번", editable: false, width: 60, align: "right" },
    { field: "obProgStNm", headerName: "진행상태", editable: false, width: 100, align: "left" },
    { field: "itemCd", headerName: "상품코드", editable: false, width: 100, align: "left" },
    { field: "itemNm", headerName: "상품명", editable: false, width: 250, align: "left" },
    { field: "itemStNm", headerName: "상품상태", editable: false, width: 100, align: "left" },
    { 
      field: "planTotQty", headerName: "예정(총)", editable: false, width: 100, align: "right",
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "planBoxQty", headerName: "예정(박스)", editable: false, width: 100, align: "right",
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "planEaQty", headerName: "예정(낱개)", editable: false, width: 100, align: "right",
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "obAmt", headerName: "출고금액", editable: false, width: 100, align: "right",
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { field: "makeLot", headerName: "제조LOT", editable: false, width: 130, align: "left" },
    { 
      field: "makeYmd", headerName: "제조일자", editable: false, width: 150, align: "left",
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { 
      field: "distExpiryYmd", headerName: "유통기한일자", editable: false, width: 150, align: "left",
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { field: "lotId", headerName: "LOT_ID", editable: false, width: 100, align: "left" },
    { field: "remark", headerName: "비고", editable: false, width: 300, align: "left" },
  ];

  // Search Handlers
  const onChangeSearch = (value: any, id?: string) => {
    if (id) {
        setSchValues({ ...schValues, [id]: value });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fnSearch();
    }
  };

  // API Calls
  const fnSearch = () => {
    client.post(`${PRO_URL}/selectOutboundPlanList`, schValues)
      .then((res) => {
        const list: OutboundPlanData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
          setSelRowId(list[0].id);
          fnSearchDtl(list[0]);
        } else {
            setDataDtlList([]);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const fnSearchDtl = (rowData: OutboundPlanData) => {
    client.post(`${PRO_URL}/selectOutboundPlanDetailList`, rowData)
      .then((res) => {
        setDataDtlList(res.data);
      })
      .catch((error) => console.error('Error:', error));
  };

  // Outbound Plan Popup
  const onClickAdd = () => {
    // 팝업 컴포넌트(OutboundPlanPop) 연동 필요
    // openModal('OUTBOUND_PLAN_POP', '출고예정 팝업', <OutboundPlanPop />, handleOutboundPlanUpdate, '1200px', '750px');
    openModal('', '알림', "출고예정 등록 팝업 준비 중입니다.");
  };

  const handleOutboundPlanUpdate = () => {
    fnSearch();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title={menuTitle} />
      <SearchBar
        onClickSelect={fnSearch}
        onClickAdd={onClickAdd}
      >
        <FieldRow>
          <SchTextField id="obNo" label="출고번호/명" onChange={onChangeSearch}  />
          <SchDateField id="obPlanYmd" label="출고예정일" selected={schValues.obPlanYmd} onChange={onChangeSearch} />

        </FieldRow>
      </SearchBar>

      {/* 마스터 그리드 */}
      <Box sx={{ height: '40%', mt: 2 }}>
        <ComDeGrid
          title="Outbound List"
          dataList={dataList}
          columns={columns}
          onRowClick={(params) => { 
              setSelRowId(params.id); 
              fnSearchDtl(params.row as OutboundPlanData); 
          }}
          type="single"
          height="100%"
        />
      </Box>

      {/* 상세 그리드 */}
      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          title="Outbound Detail List"
          dataList={dataDtlList}
          columns={columnsDtl}
          type="single"
          height="100%"
        />
      </Box>
    </Box>
  );
}