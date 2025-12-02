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
        if (url.includes('selectDcList')) {
          resolve({ 
            data: [
              { code: 'DC1', name: '서울센터' },
              { code: 'DC2', name: '부산센터' }
            ] 
          });
        } else if (url.includes('selectDcAreaList')) {
          // Flattened structure for simplicity in mock, assumes ref1 is parent code
          resolve({ 
            data: [
              { code: 'A1', name: 'A구역', ref1: 'DC1' },
              { code: 'B1', name: 'B구역', ref1: 'DC1' },
              { code: 'C1', name: 'C구역', ref1: 'DC2' }
            ] 
          });
        } else if (url.includes('selectZoneList')) {
          resolve({ 
            data: [
              { 
                id: 1, 
                dcCd: 'DC1', 
                areaCd: 'A1', 
                zoneCd: 'Z001', 
                zoneNm: '냉동존', 
                keepTypeCd: '1', 
                holdStCd: '1', 
                stdWidth: 100, 
                stdLength: 200, 
                stdLocx: 10, 
                stdLocy: 20, 
                stdLocz: 0, 
                useYn: 'Y', 
                remark: '테스트 존' 
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
const gvSetDropdownData = (data: any[]) => {
  return data.map(item => ({ value: item.code, label: item.name }));
};

const gvSetLevelDropdownData = (data: any[]) => {
  const result: any = {};
  data.forEach(item => {
    if (!result[item.ref1]) result[item.ref1] = [];
    result[item.ref1].push({ value: item.code, label: item.name });
  });
  return result;
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
                      {/* Custom Cell Rendering logic mimicking valueGetter/valueFormatter */}
                      {col.renderCell 
                        ? col.renderCell({ value: row[col.field], row }) 
                        : col.valueGetter 
                            ? col.valueGetter({ row }) 
                            : col.valueFormatter 
                                ? col.valueFormatter({ value: row[col.field] }) 
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

// --- 4. MAIN COMPONENT (Refactored Zone.js) ---

function ZoneContent() {
  const PRO_URL = '/wms/sd/zone';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState(-1);
  const [dataList, setDataList] = useState<any[]>([]);
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [keepTypeCdCmb, setKeepTypeCdCmb] = useState<any[]>([]);
  const [holdStCdCmb, setHoldStCdCmb] = useState<any[]>([]);
  const [dcCmb, setDcCmb] = useState<any[]>([]);
  const [dcAreaCmb, setDcAreaCmb] = useState<any>({});

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 50 },
    { 
        field: "dcCd", headerName: "물류창고", align: "center", 
        valueGetter: ({ row }: any) => dcCmb.find(v => v.value === row.dcCd)?.label || row.dcCd 
    },
    { 
        field: "areaCd", headerName: "구역", align: "center", 
        valueGetter: ({ row }: any) => {
            const areaOptions = dcAreaCmb[row.dcCd] || [];
            return areaOptions.find((v: any) => v.value === row.areaCd)?.label || row.areaCd;
        }
    },
    { field: "zoneCd", headerName: "지역코드", align: "left", width: 100 },
    { field: "zoneNm", headerName: "지역명", align: "left", width: 150 },
    { 
        field: "keepTypeCd", headerName: "보관유형", align: "center",
        valueFormatter: ({ value }: any) => keepTypeCdCmb.find(v => v.value === value)?.label || value
    },
    { 
        field: "holdStCd", headerName: "보류상태", align: "center",
        valueFormatter: ({ value }: any) => holdStCdCmb.find(v => v.value === value)?.label || value
    },
    { field: "stdWidth", headerName: "가로", align: "center", width: 80 },
    { field: "stdLength", headerName: "세로", align: "center", width: 80 },
    { field: "stdLocx", headerName: "위치X", align: "center", width: 80 },
    { field: "stdLocy", headerName: "위치Y", align: "center", width: 80 },
    { field: "stdLocz", headerName: "위치Z", align: "center", width: 80 },
    { 
        field: "useYn", headerName: "사용여부", align: "center", width: 80,
        valueFormatter: ({ value }: any) => useYnCmb.find(v => v.value === value)?.label || value
    },
    { field: "remark", headerName: "비고", align: "left", width: 200 },
  ];

  const initData = {
    // id: Generated
    bizCd: '',
    dcCd: "",
    areaCd: "",
    zoneCd: "",
    zoneNm: "",
    keepTypeCd: "1",
    holdStCd: "1",
    remark: "",
    useYn: "Y",
    stdWidth: 0, 
    stdLength: 0, 
    stdLocx: 0, 
    stdLocy: 0, 
    stdLocz: 0
  };

  const [schValues, setSchValues] = useState({ codeCd: "" });

  const onChangeSearch = (e: any) => setSchValues({ ...schValues, [e.target.id || 'codeCd']: e.target.value });

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fnSearch();
    }
  };

  useEffect(() => {
    // Initial Load
    if (selRowId === -1 && dcCmb.length === 0) {
      if (!useYnCmb.length) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      if (!holdStCdCmb.length) setHoldStCdCmb(getCmbOfGlobalData('CMMN_CD', 'HOLD_ST_CD'));
      if (!keepTypeCdCmb.length) setKeepTypeCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TYPE_CD'));
      
      // Load DC and Area
      client.post(`${PRO_URL}/selectDcList`, {}).then((res: any) => {
          setDcCmb(gvSetDropdownData(res.data));
      });
      client.post(`${PRO_URL}/selectDcAreaList`, {}).then((res: any) => {
          setDcAreaCmb(gvSetLevelDropdownData(res.data));
      });
    }
  }, [selRowId, useYnCmb, holdStCdCmb, keepTypeCdCmb, dcCmb, dcAreaCmb, getCmbOfGlobalData]);

  const fnSearch = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectZoneList`, { codeCd: schValues.codeCd });
      setDataList(res.data);
    } catch (error) {
      console.log('error = ', error);
    }
  };

  const onClickSelect = () => fnSearch();

  const onClickAdd = () => setDataList((prevData) => [...prevData, { ...initData, id: prevData.length > 0 ? Math.max(...prevData.map(d => d.id)) + 1 : 1 }]);

  const onClickSave = () => {
    const rowData = dataList.find(d => d.id === selRowId);
    if (!rowData && selRowId !== -1) return; // Allow save if intended

    openModal('', '알림', '저장 하시겠습니까?', async () => {
      try {
        await client.post(`${PRO_URL}/saveZone`, rowData);
        // alert('저장되었습니다.');
        fnSearch();
      } catch (error) {
        console.log('error = ', error);
      }
    });
  };

  const onClickDel = () => {
    const rowData = dataList.find(d => d.id === selRowId);
    if (!rowData) return;

    openModal('', '알림', '삭제 하시겠습니까?', async () => {
      try {
        await client.post(`${PRO_URL}/deleteZone`, rowData);
        // alert('삭제되었습니다.');
        fnSearch();
      } catch (error) {
        console.log('error = ', error);
      }
    });
  };

  const handleGridCellClick = (params: any) => {
    setSelRowId(params.row.id);
  };

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTitle title="존 관리" />
      <ComDeGrid
        onClickSelect={onClickSelect}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        searchBarChildren={
          <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} onKeyDown={onKeyDown} />
        }
        title="Zone List"
        dataList={dataList}
        columns={columns}
        onCellClick={handleGridCellClick}
        height="700px"
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
        if (key === 'HOLD_ST_CD') return [{ value: '1', label: '정상' }, { value: '2', label: '보류' }];
        if (key === 'KEEP_TYPE_CD') return [{ value: '1', label: '상온' }, { value: '2', label: '냉동' }, { value: '3', label: '냉장' }];
        return [];
    }
  };

  return (
    <CommonDataContext.Provider value={commonDataValue}>
      <ModalContext.Provider value={{ openModal, closeModal }}>
        <ZoneContent />
        
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