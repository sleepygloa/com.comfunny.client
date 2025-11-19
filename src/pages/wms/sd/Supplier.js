import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { useModal } from "../../../context/ModalContext.js";
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SchTextField, GridDateRenderField, GridDateSetField } from "../../../components/SearchBar/CmmnTextField.js";
import { client } from '../../../contraints.js';
import {
  gvGridDropdownDisLabel,
  gvGetRowData,
  gvGridFieldEmailInput,
  gvGridFieldFormatPhoneNumber,
  gvGridFieldFormatFaxNumber
} from "../../../components/Common.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall.js";
import SearchIcon from '@mui/icons-material/Search';

export default function Supplier() {
  const PRO_URL = '/wms/sd/supplier';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState([]);
  const [selRowId, setSelRowId] = useState(-1);
  const [callbackDelivery, setCallbackDelivery] = useState(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  const [clientCdCmb, setClientCdCmb] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const [dealGbnCdCmb, setDealGbnCdCmb] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "clientCd", headerName: "고객사", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: clientCdCmb },
    { field: "supplierCd", headerName: "공급처코드", editable: false, align: "left", width: 100 },
    { field: "supplierNm", headerName: "공급처명", editable: true, align: "left", width: 200 },
    {
      field: "deliveryNm", headerName: "배송처명", editable: true, align: "left", width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton onClick={() => openPopupFindAddress()}><SearchIcon /></IconButton>
        </Box>
      )
    },
    { field: "zip", headerName: "우편번호", editable: false, align: "left", width: 100 },
    { field: "jibunAddr", headerName: "지번주소", editable: false, align: "left", width: 300 },
    { field: "roadAddr", headerName: "도로명주소", editable: false, align: "left", width: 300 },
    { field: "detailAddr", headerName: "상세주소", editable: true, align: "left", width: 300 },
    { field: "lat", headerName: "위도", editable: false, align: "left", width: 150 },
    { field: "lon", headerName: "경도", editable: false, align: "left", width: 150 },
    { field: "telNo", headerName: "전화번호", editable: true, align: "left", width: 150, valueFormatter: gvGridFieldFormatPhoneNumber },
    { field: "faxNo", headerName: "팩스", editable: true, align: "left", width: 120, valueFormatter: gvGridFieldFormatFaxNumber },
    { field: "contactNm", headerName: "담당자명", editable: true, align: "left", width: 100 },
    { field: "contactTelNo", headerName: "담당자전화번호", editable: true, align: "left", width: 150, valueFormatter: gvGridFieldFormatPhoneNumber },
    { field: "contactEmail", headerName: "담당자이메일", editable: true, align: "left", width: 200, renderEditCell: gvGridFieldEmailInput },
    {
      field: "dealStartYmd", headerName: "거래시작일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => GridDateSetField(params, 'dealStartYmd'),
      renderCell: (params) => <GridDateRenderField params={params} />
    },
    {
      field: "dealEndYmd", headerName: "거래종료일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => GridDateSetField(params, 'dealEndYmd'),
      renderCell: (params) => <GridDateRenderField params={params} />
    },
    { field: "dealGbnCd", headerName: "거래구분코드", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: dealGbnCdCmb },
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 }
  ];

  const initData = {
    id: dataList.length + 1,
    bizCd: '',
    clientCd: "",
    storeCd: "",
    storeNm: "",
    postNo: "",
    basicAddr: "",
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

  useEffect(() => {
    if (selRowId !== -1 && callbackDelivery) {
      const rowData = gvGetRowData(dataList, selRowId);
      Object.assign(rowData, callbackDelivery);
      setCallbackDelivery(null);
      setDataList((prev) => prev.map((row) => (row.id === selRowId ? rowData : row)));
    }
  }, [selRowId, callbackDelivery, dataList]);

  useEffect(() => {
    if (!clientCdCmb.length) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (!useYnCmb.length) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (!dealGbnCdCmb.length) setDealGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'DEAL_GBN_CD'));
  }, [clientCdCmb, useYnCmb, dealGbnCdCmb, getCmbOfGlobalData]);

  const onChangeSearch = (event, id) => setSchValues({ ...schValues, [id]: event });

  const fnSearch = () => {
    client.post(`${PRO_URL}/selectSupplierList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  const onClickAdd = () => setDataList((prev) => [...prev, { ...initData, id: prev.length + 1 }]);

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (rowData) {
      openModal('', '', '저장 하시겠습니까?', () => {
        client.post(`${PRO_URL}/saveSupplier`, rowData)
          .then(() => {
            alert('저장되었습니다.');
            fnSearch();
          })
          .catch((error) => console.log('error = ', error));
      });
    }
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (rowData) {
      openModal('', '', '삭제 하시겠습니까?', () => {
        client.post(`${PRO_URL}/deleteSupplier`, rowData)
          .then(() => {
            alert('삭제되었습니다.');
            fnSearch();
          })
          .catch((error) => console.log('error = ', error));
      });
    }
  };

  const handleGridCellClick = (e) => {
    setSelRowId(e.row.id);
    if (e.field === 'deliveryNm') openPopupFindAddress();
  };

  const openPopupFindAddress = () => openModal('FIND_ADDR', '주소 찾기', <DaumPostcodeShppingMall />, handleAddressUpdate, '1000px', '600px');

  const handleAddressUpdate = (addressData) => setCallbackDelivery(addressData);

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => setDataList((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))),
    []
  );

  return (
    <>
      <PageTitle title="공급처 관리" />
      <ComDeGrid
        onClickSelect={fnSearch} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}
        searchBarChildren={
          <>
            <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} onKeyDown={(e) => e.key === 'Enter' && fnSearch()} />
          </>
        }
        title="Supplier List"
        dataList={dataList}
        columns={columns}
        height="750px"
        type="single"
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
      />
    </>
  );
}
