import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRenderEditCellParams } from '@mui/x-data-grid';

// context
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { client } from '../../../constraints';
import { 
  gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvGridFieldEmailInput, 
  gvGridFieldFormatPhoneNumber, 
  gvGridFieldFormatFaxNumber, 
} from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall";

// --- 데이터 타입 정의 ---
interface ClientData {
  id: number;
  clientCd: string;
  clientNm: string;
  bizNo: string;
  bizNm: string;
  ceoNm: string;
  telNo: string;
  faxNo: string;
  contactNm: string;
  contactTelNo: string;
  contactEmail: string;
  useYn: string;
  userCol1: string;
  userCol2: string;
  userCol3: string;
  userCol4: string;
  userCol5: string;
  remark: string;
  deliveryNm?: string;
  zip?: string;
  jibunAddr?: string;
  roadAddr?: string;
  detailAddr?: string;
  lat?: string;
  lon?: string;
  bizTp?: string;
  bizKnd?: string;
  [key: string]: any;
}

export default function Client() {
  const PRO_URL = '/wms/sd/client';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [useYnCmb, setUseYnCmb] = useState<any[]>([]); 
  
  // 그리드의 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 60 },
    { field: "clientCd", headerName: "고객사코드", editable: false, align: "left", width: 100 },
    { field: "clientNm", headerName: "고객사명", editable: true, align: "left", width: 250 },
    { field: "bizNo", headerName: "사업자번호", editable: true, align: "left", width: 120 },
    { field: "bizNm", headerName: "사업자명", editable: true, align: "left", width: 150 },
    { field: "ceoNm", headerName: "대표자", editable: true, align: "left", width: 100 },
    /* 주소 시작 */
    { field: "deliveryNm", headerName: "배송처명", editable: false, align: "left", width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton size="small"><SearchIcon fontSize="small" /></IconButton>
        </Box>
    )},
    { field: "zip", headerName: "우편번호", editable: false, align: "left", width: 100 },
    { field: "jibunAddr", headerName: "지번주소", editable: false, align: "left", width: 300 },
    { field: "roadAddr", headerName: "도로명주소", editable: false, align: "left", width: 300 },
    { field: "detailAddr", headerName: "상세주소", editable: false, align: "left", width: 300 },
    /* 주소 끝 */
    { field: "bizTp", headerName: "업태", editable: true, align: "left", width: 100 },
    { field: "bizKnd", headerName: "업종", editable: true, align: "left", width: 100 },
    { field: "telNo", headerName: "전화번호", editable: true, align: "left", width: 150,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatPhoneNumber(params.value),
    },
    { field: "faxNo", headerName: "팩스", editable: true, align: "left", width: 150,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatFaxNumber(params.value),
    },
    { field: "contactNm", headerName: "담당자명", editable: true, align: "left", width: 100 },
    { field: "contactTelNo", headerName: "담당자전화번호", editable: true, align: "left", width: 150,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatPhoneNumber(params.value),
    },
    { field: "contactEmail", headerName: "담당자이메일", editable: true, align: "left", width: 150,
      renderEditCell: (params: GridRenderEditCellParams) => gvGridFieldEmailInput({ ...params, value: params.value ?? "" })
    },
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel,
      valueOptions: useYnCmb,
    },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  const [selRowId, setSelRowId] = useState<number>(-1);
  const [dataList, setDataList] = useState<ClientData[]>([]);
  const [callbackDelivery, setCallbackDelivery] = useState<any>(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const initData: ClientData = {
    id: 0,
    clientCd: "",
    clientNm: "",
    bizNo: "",
    bizNm: "",
    ceoNm: "",
    telNo: "",
    faxNo: "",
    contactNm: "",
    contactTelNo: "",
    contactEmail: "",
    useYn: "Y",
    userCol1: "",
    userCol2: "",
    userCol3: "",
    userCol4: "",
    userCol5: "",
    remark: "",
  };

  const [values, setValues] = useState<ClientData>(initData);

  const onChangeSearch = (value: string, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: value });
    }
  };

  const fnSearch = () => {
    client.post(`${PRO_URL}/selectClientList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.error('Error fetching client list:', error));
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
      client.post(`${PRO_URL}/saveClient`, rowData)
        .then(() => {
          // alert('저장되었습니다.');
          fnSearch();
        })
        .catch((error) => console.error('Error saving client data:', error));
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteClient`, rowData)
        .then(() => {
          // alert('삭제되었습니다.');
          fnSearch();
        })
        .catch((error) => console.error('Error deleting client data:', error));
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
      setDataList(prevData => prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    },
    []
  );

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
    if (!useYnCmb.length) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
  }, [selRowId, callbackDelivery, useYnCmb, dataList, getCmbOfGlobalData]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title="고객사 관리" />

      <SearchBar 
        onClickSelect={fnSearch} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave} 
        onClickDel={onClickDel}
      >
        <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch}  />
      </SearchBar>

      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          title="Client List"
          dataList={dataList}
          columns={columns}
          onCellClick={handleGridCellClick}
          onCellEditCommit={handleEditCellChangeCommitted}
          type="single"
          height="100%"
        />
      </Box>
    </Box>
  );
}