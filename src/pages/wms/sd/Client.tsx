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
// [수정] 오타 수정 및 확장자 제거
import { client } from '../../../constraints';
import { 
  gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvGridFieldEmailInput, // 이메일 포맷
  gvGridFieldFormatPhoneNumber, 
  gvGridFieldFormatFaxNumber, 
} from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// NaverMap (DaumPostcode)
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
  // 주소 및 추가 정보
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

// 고객사 관리 화면 컴포넌트
export default function Client() {
  const PRO_URL = '/wms/sd/client';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  // 사용 여부 콤보박스 데이터 상태
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]); 
  
  // 그리드의 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "clientCd", headerName: "고객사코드", editable: false, align: "left", width: 100 },
    { field: "clientNm", headerName: "고객사명", editable: true, align: "left", width: 250 },
    // 사업자 번호 및 정보
    { field: "bizNo", headerName: "사업자번호", editable: true, align: "left", width: 120 },
    { field: "bizNm", headerName: "사업자명", editable: true, align: "left", width: 150 },
    { field: "ceoNm", headerName: "대표자", editable: true, align: "left", width: 100 },
    /* 주소 시작 */
    { field: "deliveryNm", headerName: "배송처명", editable: false, align: "left", width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton size="small"><SearchIcon /></IconButton>
        </Box>
    )},
    { field: "zip", headerName: "우편번호", editable: false, align: "left", width: 100 },
    { field: "jibunAddr", headerName: "지번주소", editable: false, align: "left", width: 300 },
    { field: "roadAddr", headerName: "도로명주소", editable: false, align: "left", width: 300 },
    { field: "detailAddr", headerName: "상세주소", editable: false, align: "left", width: 300 },
    { field: "lat", headerName: "위도", editable: false, align: "left", width: 120 },
    { field: "lon", headerName: "경도", editable: false, align: "left", width: 120 },
    /* 주소 끝 */
    { field: "bizTp", headerName: "업태(사업자유형)", editable: true, align: "left", width: 100 },
    { field: "bizKnd", headerName: "업종(사업자종류)", editable: true, align: "left", width: 100 },
    // 전화번호 포맷 설정
    { field: "telNo", headerName: "전화번호", editable: true, align: "left", width: 150,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldFormatPhoneNumber(params.value),
    },
    // 팩스번호 포맷 설정
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
    { field: "userCol1", headerName: "사용자컬럼1", editable: true, align: "left", width: 100 },
    { field: "userCol2", headerName: "사용자컬럼2", editable: true, align: "left", width: 100 },
    { field: "userCol3", headerName: "사용자컬럼3", editable: true, align: "left", width: 100 },
    { field: "userCol4", headerName: "사용자컬럼4", editable: true, align: "left", width: 100 },
    { field: "userCol5", headerName: "사용자컬럼5", editable: true, align: "left", width: 100 },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  const [selRowId, setSelRowId] = useState<number>(-1); // 선택된 행 ID 상태
  const [dataList, setDataList] = useState<ClientData[]>([]); // 고객사 리스트 데이터
  const [callbackDelivery, setCallbackDelivery] = useState<any>(null); // 주소 콜백 데이터 상태
  const [schValues, setSchValues] = useState({ codeCd: "" }); // 조회 조건 상태

  // 입력 상태 설정 초기값
  const initData: ClientData = {
    id: 0, // 초기값 (추가 시 재설정)
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

  const [values, setValues] = useState<ClientData>(initData); // 선택된 행의 데이터 관리

  // 조회 조건 변경 핸들러
  const onChangeSearch = (value: string, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: value });
    }
  };

  // Enter 키 입력 시 조회 수행
  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fnSearch();
      return;
    }
  };

  // 고객사 리스트 데이터 조회
  const fnSearch = () => {
    client.post(`${PRO_URL}/selectClientList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.error('Error fetching client list:', error));
  };

  // 신규 데이터 추가
  const onClickAdd = () => {
    // 고유 ID 생성
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initData, id: newId };
    setDataList(prev => [...prev, newRow]);
  };

  // 데이터 저장
  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveClient`, rowData)
        .then(() => {
          alert('저장되었습니다.');
          fnSearch();
        })
        .catch((error) => console.error('Error saving client data:', error));
    });
  };

  // 데이터 삭제
  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteClient`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch((error) => console.error('Error deleting client data:', error));
    });
  };

  // 그리드 셀 클릭 핸들링
  const handleGridCellClick = (e: any) => {
    setValues(e.row);
    setSelRowId(e.row.id);
    if (e.field === 'deliveryNm') {
      openPopupFindAddress();
    }
  };

  // 주소찾기 팝업 열기
  const openPopupFindAddress = () => {
    openModal('FIND_ADDR', '주소 찾기', <DaumPostcodeShppingMall />, handleAddressUpdate, '1000px', '600px');
  };

  // 주소 콜백 데이터 업데이트
  const handleAddressUpdate = (addressData: any) => {
    setCallbackDelivery(addressData);
  };

  // 셀 데이터 변경 처리
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      setDataList(prevData => prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    },
    []
  );

  // 데이터 로드 및 콤보박스 초기 설정
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
  }, [selRowId, callbackDelivery, useYnCmb]);

  return (
    <>
      <PageTitle title={'고객사 리스트 '} />

      <SearchBar onClickSelect={fnSearch} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}>
        <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch}  />
      </SearchBar>

      <ComDeGrid
        title="Client List"
        dataList={dataList}
        columns={columns}
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
        type={"single"}
      />
    </>
  );
}