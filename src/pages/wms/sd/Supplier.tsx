import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRenderEditCellParams, GridRowId } from '@mui/x-data-grid';

// context
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField, GridDateRenderField, GridDateSetField } from "../../../components/SearchBar/CmmnTextField";
import { client } from '../../../constraints'; // 오타 수정
import {
  gvGridDropdownDisLabel,
  gvGetRowData,
  gvGridFieldEmailInput,
  gvGridFieldFormatPhoneNumber,
  gvGridFieldFormatFaxNumber
} from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall";

// --- 데이터 타입 정의 ---
interface SupplierData {
  id: number;
  bizCd?: string;
  clientCd: string;
  supplierCd: string;
  supplierNm: string;
  deliveryNm?: string;
  zip?: string;
  jibunAddr?: string;
  roadAddr?: string;
  detailAddr?: string;
  lat?: string;
  lon?: string;
  telNo: string;
  faxNo: string;
  contactNm: string;
  contactTelNo: string;
  contactEmail: string;
  dealStartYmd?: string;
  dealEndYmd?: string;
  dealGbnCd?: string;
  useYn: string;
  remark: string;
  [key: string]: any;
}

export default function Supplier() {
  const PRO_URL = '/wms/sd/supplier';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState<SupplierData[]>([]);
  const [selRowId, setSelRowId] = useState<GridRowId>(-1);
  const [callbackDelivery, setCallbackDelivery] = useState<any>(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  
  // 콤보박스
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [dealGbnCdCmb, setDealGbnCdCmb] = useState<any[]>([]);

  // 초기 데이터
  const initData: SupplierData = {
    id: 0,
    bizCd: '',
    clientCd: "",
    supplierCd: "",
    supplierNm: "",
    deliveryNm: "",
    zip: "",
    jibunAddr: "",
    roadAddr: "",
    detailAddr: "",
    telNo: "",
    faxNo: "",
    contactNm: "",
    contactTelNo: "",
    contactEmail: "",
    dealStartYmd: "",
    dealEndYmd: "99991231",
    dealGbnCd: "10",
    remark: "",
    useYn: "Y",
  };

  const [values, setValues] = useState<SupplierData>(initData);

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { 
      field: "clientCd", 
      headerName: "고객사", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: clientCdCmb,
      width: 120
    },
    { field: "supplierCd", headerName: "공급처코드", editable: false, align: "left", width: 100 },
    { field: "supplierNm", headerName: "공급처명", editable: true, align: "left", width: 200 },
    {
      field: "deliveryNm", 
      headerName: "배송처명", 
      editable: false, 
      align: "left", 
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton size="small"><SearchIcon fontSize="small" /></IconButton>
        </Box>
      )
    },
    { field: "zip", headerName: "우편번호", editable: false, align: "left", width: 100 },
    { field: "jibunAddr", headerName: "지번주소", editable: false, align: "left", width: 300 },
    { field: "roadAddr", headerName: "도로명주소", editable: false, align: "left", width: 300 },
    { field: "detailAddr", headerName: "상세주소", editable: true, align: "left", width: 300 },
    { field: "lat", headerName: "위도", editable: false, align: "left", width: 150 },
    { field: "lon", headerName: "경도", editable: false, align: "left", width: 150 },
    { 
      field: "telNo", 
      headerName: "전화번호", 
      editable: true, 
      align: "left", 
      width: 150, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatPhoneNumber(params.value) 
    },
    { 
      field: "faxNo", 
      headerName: "팩스", 
      editable: true, 
      align: "left", 
      width: 120, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatFaxNumber(params.value) 
    },
    { field: "contactNm", headerName: "담당자명", editable: true, align: "left", width: 100 },
    { 
      field: "contactTelNo", 
      headerName: "담당자전화번호", 
      editable: true, 
      align: "left", 
      width: 150, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatPhoneNumber(params.value) 
    },
    { 
      field: "contactEmail", 
      headerName: "담당자이메일", 
      editable: true, 
      align: "left", 
      width: 200, 
      renderEditCell: (params: GridRenderEditCellParams) => gvGridFieldEmailInput({ ...params, value: params.value ?? "" }) 
    },
    {
      field: "dealStartYmd", headerName: "거래시작일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => GridDateSetField(params, 'dealStartYmd'),
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />
    },
    {
      field: "dealEndYmd", headerName: "거래종료일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => GridDateSetField(params, 'dealEndYmd'),
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />
    },
    { 
      field: "dealGbnCd", 
      headerName: "거래구분코드", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: dealGbnCdCmb 
    },
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
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 }
  ];

  useEffect(() => {
    if (selRowId !== -1 && callbackDelivery) {
      const updatedDataList = dataList.map((row) => {
        if (row.id === selRowId) {
          return { ...row, ...callbackDelivery };
        }
        return row;
      });
      setDataList(updatedDataList);
      setCallbackDelivery(null);
    }
    
    if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (dealGbnCdCmb.length === 0) setDealGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'DEAL_GBN_CD'));
  }, [selRowId, callbackDelivery, dataList, clientCdCmb, useYnCmb, dealGbnCdCmb, getCmbOfGlobalData]);

  const onChangeSearch = (value: string, id?: string) => {
    if (id) setSchValues({ ...schValues, [id]: value });
  };

  const fnSearch = () => {
    client.post(`${PRO_URL}/selectSupplierList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initData, id: newId };
    setDataList(prev => [...prev, newRow]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveSupplier`, rowData)
        .then(() => {
          // alert('저장되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteSupplier`, rowData)
        .then(() => {
          // alert('삭제되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const handleGridCellClick = (params: any) => {
    setValues(params.row);
    setSelRowId(params.row.id);
    if (params.field === 'deliveryNm') {
        openPopupFindAddress();
    }
  };

  const openPopupFindAddress = () => {
    openModal('FIND_ADDR', '주소 찾기', <DaumPostcodeShppingMall />, handleAddressUpdate, '1000px', '600px');
  };

  const handleAddressUpdate = (addressData: any) => {
    setCallbackDelivery(addressData);
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      setDataList((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    },
    []
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title="공급처 관리" />
      
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
          title="Supplier List"
          dataList={dataList}
          columns={columns}
          height="100%"
          type="single"
          onCellClick={handleGridCellClick}
          onCellEditCommit={handleEditCellChangeCommitted}
        />
      </Box>
    </Box>
  );
}