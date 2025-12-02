import React, { useCallback, useState, useEffect } from 'react';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';

// Common
import { useModal } from "../../../context/ModalContext";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { client } from '../../../constraints'; // 오타 수정: contraints -> constraints
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
}

export default function StockMoveStockOfItemAndLocPop(props: StockMoveStockOfItemAndLocPopProps) {
  const { refVal1 = 'MV' } = props; // 참조 값 (디폴트: 'MV')
  const { modals, closeModal } = useModal();
  const key = 'FIND_STOCK_LOC_ITEM'; // 모달 키
  const PRO_URL = '/wms/st/stockMove'; // API URL

  // 상태 관리
  const [dataList, setDataList] = useState<StockData[]>([]); // 재고 데이터
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null); // 선택된 행 ID

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

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fnSearch();
  }, [fnSearch]);

  // 확인 버튼 클릭 핸들러
  const handleSubmit = useCallback(() => {
    if (!selRowId) {
      alert('선택된 데이터가 없습니다.'); // 실제 구현 시에는 모달 알림 권장
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
            const result = modalInfo.callback(selectedData) as boolean | void;
            if (result === false) {
                return;
            }
        }
    }
    closeModal(key);
  }, [selRowId, dataList, modals, closeModal, key]);

  return (
    <>
      <DialogContent>
        {/* 데이터 그리드 */}
        <ComDeGrid
          height={400}
          title="Stock List"
          dataList={dataList}
          columns={columns}
          type="single" // 단일 선택 모드
          onRowClick={(params) => setSelRowId(params.id)} // 행 클릭 시 ID 설정
          onCellDoubleClick={() => {
            handleSubmit(); // 더블 클릭 시 데이터 반환 및 모달 닫기
          }}
        />
      </DialogContent>
      <DialogActions>
        {/* 액션 버튼 */}
        <Button onClick={handleSubmit}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}