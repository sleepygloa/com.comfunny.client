import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridCellParams } from '@mui/x-data-grid';

import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { client } from '../../../constraints';
import {
  gvGridDropdownDisLabel,
  gvGetRowData,
  gvSetDropdownData,
  gvSetLevelDropdownData,
  gvSetLevel2DropdownData,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser,
} from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// --- 데이터 타입 정의 ---
interface ItemData {
  id: number;
  clientCd: string;
  itemCd: string;
  itemNm: string;
  itemGbnCd: string;
  largeClassCd: string;
  middleClassCd: string;
  smallClassCd: string;
  keepTempeGbnCd: string;
  minUomCd: string;
  setItemYn: string;
  vatYn: string;
  useYn: string;
  remark: string;
  
  // 숫자 필드 (초기값 0)
  horizontal: number;
  vertical: number;
  height: number;
  cbm: number;
  weight: number;
  inBoxQty: number;
  inPltQty: number;
  dayAvgOutQty: number;
  safeDay: number;
  safeQty: number;
  replenishQty: number;

  [key: string]: any;
}

export default function Item() {
  const PRO_URL = '/wms/sd/item';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  // 상태 관리
  const [dataList, setDataList] = useState<ItemData[]>([]);
  const [selRowId, setSelRowId] = useState<number>(-1);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  
  // 초기값
  const initValues: ItemData = {
    id: 0,
    clientCd: '',
    itemCd: '',
    itemNm: '',
    itemGbnCd: '',
    largeClassCd: '',
    middleClassCd: '',
    smallClassCd: '',
    keepTempeGbnCd: '',
    minUomCd: '',
    setItemYn: 'N',
    vatYn: 'Y',
    useYn: 'Y',
    remark: '',
    horizontal: 0,
    vertical: 0,
    height: 0,
    cbm: 0,
    weight: 0,
    inBoxQty: 0,
    inPltQty: 0,
    dayAvgOutQty: 0,
    safeDay: 0,
    safeQty: 0,
    replenishQty: 0,
  };

  const [values, setValues] = useState<ItemData>(initValues);

  // 콤보박스 데이터 관리
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);
  const [keepTempeGbnCdCmb, setKeepTempeGbnCdCmb] = useState<any[]>([]);
  const [minUomCdCmb, setMinUomCdCmb] = useState<any[]>([]);
  const [setItemYnCmb, setSetItemYnCmb] = useState<any[]>([]);
  const [vatYnCmb, setVatYnCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [largeClassCdCmb, setLargeClassCdCmb] = useState<any[]>([]);
  const [largeMiddleClassCdCmb, setLargeMiddleClassCdCmb] = useState<any[]>([]);
  const [largeMiddleSmallClassCdCmb, setLargeMiddleSmallClassCdCmb] = useState<any[]>([]);
  const [itemGbnCdCmb, setItemGbnCdCmb] = useState<any[]>([]);

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "clientCd", headerName: "고객사", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: clientCdCmb, width: 150 },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: true, align: "left", width: 200 },
    { field: "itemGbnCd", headerName: "상품구분", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: itemGbnCdCmb, width: 100 },
    
    // 분류 (계층 구조)
    { field: "largeClassCd", headerName: "대분류", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: largeClassCdCmb, width: 120 },
    { field: "middleClassCd", headerName: "중분류", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: largeMiddleClassCdCmb, width: 120 },
    { field: "smallClassCd", headerName: "소분류", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: largeMiddleSmallClassCdCmb, width: 120 },
    
    { field: "keepTempeGbnCd", headerName: "보관온도", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: keepTempeGbnCdCmb, width: 100 },
    
    // 숫자형 데이터
    { field: "horizontal", headerName: "가로(mm)", editable: true, align: "right", type: "number", width: 80, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    { field: "vertical", headerName: "세로(mm)", editable: true, align: "right", type: "number", width: 80, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    { field: "height", headerName: "높이(mm)", editable: true, align: "right", type: "number", width: 80, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    { field: "cbm", headerName: "CBM", editable: false, align: "right", type: "number", width: 80, valueFormatter: gvGridFieldNumberFormatter },
    { field: "weight", headerName: "중량(kg)", editable: true, align: "right", type: "number", width: 80, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    
    { field: "minUomCd", headerName: "최소단위", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: minUomCdCmb, width: 80 },
    { field: "inBoxQty", headerName: "박스입수", editable: true, align: "right", type: "number", width: 80, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    { field: "inPltQty", headerName: "팔레트입수", editable: true, align: "right", type: "number", width: 80, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    
    { field: "setItemYn", headerName: "세트여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: setItemYnCmb, width: 80 },
    { field: "vatYn", headerName: "과세여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: vatYnCmb, width: 80 },
    
    { field: "dayAvgOutQty", headerName: "일평균출고", editable: true, align: "right", type: "number", width: 90, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    { field: "safeDay", headerName: "안전재고일수", editable: true, align: "right", type: "number", width: 90, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    { field: "safeQty", headerName: "안전재고수량", editable: true, align: "right", type: "number", width: 90, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },
    { field: "replenishQty", headerName: "보충기준수량", editable: true, align: "right", type: "number", width: 90, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser, preProcessEditCellProps: gvGridFieldNumberPreEdit },

    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb, width: 80 },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 200 },
  ];

  // 조회
  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectItemList`, data)
      .then((res) => setDataList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  // 데이터 초기화 및 콤보박스 데이터 로드
  useEffect(() => {
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (keepTempeGbnCdCmb.length === 0) setKeepTempeGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD'));
    if (minUomCdCmb.length === 0) setMinUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
    if (setItemYnCmb.length === 0) setSetItemYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (vatYnCmb.length === 0) setVatYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (itemGbnCdCmb.length === 0) setItemGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'ITEM_GBN_CD'));
    
    if (largeClassCdCmb.length === 0) loadClassificationData();
  }, [clientCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb, itemGbnCdCmb, largeClassCdCmb, getCmbOfGlobalData]);

  const loadClassificationData = () => {
    client.post(`${PRO_URL}/selectLargeClassCdList`, {}).then(res => setLargeClassCdCmb(gvSetDropdownData(res.data))).catch(console.log);
    client.post(`${PRO_URL}/selectLargeMiddleClassCdList`, {}).then(res => {
      const obj = gvSetLevelDropdownData(res.data);
      setLargeMiddleClassCdCmb(Object.values(obj).flat());
    }).catch(console.log);
    client.post(`${PRO_URL}/selectLargeMiddleSmallClassCdList`, {}).then(res => {
      const obj = gvSetLevel2DropdownData(res.data);
      setLargeMiddleSmallClassCdCmb(Object.values(obj).flatMap((v: any) => Object.values(v).flat()));
    }).catch(console.log);
  };

  const onChangeSearch = (event: any, id?: string) => {
    if (id) setSchValues({ ...schValues, [id]: event });
  };

  const onClickSelect = () => fnSearch();
  
  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initValues, id: newId };
    setDataList(prev => [...prev, newRow]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveItem`, rowData)
        .then(() => {
          alert('저장되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteItem`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const onClickCopy = () => {
    if (selRowId === -1) {
      openModal('', 'A', '복사할 행을 선택해주세요.');
      return;
    }
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const copyData = { ...rowData, id: newId, itemCd: '', itemClassCd: '' }; // itemCd 초기화
    setDataList(prev => [...prev, copyData]);
  };

  const handleGridCellClick = (e: any) => {
    setValues(e.row);
    setSelRowId(e.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      const numValue = Number(value);
      
      // 가로/세로/높이 변경 시 CBM 자동 계산 로직
      if (['horizontal', 'vertical', 'height'].includes(field)) {
        setDataList((prev) => prev.map((row) => {
            if (row.id === id) {
                const h = field === 'horizontal' ? numValue : (row.horizontal || 0);
                const v = field === 'vertical' ? numValue : (row.vertical || 0);
                const he = field === 'height' ? numValue : (row.height || 0);
                // CBM = 가로(mm) * 세로(mm) * 높이(mm) / 1,000,000,000 (소수점 9자리)
                const cbm = (h * v * he) / 1000000000;
                return { ...row, [field]: numValue, cbm: Number(cbm.toFixed(9)) }; 
            }
            return row;
        }));
      } else {
        setDataList((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
      }
    },
    []
  );

  return (
    <>
      <PageTitle title="상품 관리" />
      <SearchBar onClickSelect={onClickSelect} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}>
        <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch} />
      </SearchBar>

      <ComDeGrid
        title="Item List"
        dataList={dataList}
        columns={columns}
        height="750px"
        type="single"
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
        onClickCustom1={onClickCopy}
        onClickCustomNm1="복사"
      />
    </>
  );
}