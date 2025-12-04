import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';

// context
import { useModal } from "../../../context/ModalContext";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { client } from '../../../constraints'; 
import {
  gvGridDropdownDisLabel,
  gvGridFieldFormatFaxNumber,
  gvGridFieldFormatPhoneNumber,
  gvGetRowData,
} from "../../../components/Common";
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// --- 데이터 타입 정의 ---
interface BizData {
  id: number;
  bizCd: string;
  bizNo: string;
  bizNm: string;
  ceoNm: string;
  postNo: string;
  basicAddr: string;
  detailAddr: string;
  bizTp: string;
  bizKnd: string;
  telNo: string;
  faxNo: string;
  contactNm: string;
  contactTelNo: string;
  contactEmail: string;
  countryCd: string;
  cityCd: string;
  userCol1: string;
  userCol2: string;
  userCol3: string;
  userCol4: string;
  userCol5: string;
  remark: string;
  useYn: string;
  deliveryNm?: string;
  zip?: string;
  jibunAddr?: string;
  roadAddr?: string;
  lat?: string;
  lon?: string;
  etcNo1?: string;
  etcNo2?: string;
  etcTp1?: string;
  etcTp2?: string;
  [key: string]: any;
}

// --- DataGrid 컬럼 정의 ---
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", align: "center", width: 60 },
  { field: "bizCd", headerName: "사업자코드", editable: true, align: "left", width: 180 },
  { field: "bizNo", headerName: "사업자번호", editable: true, align: "left", width: 120 },
  { field: "bizNm", headerName: "사업자명", editable: true, align: "left", width: 250 },
  /* 주소 시작 */
  {
    field: "deliveryNm",
    headerName: "배송처명",
    editable: false,
    align: "left",
    width: 180,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography variant="body2">{params.value}</Typography>
        <IconButton size="small"><SearchIcon fontSize="small" /></IconButton>
      </Box>
    ),
  },
  { field: "zip", headerName: "우편번호", editable: false, align: "left", width: 100 },
  { field: "jibunAddr", headerName: "지번주소", editable: false, align: "left", width: 250 },
  { field: "roadAddr", headerName: "도로명주소", editable: false, align: "left", width: 250 },
  { field: "detailAddr", headerName: "상세주소", editable: false, align: "left", width: 250 },
  /* 주소 끝 */
  {
    field: "telNo",
    headerName: "전화번호",
    editable: true,
    align: "left",
    width: 120,
    valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatPhoneNumber(params.value),
  },
  {
    field: "faxNo",
    headerName: "팩스",
    editable: true,
    align: "left",
    width: 120,
    valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatFaxNumber(params.value),
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
  { field: "remark", headerName: "비고", editable: true, align: "left", width: 200 },
];

export default function Biz() {
  const PRO_URL = '/wms/sd/biz';
  const { openModal } = useModal();

  const [dataList, setDataList] = useState<BizData[]>([]);
  const [selRowId, setSelRowId] = useState<number>(-1);
  const [callbackDelivery, setCallbackDelivery] = useState<any>(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  
  // 초기값 설정
  const initValues: BizData = {
    id: 0, 
    bizCd: '',
    bizNo: "",
    bizNm: "",
    ceoNm: "",
    postNo: "",
    basicAddr: "",
    detailAddr: "",
    bizTp: "",
    bizKnd: "",
    telNo: "",
    faxNo: "",
    contactNm: "",
    contactTelNo: "",
    contactEmail: "",
    countryCd: "",
    cityCd: "",
    userCol1: "",
    userCol2: "",
    userCol3: "",
    userCol4: "",
    userCol5: "",
    remark: "",
    useYn: "Y",
  };

  const [values, setValues] = useState<BizData>(initValues);

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

  const onChangeSearch = (value: string, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: value });
    }
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectList`, data)
      .then((res) => {
        setDataList(res.data);
      })
      .catch((error) => console.log('error = ', error));
  };

  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initValues, id: newId };
    setDataList((prevDataList) => [...prevDataList, newRow]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/save`, rowData)
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
      client.post(`${PRO_URL}/delete`, rowData)
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
    openModal('FIND_ADDR', '주소 찾기', <DaumPostcodeShppingMall />, setCallbackDelivery, '1000px', '600px');
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
      <PageTitle title="사업자 관리" />
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
          title="Biz List"
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