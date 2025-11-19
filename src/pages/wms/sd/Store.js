import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { useModal } from "../../../context/ModalContext.js";
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SchTextField, GridDateRenderField, GridDateSetField } from "../../../components/SearchBar/CmmnTextField.js";
import { client } from "../../../contraints.js";
import {
  gvGridDropdownDisLabel,
  gvGetRowData,
  gvGridFieldEmailInput,
  gvGridFieldFormatPhoneNumber,
  gvGridFieldFormatFaxNumber
} from "../../../components/Common.js";
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

export default function Store() {
  const PRO_URL = "/wms/sd/store";
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState([]);
  const [selRowId, setSelRowId] = useState(-1);
  const [callbackDelivery, setCallbackDelivery] = useState(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const [clientCdCmb, setClientCdCmb] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const [dealGbnCdCmb, setDealGbnCdCmb] = useState([]);

  // 초기 데이터
  const initValues = {
    id: dataList.length + 1,
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

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "clientCd", headerName: "고객사", editable: true, align: "center", type: "singleSelect", valueOptions: clientCdCmb, valueFormatter: gvGridDropdownDisLabel },
    { field: "storeCd", headerName: "배송처코드", editable: true, align: "left", width: 100 },
    { field: "storeNm", headerName: "배송처명", editable: true, align: "left", width: 200 },
    {
      field: "deliveryNm",
      headerName: "배송처명",
      editable: true,
      align: "left",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: 1, alignItems: "center" }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton><SearchIcon /></IconButton>
        </Box>
      ),
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
    { field: "deliveryDcCd", headerName: "배송물류센터", editable: true, align: "left", width: 100 },
    { field: "deliveryDomainCd", headerName: "배송권역코드", editable: true, align: "left", width: 100 },
    {
      field: "dealStartYmd",
      headerName: "거래시작일자",
      editable: true,
      align: "left",
      width: 150,
      valueSetter: (params) => GridDateSetField(params, "dealStartYmd"),
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    {
      field: "dealEndYmd",
      headerName: "거래종료일자",
      editable: true,
      align: "left",
      width: 150,
      valueSetter: (params) => GridDateSetField(params, "dealEndYmd"),
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "dealGbnCd", headerName: "거래구분코드", editable: true, align: "center", type: "singleSelect", valueOptions: dealGbnCdCmb, valueFormatter: gvGridDropdownDisLabel },
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueOptions: useYnCmb, valueFormatter: gvGridDropdownDisLabel },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  useEffect(() => {
    if (callbackDelivery && selRowId !== -1) {
      setDataList((prevDataList) =>
        prevDataList.map((row) => (row.id === selRowId ? { ...row, ...callbackDelivery } : row))
      );
      setCallbackDelivery(null);
    } else {
      setUseYnCmb(getCmbOfGlobalData("CMMN_CD", "USE_YN"));
      setDealGbnCdCmb(getCmbOfGlobalData("CMMN_CD", "DEAL_GBN_CD"));
      if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ""));
    }
  }, [selRowId, callbackDelivery, clientCdCmb]);

  const fnSearch = () => {
    client.post(`${PRO_URL}/selectStoreList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.log("error =", error));
  };

  const onClickAdd = () => {
    setDataList((prevDataList) => [...prevDataList, { ...initValues, id: prevDataList.length + 1 }]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal("", "", "저장 하시겠습니까?", () => {
      client.post(`${PRO_URL}/saveStore`, rowData)
        .then(() => {
          alert("저장되었습니다.");
          fnSearch();
        })
        .catch((error) => console.log("error =", error));
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal("", "", "삭제 하시겠습니까?", () => {
      client.post(`${PRO_URL}/deleteStore`, rowData)
        .then(() => {
          alert("삭제되었습니다.");
          fnSearch();
        })
        .catch((error) => console.log("error =", error));
    });
  };

  const handleGridCellClick = (e) => {
    setSelRowId(e.row.id);
    if (e.field === "deliveryNm") openPopupFindAddress();
  };

  const openPopupFindAddress = () => {
    openModal("FIND_ADDR", "주소 찾기", <DaumPostcodeShppingMall />, setCallbackDelivery, "1000px", "600px");
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
      setDataList((prevDataList) =>
        prevDataList.map((row) => (row.id === id ? { ...row, [field]: value } : row))
      );
    },
    []
  );

  return (
    <>
      <PageTitle title="배송처 관리" />
      <ComDeGrid
        onClickSelect={fnSearch}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        searchBarChildren={
          <SchTextField id="codeCd" label="코드/명" div="3" onChange={(e) => setSchValues({ ...schValues, codeCd: e.target.value })} onKeyDown={(e) => e.key === "Enter" && fnSearch()} />
        }
        title="Store List"
        dataList={dataList}
        columns={columns}
        height="750px"
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
        type="single"
      />
    </>
  );
}
