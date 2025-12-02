import React, { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';

// components
import { SchTextField, GridDateRenderField, SchDateField, FieldRow } from "../../../components/SearchBar/CmmnTextField";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// Common
import { client } from '../../../constraints'; // 오타 수정 constraints
import { 
  gvGridFieldNumberFormatter,
  gvGetToday
} from "../../../components/Common";

// CommonData
import { useCommonData } from "../../../context/CommonDataContext";

// Modal
import { useModal } from "../../../context/ModalContext";
// InboundPlanPop 컴포넌트가 있다고 가정 (없다면 주석 처리 필요)
// import InboundPlanPop from "./InboundPlanPop"; 

// --- 인터페이스 정의 ---
interface InboundPlanData {
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

interface InboundPlanDetailData {
  id: number;
  ibDetailSeq: number;
  ibProgStNm: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  pkqty: number;
  planTotQty: number;
  planBoxQty: number;
  planEaQty: number;
  ibCost: number;
  ibVat: number;
  ibAmt: number;
  makeLot: string;
  makeYmd: string;
  distExpiryYmd: string;
  lotId: string;
  useYnNm: string;
  remark: string;
  [key: string]: any;
}

interface SearchValues {
  ibNo: string;
  ibPlanYmd: string;
  [key: string]: any;
}

export default function InboundPlan() {
  const menuTitle = '입고예정';
  const PRO_URL = '/wms/ib/inboundPlan';
  const { openModal } = useModal();
  useCommonData();

  // 그리드 선택된 행
  const [selRowId, setSelRowId] = useState<number | string>(-1);
  const [selDtlRowId, setSelDtlRowId] = useState<number | string>(-1);
  
  // 데이터 리스트
  const [dataList, setDataList] = useState<InboundPlanData[]>([]);
  const [dataDtlList, setDataDtlList] = useState<InboundPlanDetailData[]>([]);

  // 조회조건
  const [schValues, setSchValues] = useState<SearchValues>({ 
    ibNo: "", 
    ibPlanYmd : gvGetToday()
  });

  // 핸들링하고 있는 rowData 저장
  const initData: Partial<InboundPlanData> = {
    id: dataList.length + 1,
    // useYn: "Y", // 데이터 타입에 없음, 필요시 추가
  }

  const [values, setValues] = useState<Partial<InboundPlanData>>(initData);

  // 입고전표 컬럼
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "dcNm", headerName: "물류창고", editable: false, align: "left", width: 120 },
    { field: "ibNo", headerName: "입고번호", editable: false, align: "left", width: 130 },
    { field: "clientNm", headerName: "고객사", editable: false, align: "left", width: 120 },
    { field: "ibGbnNm", headerName: "입고구분", editable: false, align: "left", width: 120 },
    { field: "ibProgStNm", headerName: "입고진행상태", editable: false, align: "left", width: 100 },
    { 
      field: "ibPlanYmd", headerName: "입고예정일자", editable: false, align: "left", width: 150,
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { 
      field: "ibYmd", headerName: "입고일자", editable: false, align: "left", width: 150,
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { field: "supplierNm", headerName: "공급처", editable: false, align: "left", width: 100 },
    { field: "useYnNm", headerName: "사용여부", editable: false, align: "left", width: 100 },
    { field: "remark", headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  // 입고전표 상세 컬럼
  const columnsDtl: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "ibDetailSeq", headerName: "순번", editable: false, align: "right", width: 60 },
    { field: "ibProgStNm", headerName: "진행상태", editable: false, align: "left", width: 100 },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 300 },
    { field: "itemStNm", headerName: "상품상태", editable: false, align: "left", width: 100 },
    { field: "pkqty", headerName: "입수", editable: false, align: "center", width: 100 },
    { 
      field: "planTotQty", headerName: "예정(총)", editable: false, align: "right", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { field: "planBoxQty", headerName: "예정(박스)", editable: false, align: "right", width: 100 },
    { field: "planEaQty", headerName: "예정(낱개)", editable: false, align: "right", width: 100 },
    { 
      field: "ibCost", headerName: "입고단가", editable: false, align: "right", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "ibVat", headerName: "입고VAT", editable: false, align: "right", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "ibAmt", headerName: "입고금액", editable: false, align: "right", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { field: "makeLot", headerName: "제조LOT", editable: false, align: "left", width: 150 },
    { 
      field: "makeYmd", headerName: "제조일자", editable: false, align: "left", width: 150,
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { 
      field: "distExpiryYmd", headerName: "유통기한일자", editable: false, align: "left", width: 150,
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { field: "lotId", headerName: "LOT_ID", editable: false, align: "left", width: 150 },
    { field: "useYnNm", headerName: "사용여부", editable: false, align: "left", width: 100 },
    { field: "remark", headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  // 조회조건 변경 핸들러
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

  useEffect(() => {
    // 초기 로딩 로직 (필요 시)
  }, []);

  // 조회
  const fnSearch = () => {
    setDataDtlList([]);

    const data = {
      ibNo : schValues.ibNo,
      ibPlanYmd : schValues.ibPlanYmd,
    };

    client.post(`${PRO_URL}/selectInboundPlanList`, data)
      .then(res => {
        const list: InboundPlanData[] = res.data;
        setDataList(list);

        if(list.length > 0){
          // 첫 번째 행 자동 선택
          // setSelRowId(list[0].id); // ID 기반 선택
          // fnSearchDtl(list[0]);
        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  // 상세 조회
  const fnSearchDtl = (rowData: InboundPlanData) => {
    // setSelRowId(rowData.id); // 호출하는 쪽에서 처리하거나 여기서 처리
    client.post(`${PRO_URL}/selectInboundPlanDetailList`, rowData)
      .then(res => {
        const list: InboundPlanDetailData[] = res.data;
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

  // 신규 클릭 (입고예정 팝업)
  const onClickAdd = () => {
    // 팝업 컴포넌트 (InboundPlanPop)가 구현되어 있어야 합니다.
    // 임시로 alert 처리하거나 실제 컴포넌트 연결
    // openModal('INBOUND_PLAN_POP', '입고예정 팝업', <InboundPlanPop />, handleInboundPlanUpdate, '1200px', '750px');
    alert("입고예정 등록 팝업 준비 중입니다.");
  }

  // 입고예정팝업 콜백함수
  const handleInboundPlanUpdate = (props: any) => {
    fnSearch();
  };

  return (
    <>
      <ComDeGrid
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        searchBarChildren={
          <FieldRow>
            <SchTextField id="ibNo" label="입고번호/명" onChange={onChangeSearch} />
            <SchDateField id="ibPlanYmd" label="입고예정일" selected={schValues.ibPlanYmd} onChange={onChangeSearch} />
          </FieldRow>
        }

        title={"Inbound List"}
        dataList={dataList}
        columns={columns}
        height={"250px"}
        onRowClick={(params) => {
            setSelRowId(params.id); 
            fnSearchDtl(params.row as InboundPlanData);
        }}
        type={"single"}
      />

      <ComDeGrid
        title={"Inbound Detail List"}
        dataList={dataDtlList}
        columns={columnsDtl}
        onRowClick={(params) => {
            setSelDtlRowId(params.id);
        }}
        type={"single"}
      />
    </>
  );
}