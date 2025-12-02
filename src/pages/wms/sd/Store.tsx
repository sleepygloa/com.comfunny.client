import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox
} from "@mui/material";
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  Save as SaveIcon, 
  Delete as DeleteIcon 
} from "@mui/icons-material";

// --- 1. MOCK DATA & UTILS (외부 의존성 대체) ---

// Mock Client
const client = {
  post: async (url: string, data: any) => {
    console.log(`[API Call] ${url}`, data);
    return new Promise<{ data: any[] }>((resolve) => {
      setTimeout(() => {
        if (url.includes('selectStoreList')) {
          resolve({ 
            data: [
              { 
                id: 1, 
                clientCd: 'C001', 
                storeCd: 'S001', 
                storeNm: '강남점', 
                deliveryNm: '로켓배송',
                zip: '12345', 
                jibunAddr: '서울시 강남구 역삼동 11', 
                roadAddr: '서울시 강남구 테헤란로 1', 
                detailAddr: '101호',
                lat: '37.123', 
                lon: '127.123',
                telNo: '02-123-4567',
                faxNo: '02-123-4568',
                contactNm: '홍길동',
                contactTelNo: '010-1234-5678',
                contactEmail: 'test@example.com',
                deliveryDcCd: 'DC1',
                deliveryDomainCd: 'A1',
                dealStartYmd: '2023-01-01',
                dealEndYmd: '2099-12-31',
                dealGbnCd: '10',
                useYn: 'Y',
                remark: '테스트 데이터'
              }
            ] 
          });
        } else {
          resolve({ data: [] });
        }
      }, 300);
    });
  }
};

// Common Helpers
const gvGridDropdownDisLabel = (params: any) => {
  return params.value; 
};

// Mock Components for Renderers
const GridDateRenderField = ({ params }: { params: any }) => {
  return <>{params.value}</>;
};

// Mock Daum Postcode Component
const DaumPostcodeShppingMall = ({ onComplete }: { onComplete?: (data: any) => void }) => {
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="body1" gutterBottom>주소 찾기 모듈 (Mock)</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        실제 다음 우편번호 서비스 대신<br/>임의의 주소를 선택합니다.
      </Typography>
      <Button variant="contained" onClick={() => {
        if(onComplete) {
            onComplete({
                zip: "54321",
                jibunAddr: "경기도 성남시 분당구 판교역로 235",
                roadAddr: "경기도 성남시 분당구 판교역로 235",
                lat: "37.4",
                lon: "127.1"
            })
        }
      }}>
        판교 오피스 선택
      </Button>
    </Box>
  );
};

// --- 2. CONTEXTS ---

// Modal Context
interface ModalContextType {
  openModal: (key: string, title: string, content: React.ReactNode, callback?: any, width?: string, height?: string) => void;
  closeModal: () => void;
}
const ModalContext = createContext<ModalContextType | null>(null);
const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal error");
  return context;
};

// Common Data Context
const CommonDataContext = createContext<any>(null);
const useCommonData = () => useContext(CommonDataContext);

// --- 3. UI COMPONENTS (Replacing custom components) ---

const PageTitle = ({ title }: { title: string }) => (
  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
);

const SchTextField = ({ label, onChange, onKeyDown }: any) => (
  <TextField 
    label={label} 
    variant="outlined" 
    size="small" 
    onChange={onChange} 
    onKeyDown={onKeyDown}
    fullWidth
  />
);

