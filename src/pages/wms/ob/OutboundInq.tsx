import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material"; // Box import 추가
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from "@mui/x-data-grid";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField, SchDateField, GridDateRenderField, FieldRow } from "../../../components/SearchBar/CmmnTextField";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// Common
import { client } from '../../../constraints'; 
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
  ibNo: string; // 데이터 소스에 따라 obNo로 변경 필요
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
  const menuTitle = '출고현황'; 
  const PRO_URL = '/wms/ib/inboundInq'; // 추후 /wms/ob/outboundInq 로 변경 필요 예상
  const { openModal } = useModal();
  useCommonData();

  const [selRowId, setSelRowId] = useState<GridRowId | null>(null);
  const [dataList, setDataList] = useState<OutboundInqData[]>([]);
  const [dataDtlList, setDataDtlList] = useState<OutboundInqDetailData[]>([]);

  const [schValues, setSchValues] = useState<SearchValues>({ 
    ibNo: "", 
    ibPlanYmd : ""
  });

  useEffect(() => {
    // 초기 로드 시 필요 로직
  }, []);

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
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { field: "makeLot",           headerName: "제조LOT",   editable: false, align:"left", width:100},
    { field: "makeYmd",           headerName: "제조일자",   editable: false, align:"left", width:100},
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: false, align:"left", width:100},
    { field: "lotId",             headerName: "LOT_ID",   editable: false, align:"left", width:100},
    { field: "useYnNm",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

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

  const fnSearch = () => {
    const data = {
      ibNo : schValues.ibNo,
      ibPlanYmd : schValues.ibPlanYmd,
    };
    client.post(`${PRO_URL}/selectInboundInqList`, data)
      .then((res) => {
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

  const fnSearchDtl = (rowData: OutboundInqData) => {
    client.post(`${PRO_URL}/selectInboundInqDetailList`, rowData)
      .then((res) => {
        const list: OutboundInqDetailData[] = res.data;
        setDataDtlList(list);
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  const onClickSelect = () => {
    fnSearch();
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title={menuTitle} />
      <SearchBar
        onClickSelect={onClickSelect} 
      >
          <FieldRow>

            <SchTextField 
              id="ibNo" 
              label='입고번호/명'
              onChange={onChangeSearch} 
            />  
          </FieldRow>
      </SearchBar>
      
      {/* 마스터 그리드 */}
      <Box sx={{ height: '40%', mt: 2 }}>
        <ComDeGrid
          title={"Inbound List"}
          dataList={dataList}
          columns={columns}
          onRowClick={(params) => {
            setSelRowId(params.id);
            fnSearchDtl(params.row as OutboundInqData);
          }}
          type="single"
          height="100%"
        />
      </Box>

      {/* 디테일 그리드 */}
      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          title={"Inbound Detail List"}
          dataList={dataDtlList}
          columns={columnsDtl}
          type="single"
          height="100%"
        />
      </Box>
    </Box>
  );
}