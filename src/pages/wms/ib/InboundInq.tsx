import React, { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// components
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SchTextField, SchDateField, GridDateRenderField, FieldRow } from "../../../components/SearchBar/CmmnTextField";

// Common
import { client } from '../../../constraints'; // 오타 수정 contraints -> constraints
import { gvGridFieldNumberFormatter, gvGetToday } from "../../../components/Common";

// Modal
import { useModal } from "../../../context/ModalContext";

// --- 인터페이스 정의 ---
interface InboundInqData {
  id: number;
  dcNm: string;
  ibNo: string;
  clientNm: string;
  ibGbnNm: string;
  ibProgStNm: string;
  ibPlanYmd: string;
  ibYmd: string;
  supplierNm: string;
  useYnNm: string;
  remark: string;
  [key: string]: any;
}

interface InboundInqDetailData {
  id: number;
  ibDetailSeq: number;
  ibProgStNm: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  makeYmd: string;
  distExpiryYmd: string;
  lotId: string;
  useYnNm: string;
  remark: string;
  // 주석 처리된 수량/금액 필드용 (필요시 활성화)
  planQty?: number;
  examQty?: number;
  instQty?: number;
  putwQty?: number;
  ibCost?: number;
  ibVat?: number;
  ibAmt?: number;
  [key: string]: any;
}

interface SearchValues {
  ibNo: string;
  ibPlanYmd: string;
  [key: string]: any;
}

export default function InboundInq() {
  const menuTitle = '입고현황';
  const PRO_URL = '/wms/ib/inboundInq';
  const { openModal } = useModal();

  // 상태 관리
  const [dataList, setDataList] = useState<InboundInqData[]>([]);
  const [dataDtlList, setDataDtlList] = useState<InboundInqDetailData[]>([]);
  const [schValues, setSchValues] = useState<SearchValues>({
    ibNo: "",
    ibPlanYmd: gvGetToday(),
  });
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null);

  // 메인 그리드 컬럼
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "dcNm", headerName: "물류창고", align: "left", width: 120 },
    { field: "ibNo", headerName: "입고번호", align: "left", width: 130 },
    { field: "clientNm", headerName: "고객사", align: "left", width: 120 },
    { field: "ibGbnNm", headerName: "입고구분", align: "left", width: 120 },
    { field: "ibProgStNm", headerName: "입고진행상태", align: "left", width: 100 },
    { 
      field: "ibPlanYmd", headerName: "입고예정일자", align: "left", width: 150, 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { 
      field: "ibYmd", headerName: "입고일자", align: "left", width: 150, 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { field: "supplierNm", headerName: "공급처", align: "left", width: 100 },
    { field: "useYnNm", headerName: "사용여부", align: "left", width: 100 },
    { field: "remark", headerName: "비고", align: "left", width: 300 },
  ];

  // 상세 그리드 컬럼
  const columnsDtl: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "ibDetailSeq", headerName: "순번", align: "right", width: 60 },
    { field: "ibProgStNm", headerName: "진행상태", align: "left", width: 100 },
    { field: "itemCd", headerName: "상품코드", align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", align: "left", width: 300 },
    { field: "itemStNm", headerName: "상품상태", align: "left", width: 100 },
    // 주석 처리된 컬럼들 (필요시 주석 해제 및 타입 확인)
    // { field: "planQty", headerName: "예정", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    // { field: "examQty", headerName: "검수", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    // { field: "instQty", headerName: "지시", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    // { field: "putwQty", headerName: "적치", align: "right", width: 60, valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    // { field: "ibCost", headerName: "입고단가", align: "right", width: 100, valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    // { field: "ibVat", headerName: "입고VAT", align: "right", width: 100, valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    // { field: "ibAmt", headerName: "입고금액", align: "right", width: 100, valueFormatter: (params) => gvGridFieldNumberFormatter(params) },
    { 
      field: "makeYmd", headerName: "제조일자", align: "left", width: 150, 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { 
      field: "distExpiryYmd", headerName: "유통기한일자", align: "left", width: 150, 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { field: "lotId", headerName: "LOT_ID", align: "left", width: 150 },
    { field: "useYnNm", headerName: "사용여부", align: "left", width: 100 },
    { field: "remark", headerName: "비고", align: "left", width: 300 },
  ];

  // 이벤트 핸들러
  const onChangeSearch = (value: any, id?: string) => {
    if (id) {
      setSchValues((prev) => ({ ...prev, [id]: value }));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fnSearch();
    }
  };

  useEffect(() => {
    fnSearch();
  }, []);

  // 조회 함수
  const fnSearch = () => {
    const data = { ...schValues };
    client.post(`${PRO_URL}/selectInboundInqList`, data)
      .then((res) => {
        const list: InboundInqData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
          setSelRowId(list[0].id);
          fnSearchDtl(list[0]);
        } else {
          setDataDtlList([]);
        }
      })
      .catch((error) => console.log('error = ', error));
  };

  // 상세 조회 함수
  const fnSearchDtl = (rowData: InboundInqData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectInboundInqDetailList`, rowData)
      .then((res) => setDataDtlList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  return (
    <>
      <PageTitle title={menuTitle} />
      <ComDeGrid
        onClickSelect={fnSearch}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="ibNo" label="입고번호/명" onChange={onChangeSearch}  />
            <SchDateField id="ibPlanYmd" label="입고예정일" selected={schValues.ibPlanYmd} onChange={onChangeSearch} />
          </FieldRow>
        }
        title="Inbound List"
        dataList={dataList}
        columns={columns}
        height="250px"
        onRowClick={(params) => { 
            setSelRowId(params.id); 
            fnSearchDtl(params.row as InboundInqData); 
        }}
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