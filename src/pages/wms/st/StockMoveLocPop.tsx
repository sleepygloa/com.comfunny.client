import React, { useCallback, useState, useEffect } from 'react';
import { Button, DialogActions, DialogContent, Box } from '@mui/material'; // Box 추가
import { GridColDef, GridRowId } from '@mui/x-data-grid';

// Common
import { useModal } from "../../../context/ModalContext";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { client } from '../../../constraints'; 
import { gvGetRowData } from "../../../components/Common";

// --- 인터페이스 정의 ---

interface LocationData {
  id: number;
  zoneCd: string;
  zoneNm: string;
  locCd: string;
  [key: string]: any;
}

interface StockMoveLocPopProps {
  refVal1?: string;
}

export default function StockMoveLocPop(props: StockMoveLocPopProps) {
  const { refVal1 = 'MV' } = props; 
  const { modals, closeModal } = useModal();
  const key = 'FIND_TO_LOC'; 
  const PRO_URL = '/wms/st/stockMove'; 

  // 상태 관리
  const [dataList, setDataList] = useState<LocationData[]>([]); 
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null); 

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, align: "center" },
    { field: "zoneCd", headerName: "존코드", width: 100, align: "left" },
    { field: "zoneNm", headerName: "존명", width: 100, align: "left" },
    { field: "locCd", headerName: "로케이션코드", width: 150, align: "left" },
  ];

  // 데이터 조회
  const fetchLocations = useCallback(() => {
    const data = { refVal1 };
    client.post(`${PRO_URL}/selectStockMoveLocPop`, data)
      .then((res) => setDataList(res.data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, [refVal1]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // 확인 버튼 클릭 핸들러
  const handleSubmit = useCallback(() => {
    if (!selRowId) {
      // alert 대신 모달이나 스낵바 권장되지만, 간단히 유지
      alert('선택된 데이터가 없습니다.');
      return;
    }
    
    const selectedData = gvGetRowData(dataList, selRowId);
    
    if (modals && modals[key]) {
        const modalInfo = modals[key];
        if (modalInfo.callback && typeof modalInfo.callback === 'function') {
            const result = modalInfo.callback(selectedData);
            if (result === false) return;
        }
    }
    closeModal(key);
  }, [selRowId, dataList, modals, closeModal, key]);

  return (
    <>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ComDeGrid
            title="Location List"
            dataList={dataList}
            columns={columns}
            type="single"
            onRowClick={(params) => setSelRowId(params.id)}
            onCellDoubleClick={(params) => {
              // 더블 클릭 시 즉시 처리 (상태 업데이트 비동기 이슈 방지 위해 row 데이터 직접 사용)
              if (modals && modals[key]) {
                  const modalInfo = modals[key];
                  if (modalInfo.callback && typeof modalInfo.callback === 'function') {
                      modalInfo.callback(params.row);
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