// ComDeGrid Replacement using Standard Table instead of DataGrid
const ComDeGrid = ({ 
  onClickSelect, onClickAdd, onClickSave, onClickDel, 
  searchBarChildren, title, dataList, columns, onCellClick, height 
}: any) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleRowClick = (row: any, field: string) => {
    setSelectedId(row.id);
    if (onCellClick) {
      onCellClick({ row, field, value: row[field] });
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search Bar Area */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <Box sx={{ flex: 1 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                   {searchBarChildren}
                </Grid>
            </Grid>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<SearchIcon />} onClick={onClickSelect}>조회</Button>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAdd}>추가</Button>
          <Button variant="outlined" color="success" startIcon={<SaveIcon />} onClick={onClickSave}>저장</Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={onClickDel}>삭제</Button>
        </Stack>
      </Box>

      {/* Grid Title */}
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>{title}</Typography>

      {/* Standard Table (Replcaing DataGrid) */}
      <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1, maxHeight: height || 500 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>
                <Checkbox size="small" disabled />
              </TableCell>
              {columns.map((col: any) => (
                <TableCell 
                  key={col.field} 
                  align={col.align || 'left'}
                  sx={{ 
                    bgcolor: '#f5f5f5', 
                    fontWeight: 'bold', 
                    minWidth: col.width || 100 
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 3 }}>
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              dataList.map((row: any) => (
                <TableRow 
                  key={row.id} 
                  hover 
                  selected={selectedId === row.id}
                  onClick={() => handleRowClick(row, 'id')}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedId === row.id} size="small" />
                  </TableCell>
                  {columns.map((col: any) => (
                    <TableCell 
                      key={col.field} 
                      align={col.align || 'left'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(row, col.field);
                      }}
                    >
                      {/* Custom Cell Rendering */}
                      {col.renderCell 
                        ? col.renderCell({ value: row[col.field], row }) 
                        : (row[col.field] || '')
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// --- 4. MAIN COMPONENT (Refactored Store.js) ---

function StoreContent() {
  const PRO_URL = "/wms/sd/store";
  const { openModal, closeModal } = useModal(); 
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState<any[]>([]);
  const [selRowId, setSelRowId] = useState(-1);
  const [callbackDelivery, setCallbackDelivery] = useState<any>(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [dealGbnCdCmb, setDealGbnCdCmb] = useState<any[]>([]);

  // 초기 데이터
  const initValues = {
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
    { field: "id", headerName: "ID", align: "center", width: 50 },
    { 
        field: "clientCd", 
        headerName: "고객사", 
        align: "center",
        width: 120
    },
    { field: "storeCd", headerName: "배송처코드", align: "left", width: 100 },
    { field: "storeNm", headerName: "배송처명", align: "left", width: 150 },
    {
      field: "deliveryNm",
      headerName: "배송처찾기",
      align: "left",
      width: 150,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '100%' }}>
          <Typography variant="body2" noWrap sx={{flex:1}}>{params.value || "검색"}</Typography>
          <IconButton size="small"><SearchIcon fontSize="small" /></IconButton>
        </Box>
      ),
    },
    { field: "zip", headerName: "우편번호", align: "left", width: 80 },
    { field: "jibunAddr", headerName: "지번주소", align: "left", width: 200 },
    { field: "roadAddr", headerName: "도로명주소", align: "left", width: 200 },
    { field: "detailAddr", headerName: "상세주소", align: "left", width: 150 },
    { field: "lat", headerName: "위도", align: "left", width: 80 },
    { field: "lon", headerName: "경도", align: "left", width: 80 },
    { field: "telNo", headerName: "전화번호", align: "left", width: 120 },
    { field: "contactNm", headerName: "담당자명", align: "left", width: 100 },
    { 
        field: "useYn", 
        headerName: "사용여부", 
        align: "center", 
        width: 80
    },
    { field: "remark", headerName: "비고", align: "left", width: 150 },
  ];

  useEffect(() => {
    if (callbackDelivery && selRowId !== -1) {
      console.log("Applying address callback", callbackDelivery);
      setDataList((prevDataList) =>
        prevDataList.map((row) => (row.id === selRowId ? { ...row, ...callbackDelivery } : row))
      );
      setCallbackDelivery(null);
      closeModal();
    } else {
      setUseYnCmb(getCmbOfGlobalData("CMMN_CD", "USE_YN"));
      setDealGbnCdCmb(getCmbOfGlobalData("CMMN_CD", "DEAL_GBN_CD"));
      if (clientCdCmb.length === 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ""));
    }
  }, [selRowId, callbackDelivery, clientCdCmb, getCmbOfGlobalData, closeModal]);

  const fnSearch = () => {
    client.post(`${PRO_URL}/selectStoreList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.log("error =", error));
  };

  const onClickAdd = () => {
    setDataList((prevDataList) => [...prevDataList, { ...initValues, id: prevDataList.length > 0 ? Math.max(...prevDataList.map(d=>d.id)) + 1 : 1 }]);
  };

  const onClickSave = () => {
    const rowData = dataList.find(d => d.id === selRowId);
    openModal("", "알림", "저장 하시겠습니까?", () => {
      client.post(`${PRO_URL}/saveStore`, rowData)
        .then(() => {
          fnSearch();
        })
        .catch((error) => console.log("error =", error));
    });
  };

  const onClickDel = () => {
    const rowData = dataList.find(d => d.id === selRowId);
    openModal("", "알림", "삭제 하시겠습니까?", () => {
      client.post(`${PRO_URL}/deleteStore`, rowData)
        .then(() => {
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
    const HandleCompleteWrapper = ({ close }: { close: () => void }) => (
        <DaumPostcodeShppingMall onComplete={(data) => {
            setCallbackDelivery(data);
        }} />
    );
    
    openModal("FIND_ADDR", "주소 찾기", <HandleCompleteWrapper close={() => {}} />, null, "600px", "400px");
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
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTitle title="배송처 관리" />
      <ComDeGrid
        onClickSelect={fnSearch}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        searchBarChildren={
          <SchTextField 
            id="codeCd" 
            label="코드/명" 
            div="3" 
            onChange={(e: any) => setSchValues({ ...schValues, codeCd: e.target.value })} 
            onKeyDown={(e: any) => e.key === "Enter" && fnSearch()} 
          />
        }
        title="Store List"
        dataList={dataList}
        columns={columns}
        height="700px"
        onCellClick={handleGridCellClick}
      />
    </Box>
  );
}

// --- 5. APP WRAPPER (Context Providers) ---

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{ title: string, content: React.ReactNode, callback?: () => void, width?: string }>({
    title: '', content: null, width: 'sm'
  });

  const openModal = (key: string, title: string, content: React.ReactNode, callback?: any, width: string = 'sm', height?: string) => {
    setModalConfig({ title, content, callback, width });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleModalConfirm = () => {
    if (modalConfig.callback) {
        modalConfig.callback();
    }
    closeModal();
  };

  const isConfirmation = typeof modalConfig.content === 'string';

  const commonDataValue = {
    getCmbOfGlobalData: (type: string, key: string) => {
        if (key === 'USE_YN') return [{ value: 'Y', label: '사용' }, { value: 'N', label: '미사용' }];
        if (key === 'DEAL_GBN_CD') return [{ value: '10', label: '매입' }, { value: '20', label: '매출' }];
        if (type === 'CLIENT_CD') return [{ value: 'C001', label: '고객사A' }, { value: 'C002', label: '고객사B' }];
        return [];
    }
  };

  return (
    <CommonDataContext.Provider value={commonDataValue}>
      <ModalContext.Provider value={{ openModal, closeModal }}>
        <StoreContent />
        
        <Dialog 
            open={modalOpen} 
            onClose={closeModal}
            maxWidth={modalConfig.width === '1000px' ? 'lg' : 'sm'}
            fullWidth
        >
          <DialogTitle>{modalConfig.title}</DialogTitle>
          <DialogContent>
             {isConfirmation ? (
                 <DialogContentText>{modalConfig.content}</DialogContentText>
             ) : (
                 modalConfig.content
             )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="secondary">취소</Button>
            {isConfirmation && (
                <Button onClick={handleModalConfirm} variant="contained" color="primary">확인</Button>
            )}
          </DialogActions>
        </Dialog>

      </ModalContext.Provider>
    </CommonDataContext.Provider>
  );
}