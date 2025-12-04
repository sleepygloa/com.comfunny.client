import React, { useCallback, useState, useEffect } from 'react';
import { Button, DialogActions, DialogContent, Box } from '@mui/material'; // Box 추가
import { GridColDef, GridRowId } from '@mui/x-data-grid';

// Common
import { useModal } from "../../../context/ModalContext";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { client } from '../../../constraints'; 
import { gvGetRowData } from "../../../components/Common";

// --- 인터페이스 정의 ---

interface StockData {
  id: number;
  zoneCd: string;
  zoneNm: string;
  locCd: string;
  itemCd: string;
  itemNm: string;
  pkqty: number;
  stockQty: number;
  stockBoxQty: number;
  lotId: string;
  dcCd: string;
  clientCd: string;
  [key: string]: any;
}

interface StockMoveStockOfItemAndLocPopProps {
  refVal1?: string;
  formData?: any; // 필요 시 추가
}

export default function StockMoveStockOfItemAndLocPop(props: StockMoveStockOfItemAndLocPopProps) {
  const { refVal1 = 'MV' } = props; 
  const { modals, closeModal } = useModal();
  const key = 'FIND_STOCK_LOC_ITEM'; 
  const PRO_URL = '/wms/st/stockMove'; 

  // 상태 관리
  const [dataList, setDataList] = useState<StockData[]>([]); 
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null); 

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, align: "center" },
    { field: "zoneCd", headerName: "존코드", width: 100, align: "left" },
    { field: "zoneNm", headerName: "존명", width: 100, align: "left" },
    { field: "locCd", headerName: "로케이션코드", width: 100, align: "left" },
    { field: "itemCd", headerName: "상품코드", width: 100, align: "left" },
    { field: "itemNm", headerName: "상품명", width: 200, align: "left" },
    { field: "pkqty", headerName: "입수", width: 80, align: "right" },
    { field: "stockQty", headerName: "재고수량", width: 100, align: "right" },
    { field: "stockBoxQty", headerName: "재고(박스)", width: 100, align: "right" },
    { field: "lotId", headerName: "LOT_ID", width: 150, align: "left" },
    { field: "dcCd", headerName: "물류창고", width: 100, align: "left" },
    { field: "clientCd", headerName: "고객사", width: 100, align: "left" },
  ];

  // 데이터 조회
  const fnSearch = useCallback(() => {
    const data = { refVal1 };
    client.post(`${PRO_URL}/selectAvailStockOfItemAndLocAndQtyList`, data)
      .then((res) => setDataList(res.data))
      .catch((error) => console.error('Error fetching stock data:', error));
  }, [refVal1]);

  useEffect(() => {
    fnSearch();
  }, [fnSearch]);

  // 확인 버튼 클릭 핸들러
  const handleSubmit = useCallback(() => {
    if (!selRowId) {
      alert('선택된 데이터가 없습니다.');
      return;
    }
    
    let selectedData = gvGetRowData(dataList, selRowId);
    
    // 배열 형태가 아니면 배열로 감싸서 반환 (다중 선택 로직 호환성 유지)
    if (!Array.isArray(selectedData)) {
        selectedData = [selectedData];
    }

    if (modals && modals[key]) {
        const modalInfo = modals[key];
        if (modalInfo.callback && typeof modalInfo.callback === 'function') {
            modalInfo.callback(selectedData);
        }
    }
    closeModal(key);
  }, [selRowId, dataList, modals, closeModal, key]);

  return (
    <>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ComDeGrid
            title="Stock List"
            dataList={dataList}
            columns={columns}
            type="single"
            onRowClick={(params) => setSelRowId(params.id)}
            onCellDoubleClick={(params) => {
               // 더블클릭 처리 로직 (handleSubmit과 유사하게 처리 권장)
               // 여기서는 handleSubmit 호출로 간소화 (state 업데이트 타이밍 주의 필요)
               // setSelRowId 후 바로 호출 시 이전 state일 수 있으므로 params.row 사용 권장
                if (modals && modals[key]) {
                    const modalInfo = modals[key];
                    if (modalInfo.callback && typeof modalInfo.callback === 'function') {
                         modalInfo.callback([params.row]);
                    }
                }
                closeModal(key);
            }}
            height="100%"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">확인</Button>
        <Button onClick={() => closeModal(key)} variant="outlined" color="secondary">닫기</Button>
      </DialogActions>
    </>
  );
}