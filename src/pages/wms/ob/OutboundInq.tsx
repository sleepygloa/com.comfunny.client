import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from "@mui/x-data-grid";
import { Grid } from '@mui/material';

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField, SchDateField, GridDateRenderField } from "../../../components/SearchBar/CmmnTextField";

// Common
import { client } from '../../../constraints'; // 오타 수정 contraints -> constraints
import { 
  gvGridFieldNumberFormatter,
  gvGetToday
} from "../../../components/Common";

// CommonData
import { useCommonData } from "../../../context/CommonDataContext";

// Modal
import { useModal } from "../../../context/ModalContext";

// --- 인터페이스 정의 ---
interface OutboundInqData {
  id: number;
  dcNm: string;
  ibNo: string; // 데이터가 입고 기준이라면 ibNo 유지, 출고라면 obNo로 변경 필요
  clientNm: string;
  ibGbnNm: string;
  ibProgStNm: string;
  ibPlanYmd: string;
  ibYmd: string;
  supplierNm: string;
  carNo: string;
  tcObNo: string;
  userCol1: string;
  userCol2: string;
  userCol3: string;
  userCol4: string;
  userCol5: string;
  useYnNm: string;
  remark: string;
  [key: string]: any;
}

interface OutboundInqDetailData {
  id: number;
  ibDetailSeq: number;
  ibProgStNm: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  planQty: number;
  confQty: number;
  apprQty: number;
  examQty: number;
  instQty: number;
  putwQty: number;
  ibCost: number;
  ibVat: number;
  ibAmt: number;
  makeLot: string;
  makeYmd: string;
  distExpiryYmd: string;
  lotId: string;
  lotAttr1: string;
  lotAttr2: string;
  lotAttr3: string;
  lotAttr4: string;
  lotAttr5: string;
  userCol1: string;
  userCol2: string;
  userCol3: string;
  userCol4: string;
  userCol5: string;
  useYnNm: string;
  remark: string;
  [key: string]: any;
}

interface SearchValues {
  ibNo: string;
  ibPlanYmd: string;
  [key: string]: any;
}

