import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRenderEditCellParams } from '@mui/x-data-grid';

// --- 1. MOCK DATA & UTILS ---
// (기존의 내부 정의된 mock client, context 등을 그대로 유지하거나 외부 import로 대체 가능)
// 여기서는 일관성을 위해 외부 import로 가정하지만, 파일 내부에 포함되어 있던 구조를 유지합니다.
// 실제 프로젝트에서는 Common.tsx 등으로 분리하는 것이 좋습니다.

import { 
  gvGridDropdownDisLabel, 
  gvGridFieldFormatPhoneNumber, 
  gvGridFieldFormatFaxNumber,
  gvGridFieldEmailInput,
  gvGetRowData,
} from "../../../components/Common"; // Common.tsx에서 가져옴
import { client } from '../../../constraints'; // constraints 오타 수정 확인
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// --- 데이터 타입 정의 ---
interface StoreData {
  id: number;
  clientCd: string;
  storeCd: string;
  storeNm: string;
  zip: string;
  jibunAddr: string;
  roadAddr: string;
  detailAddr: string;
  lat: string;
  lon: string;
  telNo: string;
  faxNo: string;
  contactNm: string;
  contactTelNo: string;
  contactEmail: string;
  deliveryDcCd: string;
  deliveryDomainCd: string;
  dealStartYmd: string;
  dealEndYmd: string;
  dealGbnCd: string;
  useYn: string;
  remark: string;
  deliveryNm?: string;
  [key: string]: any;
}

export default function StoreContent() {
  const PRO_URL = "/wms/sd/store";
  const { openModal } = useModal(); 
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState<StoreData[]>([]);
  const [selRowId, setSelRowId] = useState<number>(-1);
  const [callbackDelivery, setCallbackDelivery] = useState<any>(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [dealGbnCdCmb, setDealGbnCdCmb] = useState<any[]>([]);

  // 초기 데이터
  const initValues: StoreData = {
    id: 0,
    clientCd: "",
    storeCd: "",
    storeNm: "",
    zip: "",
    jibunAddr: "",
    roadAddr: "",
    detailAddr: "",
    lat: "",
    lon: "",
    telNo: "",
    faxNo: "",
    contactNm: "",
    contactTelNo: "",
    contactEmail: "",
    deliveryDcCd: "",
    deliveryDomainCd: "",
    dealStartYmd: "",
    dealEndYmd: "",
    dealGbnCd: "",
    useYn: "Y",
    remark: "",
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 50 },
    { 
        field: "clientCd", 
        headerName: "고객사", 
        editable: true, 
        align: "center", 
        type: "singleSelect", 
        valueOptions: clientCdCmb, 
        valueFormatter: gvGridDropdownDisLabel,
        width: 120
    },
    { field: "storeCd", headerName: "배송처코드", editable: true, align: "left", width: 100 },
    { field: "storeNm", headerName: "배송처명", editable: true, align: "left", width: 200 },
    {
      field: "deliveryNm",
      headerName: "배송처찾기",
      editable: false,
      align: "left",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: "center" }}>
          <Typography variant="body2" noWrap sx={{flex:1}}>{params.value || "검색"}</Typography>
          <IconButton size="small"><SearchIcon fontSize="small" /></IconButton>
        </Box>
      ),
    },
    { field: "zip", headerName: "우편번호", editable: false, align: "left", width: 80 },
    { field: "jibunAddr", headerName: "지번주소", editable: false, align: "left", width: 200 },
    { field: "roadAddr", headerName: "도로명주소", editable: false, align: "left", width: 200 },
    { field: "detailAddr", headerName: "상세주소", editable: true, align: "left", width: 200 },
    { field: "lat", headerName: "위도", editable: false, align: "left", width: 80 },
    { field: "lon", headerName: "경도", editable: false, align: "left", width: 80 },
    { field: "telNo", headerName: "전화번호", editable: true, align: "left", width: 120, valueFormatter: (params) => gvGridFieldFormatPhoneNumber(params.value) },
    { field: "contactNm", headerName: "담당자명", editable: true, align: "left", width: 100 },
    { 
        field: "useYn", 
        headerName: "사용여부", 
        editable: true, 
        align: "center", 
        type: "singleSelect", 
        valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
        width: 80
    },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 200 },
  ];

  useEffect(() => {
    if (callbackDelivery && selRowId !== -1) {
      setDataList((prevDataList) =>
        prevDataList.map((row) => (row.id === selRowId ? { ...row, ...callbackDelivery } : row))
      );
      setCallbackDelivery(null);
    } 
    
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ""));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData("CMMN_CD", "USE_YN"));
    if (dealGbnCdCmb.length === 0) setDealGbnCdCmb(getCmbOfGlobalData("CMMN_CD", "DEAL_GBN_CD"));
    
  }, [selRowId, callbackDelivery, clientCdCmb, getCmbOfGlobalData, useYnCmb, dealGbnCdCmb]);

  const onChangeSearch = (value: string, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: value });
    }
  };

  const fnSearch = () => {
    client.post(`${PRO_URL}/selectStoreList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.log("error =", error));
  };

  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d=>d.id)) + 1 : 1;
    setDataList((prevDataList) => [...prevDataList, { ...initValues, id: newId }]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal("", "알림", "저장 하시겠습니까?", () => {
      client.post(`${PRO_URL}/saveStore`, rowData)
        .then(() => {
          // alert("저장되었습니다.");
          fnSearch();
        })
        .catch((error) => console.log("error =", error));
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal("", "알림", "삭제 하시겠습니까?", () => {
      client.post(`${PRO_URL}/deleteStore`, rowData)
        .then(() => {
          // alert("삭제되었습니다.");
          fnSearch();
        })
        .catch((error) => console.log("error =", error));
    });
  };

  const handleGridCellClick = (params: any) => {
    setSelRowId(params.row.id);
    if (params.field === "deliveryNm") {
        openPopupFindAddress();
    }
  };

  const openPopupFindAddress = () => {
    openModal("FIND_ADDR", "주소 찾기", <DaumPostcodeShppingMall />, setCallbackDelivery, "1000px", "600px");
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      setDataList((prevDataList) =>
        prevDataList.map((row) => (row.id === id ? { ...row, [field]: value } : row))
      );
    },
    []
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title="배송처 관리" />
      
      <SearchBar 
        onClickSelect={fnSearch}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
      >
        <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch} />
      </SearchBar>

      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          title="Store List"
          dataList={dataList}
          columns={columns}
          type="single"
          onCellClick={handleGridCellClick}
          onCellEditCommit={handleEditCellChangeCommitted}
          height="100%"
        />
      </Box>
    </Box>
  );
}