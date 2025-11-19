import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// context
import { useCommonData } from "../../../context/CommonDataContext.js";
import { useModal } from "../../../context/ModalContext.js";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField.js";
import { client } from '../../../contraints.js';
import {
  gvGridDropdownDisLabel,
  gvGridFieldFormatFaxNumber,
  gvGridFieldFormatPhoneNumber,
  gvGetRowData,
} from "../../../components/Common.js";
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

// 스타일 적용한 DataGrid 컬럼
const columns = [
  { field: "id", headerName: "ID", align: "center", width: 60 },
  { field: "dcCd", headerName: "물류창고코드", editable: true, align: "left", width: 180 },
  { field: "dcNm", headerName: "물류창고명", editable: true, align: "left", width: 250 },
  { field: "bizNo", headerName: "사업자번호", editable: true, align: "left", width: 120 },
  { field: "bizNm", headerName: "사업자명", editable: true, align: "left", width: 250 },
  /* 주소 시작 */
  {
    field: "deliveryNm",
    headerName: "배송처명",
    editable: false,
    align: "left",
    width: 180,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography variant="body2">{params.value}</Typography>
        <IconButton size="small"><SearchIcon /></IconButton>
      </Box>
    ),
  },
  { field: "zip", headerName: "우편번호", editable: false, align: "left", width: 100 },
  { field: "jibunAddr", headerName: "지번주소", editable: false, align: "left", width: 250 },
  { field: "roadAddr", headerName: "도로명주소", editable: false, align: "left", width: 250 },
  { field: "detailAddr", headerName: "상세주소", editable: false, align: "left", width: 250 },
  { field: "lat", headerName: "위도", editable: false, align: "left", width: 150 },
  { field: "lon", headerName: "경도", editable: false, align: "left", width: 150 },
  /* 주소 끝 */
  {
    field: "telNo",
    headerName: "전화번호",
    editable: true,
    align: "left",
    width: 120,
    valueFormatter: (params) => gvGridFieldFormatPhoneNumber(params.value),
  },
  {
    field: "faxNo",
    headerName: "팩스",
    editable: true,
    align: "left",
    width: 120,
    valueFormatter: (params) => gvGridFieldFormatFaxNumber(params.value),
  },
  {
    field: "useYn",
    headerName: "사용여부",
    editable: true,
    align: "center",
    width: 80,
    type: "singleSelect",
    valueOptions: [{ value: "Y", label: "사용" }, { value: "N", label: "미사용" }],
    valueFormatter: gvGridDropdownDisLabel,
  },
  { field: "etcNo1", headerName: "기타번호1", editable: true, align: "left", width: 80 },
  { field: "etcNo2", headerName: "기타번호2", editable: true, align: "left", width: 80 },
  { field: "etcTp1", headerName: "기타유형1", editable: true, align: "left", width: 80 },
  { field: "etcTp2", headerName: "기타유형2", editable: true, align: "left", width: 80 },
];

export default function Dc() {
  const PRO_URL = '/wms/sd/dc';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState([]);
  const [selRowId, setSelRowId] = useState(-1);
  const [callbackDelivery, setCallbackDelivery] = useState(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  const [values, setValues] = useState({
    id: dataList.length + 1,
    dcCd: '',
    dcNm: '',
    bizNo: '',
    bizNm: '',
    ceoNm: '',
    postNo: '',
    basicAddr: '',
    detailAddr: '',
    bizTp: '',
    bizKnd: '',
    telNo: '',
    faxNo: '',
    contactNm: '',
    contactTelNo: '',
    contactEmail: '',
    countryCd: '',
    cityCd: '',
    userCol1: '',
    userCol2: '',
    userCol3: '',
    userCol4: '',
    userCol5: '',
    remark: '',
    useYn: 'Y',
  });

  useEffect(() => {
    if (callbackDelivery && selRowId !== -1) {
      const updatedDataList = dataList.map((row) => {
        if (row.id === selRowId) {
          return { ...row, ...callbackDelivery };
        }
        return row;
      });
      setDataList(updatedDataList);
      setCallbackDelivery(null);
    }
  }, [callbackDelivery, dataList, selRowId]);

  const onChangeSearch = (event, id) => {
    setSchValues({ ...schValues, [id]: event });
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectDcList`, data)
      .then((res) => {
        setDataList(res.data);
      })
      .catch((error) => console.log('error = ', error));
  };

  const onClickAdd = () => {
    setDataList((prevDataList) => [...prevDataList, { ...values, id: prevDataList.length + 1 }]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveDc`, rowData)
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
      client.post(`${PRO_URL}/deleteDc`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch((error) => console.log('error = ', error));
    });
  };

  const handleGridCellClick = (e) => {
    setValues(e.row);
    setSelRowId(e.row.id);
    if (e.field === 'deliveryNm') {
      openPopupFindAddress();
    }
  };

  const openPopupFindAddress = () => {
    openModal('FIND_ADDR', '주소 찾기', <DaumPostcodeShppingMall />, setCallbackDelivery, '1000px', '600px');
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
      <PageTitle title="물류창고 관리" />

      <ComDeGrid
        onClickSelect={fnSearch}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        searchBarChildren={
          <>
            <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} onKey/>
          </>
        }
        title="Dc List"
        dataList={dataList}
        columns={columns}
        type="single"
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
      />
    </>
  );
}
