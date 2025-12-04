import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material"; // Box import 추가
import { GridColDef, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar"; // SearchBar import 추가
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { SchTextField, FieldRow } from "../../../components/SearchBar/CmmnTextField";

// Common
import { client } from '../../../constraints'; 
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
  const PRO_URL = '/wms/st/StockInqueryByItem'; // URL 대소문자 확인
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState<StockInqueryItemData[]>([]);
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null);
  const [dcCdCmb, setDcCdCmb] = useState<any[]>([]);
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);

  const [schValues, setSchValues] = useState<SearchValues>({
    dcCd: "",
    clientCd: "",
    itemCd: "",
  });

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
    if (dcCdCmb.length === 0) setDcCdCmb(getCmbOfGlobalData("DC_CD", ''));
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
  }, [dcCdCmb, clientCdCmb, getCmbOfGlobalData]);

  const fnSearch = () => {
    const data = { ...schValues };
    client.post(`${PRO_URL}/selectList`, data)
      .then((res) => {
        setDataList(res.data);
      })
      .catch((error) => console.log('error = ', error));
  };

  const onClickSelect = () => fnSearch();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title={menuTitle} />
      
      <SearchBar onClickSelect={onClickSelect}>
        <FieldRow>
          <SchTextField id="dcCd" label="물류센터" onChange={onChangeSearch} />
          <SchTextField id="clientCd" label="고객사" onChange={onChangeSearch}  />
          <SchTextField id="itemCd" label="상품" onChange={onChangeSearch}  />
          <SchTextField id="locCd" label="로케이션" onChange={onChangeSearch}  />
        </FieldRow>
      </SearchBar>

      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          title={"Stock Inquiry by Item List"}
          dataList={dataList}
          columns={columns}
          height="100%"
          onRowClick={(params) => setSelRowId(params.id)}
          type="single"
        />
      </Box>
    </Box>
  );
}