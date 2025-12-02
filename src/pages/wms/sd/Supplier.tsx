import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
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
  Checkbox,
  Grid
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
        if (url.includes('selectSupplierList')) {
          resolve({ 
            data: [
              { 
                id: 1, 
                bizCd: 'B001',
                clientCd: 'C001', 
                supplierCd: 'SP001', 
                supplierNm: '좋은공급사', 
                deliveryNm: '본사창고',
                zip: '54321', 
                jibunAddr: '경기도 성남시 분당구 판교역로 235', 
                roadAddr: '경기도 성남시 분당구 판교역로 235', 
                detailAddr: 'H스퀘어 N동',
                lat: '37.4', 
                lon: '127.1',
                telNo: '031-123-4567',
                faxNo: '031-123-4568',
                contactNm: '김담당',
                contactTelNo: '010-9876-5432',
                contactEmail: 'supply@example.com',
                dealStartYmd: '2023-01-01',
                dealEndYmd: '2099-12-31',
                dealGbnCd: '10',
                useYn: 'Y',
                remark: '우수 공급사'
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
                zip: "12345",
                jibunAddr: "서울시 강남구 역삼동 123",
                roadAddr: "서울시 강남구 테헤란로 123",
                lat: "37.5",
                lon: "127.0"
            })
        }
      }}>
        강남 오피스 선택
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
    onChange={(e) => onChange(e.target.value, 'codeCd')} 
    onKeyDown={onKeyDown}
    fullWidth
  />
);

// ComDeGrid Replacement
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

// --- 4. MAIN COMPONENT (Refactored Supplier.js) ---

function SupplierContent() {
  const PRO_URL = '/wms/sd/supplier';
  const { openModal, closeModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [dataList, setDataList] = useState<any[]>([]);
  const [selRowId, setSelRowId] = useState(-1);
  const [callbackDelivery, setCallbackDelivery] = useState<any>(null);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  const [clientCdCmb, setClientCdCmb] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [dealGbnCdCmb, setDealGbnCdCmb] = useState<any[]>([]);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 50 },
    { 
        field: "clientCd", 
        headerName: "고객사", 
        align: "center",
        width: 100
    },
    { field: "supplierCd", headerName: "공급처코드", align: "left", width: 100 },
    { field: "supplierNm", headerName: "공급처명", align: "left", width: 150 },
    {
      field: "deliveryNm", headerName: "배송처명", align: "left", width: 150,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography variant="body2" noWrap sx={{flex:1}}>{params.value}</Typography>
          <IconButton size="small"><SearchIcon fontSize="small" /></IconButton>
        </Box>
      )
    },
    { field: "zip", headerName: "우편번호", align: "left", width: 80 },
    { field: "jibunAddr", headerName: "지번주소", align: "left", width: 200 },
    { field: "roadAddr", headerName: "도로명주소", align: "left", width: 200 },
    { field: "detailAddr", headerName: "상세주소", align: "left", width: 150 },
    { field: "telNo", headerName: "전화번호", align: "left", width: 120 },
    { field: "contactNm", headerName: "담당자명", align: "left", width: 100 },
    { 
        field: "dealStartYmd", headerName: "거래시작일자", align: "left", width: 100,
        renderCell: (params: any) => <>{params.value}</>
    },
    { 
        field: "dealEndYmd", headerName: "거래종료일자", align: "left", width: 100,
        renderCell: (params: any) => <>{params.value}</>
    },
    { 
        field: "useYn", headerName: "사용여부", align: "center", width: 80 
    },
    { field: "remark", headerName: "비고", align: "left", width: 150 }
  ];

  const initData = {
    // id: Generated
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
      console.log("Applying address callback", callbackDelivery);
      const rowData = dataList.find(d => d.id === selRowId);
      if(rowData) {
          const updatedRow = { ...rowData, ...callbackDelivery };
          setDataList((prev) => prev.map((row) => (row.id === selRowId ? updatedRow : row)));
      }
      setCallbackDelivery(null);
      closeModal();
    }
  }, [selRowId, callbackDelivery, dataList, closeModal]);

  useEffect(() => {
    // Mock Dropdown Init
    if (!clientCdCmb.length) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''));
    if (!useYnCmb.length) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
    if (!dealGbnCdCmb.length) setDealGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'DEAL_GBN_CD'));
  }, [clientCdCmb, useYnCmb, dealGbnCdCmb, getCmbOfGlobalData]);

  const onChangeSearch = (value: string, id: string) => setSchValues({ ...schValues, [id]: value });

  const fnSearch = () => {
    client.post(`${PRO_URL}/selectSupplierList`, { codeCd: schValues.codeCd })
      .then((res) => setDataList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  const onClickAdd = () => setDataList((prev) => [...prev, { ...initData, id: prev.length > 0 ? Math.max(...prev.map(d=>d.id)) + 1 : 1 }]);

  const onClickSave = () => {
    const rowData = dataList.find(d => d.id === selRowId);
    if (rowData || selRowId !== -1) { // Allow save if row selected (logic tweak for mock)
      openModal('', '알림', '저장 하시겠습니까?', () => {
        client.post(`${PRO_URL}/saveSupplier`, rowData)
          .then(() => {
            // alert('저장되었습니다.');
            fnSearch();
          })
          .catch((error) => console.log('error = ', error));
      });
    }
  };

  const onClickDel = () => {
    const rowData = dataList.find(d => d.id === selRowId);
    if (rowData) {
      openModal('', '알림', '삭제 하시겠습니까?', () => {
        client.post(`${PRO_URL}/deleteSupplier`, rowData)
          .then(() => {
            // alert('삭제되었습니다.');
            fnSearch();
          })
          .catch((error) => console.log('error = ', error));
      });
    }
  };

  const handleGridCellClick = (params: any) => {
    setSelRowId(params.row.id);
    if (params.field === 'deliveryNm') openPopupFindAddress();
  };

  const openPopupFindAddress = () => {
    const HandleCompleteWrapper = ({ close }: { close: () => void }) => (
        <DaumPostcodeShppingMall onComplete={(data) => {
            handleAddressUpdate(data);
        }} />
    );
    openModal('FIND_ADDR', '주소 찾기', <HandleCompleteWrapper close={() => {}} />, null, '600px', '400px');
  };

  const handleAddressUpdate = (addressData: any) => setCallbackDelivery(addressData);

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => setDataList((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))),
    []
  );

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTitle title="공급처 관리" />
      <ComDeGrid
        onClickSelect={fnSearch} onClickAdd={onClickAdd} onClickSave={onClickSave} onClickDel={onClickDel}
        searchBarChildren={
          <>
            <SchTextField 
                id="codeCd" 
                label="코드/명" 
                div="3" 
                onChange={onChangeSearch} 
                onKeyDown={(e: any) => e.key === 'Enter' && fnSearch()} 
            />
          </>
        }
        title="Supplier List"
        dataList={dataList}
        columns={columns}
        height="700px"
        type="single"
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
        <SupplierContent />
        
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