export default function OutboundInq() {
  const menuTitle = '출고현황'; // 파일명에 맞춰 메뉴명 수정 권장 (기존: 입고예정)
  const PRO_URL = '/wms/ib/inboundInq'; // 실제 출고 API로 변경 필요 (/wms/ob/outboundInq 등)
  const { openModal } = useModal();
  useCommonData();

  // 그리드 선택된 행
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null);
  const [selDtlRowId, setSelDtlRowId] = useState<GridRowId | null>(null);
  
  // 데이터 변수
  const [dataList, setDataList] = useState<OutboundInqData[]>([]);
  const [dataDtlList, setDataDtlList] = useState<OutboundInqDetailData[]>([]);

  // 조회조건
  const [schValues, setSchValues] = useState<SearchValues>({ 
    ibNo: "", 
    ibPlanYmd : ""
  });

  // 핸들링하고 있는 rowData 저장
  const [values, setValues] = useState<Partial<OutboundInqData>>({});
  const [valuesDtl, setValuesDtl] = useState<Partial<OutboundInqDetailData>>({});

  useEffect(() => {
    // 초기 로드 시 필요 로직
  }, []);

  // 컬럼 정의 (입고 필드 기준 작성됨)
  const columns: GridColDef[] = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "dcNm",              headerName: "물류창고",      editable: false, align:"left", width:120},
    { field: "ibNo",              headerName: "입고번호",         editable: false, align:"left", width:120},
    { field: "clientNm",          headerName: "고객사",       editable: false, align:"left", width:120},
    { field: "ibGbnNm",           headerName: "입고구분",     editable: false, align:"left", width:120},
    { field: "ibProgStNm",        headerName: "입고진행상태",   editable: false, align:"left", width:100},
    { field: "ibPlanYmd",         headerName: "입고예정일자",     editable: false, align:"left", width:100},
    { field: "ibYmd",             headerName: "입고일자",       editable: false, align:"left", width:100},
    { field: "supplierNm",        headerName: "공급처",     editable: false, align:"left", width:100},
    { field: "carNo",             headerName: "차량번호",       editable: false, align:"left", width:100},
    { field: "tcObNo",            headerName: "이고출고번호",     editable: false, align:"left", width:100},
    { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    { field: "useYnNm",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

  const columnsDtl: GridColDef[] = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "ibDetailSeq",       headerName: "순번",       editable: false, align:"right", width:60},
    { field: "ibProgStNm",        headerName: "진행상태",   editable: false, align:"left", width:100},
    { field: "itemCd",            headerName: "상품코드",   editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",   editable: false, align:"left", width:300},
    { field: "itemStNm",          headerName: "상품상태",   editable: false, align:"left", width:100},
    { field: "planQty",           headerName: "예정",   editable: false, align:"right", width:60},
    { field: "confQty",           headerName: "확정",   editable: false, align:"right", width:60},
    { field: "apprQty",           headerName: "승인",   editable: false, align:"right", width:60},
    { field: "examQty",           headerName: "검수",   editable: false, align:"right", width:60},
    { field: "instQty",           headerName: "지시",   editable: false, align:"right", width:60},
    { field: "putwQty",           headerName: "적치",   editable: false, align:"right", width:60},
    { field: "ibCost",            headerName: "입고단가",   editable: false, align:"right", width:100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { field: "ibVat",             headerName: "입고VAT",   editable: false, align:"right", width:100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { field: "ibAmt",             headerName: "입고금액",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params),
    },
    { field: "makeLot",           headerName: "제조LOT",   editable: false, align:"left", width:100},
    { field: "makeYmd",           headerName: "제조일자",   editable: false, align:"left", width:100},
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: false, align:"left", width:100},
    { field: "lotId",             headerName: "LOT_ID",   editable: false, align:"left", width:100},
    { field: "lotAttr1",          headerName: "LOT속성1",   editable: false, align:"left", width:100},
    { field: "lotAttr2",          headerName: "LOT속성2",   editable: false, align:"left", width:100},
    { field: "lotAttr3",          headerName: "LOT속성3",   editable: false, align:"left", width:100},
    { field: "lotAttr4",          headerName: "LOT속성4",   editable: false, align:"left", width:100},
    { field: "lotAttr5",          headerName: "LOT속성5",   editable: false, align:"left", width:100},
    { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    { field: "useYnNm",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

  // 조회조건 변경
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
  }

  // 조회
  const fnSearch = () => {
    const data = {
      ibNo : schValues.ibNo,
      ibPlanYmd : schValues.ibPlanYmd,
    };
    client.post(`${PRO_URL}/selectInboundInqList`, data)
      .then(res => {
        const list: OutboundInqData[] = res.data;
        setDataList(list);

        if(list.length > 0){
          setSelRowId(list[0].id);
          fnSearchDtl(list[0]);
        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  // 상세조회
  const fnSearchDtl = (rowData: OutboundInqData) => {
    // setSelRowId(rowData.id); // 상위에서 설정됨
    client.post(`${PRO_URL}/selectInboundInqDetailList`, rowData)
      .then(res => {
        const list: OutboundInqDetailData[] = res.data;
        setDataDtlList(list);

        if(list.length > 0){
          setSelDtlRowId(list[0].id);
        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  // 조회 클릭
  const onClickSelect = () => {
    fnSearch();
  }

  return (
    <>
      <PageTitle title={menuTitle} />
      <SearchBar
        onClickSelect={onClickSelect} 
      >
          <SchTextField 
            id="ibNo" 
            label='입고번호/명' // 출고로 변경 필요 시 수정
            onChange={onChangeSearch} 
          />  
          {/* 날짜 검색 필드 예시 (필요시 주석 해제)
          <SchDateField 
            id="ibPlanYmd" 
            label='입고예정일'
            selected={schValues.ibPlanYmd}
            onChange={onChangeSearch} 
          /> 
          */}
      </SearchBar>
      
      <Grid item xs={12} style={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={dataList}
          columns={columns}
          headerHeight={30}
          rowHeight={28}
          onRowClick={(params) => {
            setValues(params.row as OutboundInqData); 
            setSelRowId(params.id);
            fnSearchDtl(params.row as OutboundInqData);
          }}
          selectionModel={selRowId !== null ? [selRowId] : []}
        />
      </Grid>      

      <div style={{ height: 20 }}></div>

      <Grid item xs={12} style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={dataDtlList}
          columns={columnsDtl}
          headerHeight={30}
          rowHeight={28}
          onRowClick={(params) => {
            setValuesDtl(params.row as OutboundInqDetailData); 
            setSelDtlRowId(params.id);
          }}
          selectionModel={selDtlRowId !== null ? [selDtlRowId] : []}
        />
      </Grid>
    </>
  );
}