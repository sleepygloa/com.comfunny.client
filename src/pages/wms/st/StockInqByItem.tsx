import React, { useState, useEffect } from 'react';
import { GridColDef, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { SchTextField, FieldRow } from "../../../components/SearchBar/CmmnTextField";

// Common
import { client } from '../../../constraints'; // 오타 수정 contraints -> constraints
import { gvGridFieldNumberFormatter } from "../../../components/Common";
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// --- 인터페이스 정의 ---

interface StockInqueryItemData {
  id: number;
  dcNm: string;
  clientNm: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  stockQty: number;
  ibPlanQty: number;
  obPlanQty: number;
  holdQty: number;
  canStockQty: number;
  [key: string]: any;
}

interface SearchValues {
  dcCd: string;
  clientCd: string;
  itemCd: string;
  [key: string]: any;
}

export default function StockInqByItem() {
  const menuTitle = '제품별 재고조회';
  const PRO_URL = '/wms/st/StockInqByItem';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  // 상태 관리
  const [dataList, setDataList] = useState<StockInqueryItemData[]>([]);
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null);
  
  // 콤보박스 데이터 (현재는 초기화 로직만 있고 실제 사용은 안 됨 - 추후 Select로 변경 가능성 있음)
  const [dcCdCmb, setDcCdCmb] = useState<any[]>([]);
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);

  // 조회 조건 상태
  const [schValues, setSchValues] = useState<SearchValues>({
    dcCd: "",
    clientCd: "",
    itemCd: "",
  });

  // 그리드 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "dcNm", headerName: "물류창고", align: "left", width: 120 },
    { field: "clientNm", headerName: "고객사", align: "left", width: 120 },
    { field: "itemCd", headerName: "상품코드", align: "left", width: 120 },
    { field: "itemNm", headerName: "상품명", align: "left", width: 300 },
    { field: "itemStNm", headerName: "상품상태", align: "left", width: 120 },
    { 
      field: "stockQty", headerName: "재고수량", align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "ibPlanQty", headerName: "입고예정수량", align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "obPlanQty", headerName: "출고예정수량", align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "holdQty", headerName: "보류수량", align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "canStockQty", headerName: "가용재고수량", align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
  ];

  // 조회 조건 변경 핸들러
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

  // 초기 콤보박스 데이터 로드
  useEffect(() => {
    if (dcCdCmb.length === 0) setDcCdCmb(getCmbOfGlobalData("DC_CD", ''));
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
  }, [dcCdCmb, clientCdCmb, getCmbOfGlobalData]);

  // 조회 함수
  const fnSearch = () => {
    const data = { ...schValues };
    client.post(`${PRO_URL}/selectList`, data)
      .then((res) => {
        const list: StockInqueryItemData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
            // 첫 번째 행 선택 (필요 시 주석 해제)
            // setSelRowId(list[0].id);
        }
      })
      .catch((error) => console.log('error = ', error));
  };

  const onClickSelect = () => fnSearch();

  return (
    <>
      <PageTitle title={menuTitle} />
      <ComDeGrid
        onClickSelect={onClickSelect}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="dcCd" label="물류센터" onChange={onChangeSearch}  />
            <SchTextField id="clientCd" label="고객사" onChange={onChangeSearch} />
            <SchTextField id="itemCd" label="상품" onChange={onChangeSearch}  />
          </FieldRow>
        }
        title={"Stock Inquiry by Item List"}
        dataList={dataList}
        columns={columns}
        height="500px"
        onRowClick={(params) => setSelRowId(params.id)}
        type="single"
      />
    </>
  );
}