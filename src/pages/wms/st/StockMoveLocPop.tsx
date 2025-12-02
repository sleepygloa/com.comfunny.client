import React, { useCallback, useState, useEffect } from 'react';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';

// Common
import { useModal } from "../../../context/ModalContext";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { client } from '../../../constraints'; // 오타 수정: contraints -> constraints
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
  const { refVal1 = 'MV' } = props; // 참조 값 (디폴트: 'MV')
  const { modals, closeModal } = useModal();
  const key = 'FIND_TO_LOC'; // 모달 키
  const PRO_URL = '/wms/st/stockMove'; // API URL

  // 상태 관리
  const [dataList, setDataList] = useState<LocationData[]>([]); // 로케이션 데이터
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null); // 선택된 행 ID

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

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // 확인 버튼 클릭 핸들러
  const handleSubmit = useCallback(() => {
    if (!selRowId) {
      alert('선택된 데이터가 없습니다.'); // 모달 컨텍스트의 openModal을 사용하여 알림을 띄우는 것이 좋습니다.
      return;
    }
    
    // 선택된 행 데이터 가져오기
    const selectedData = gvGetRowData(dataList, selRowId);
    
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
      <DialogContent>
        {/* 데이터 그리드 */}
        <ComDeGrid
          height={400}
          title="Location List"
          dataList={dataList}
          columns={columns}
          type="single" // 단일 선택 모드
          onRowClick={(params) => setSelRowId(params.id)} // 행 클릭 시 ID 설정
          onCellDoubleClick={(params) => {
            setSelRowId(params.id);
            // 상태 업데이트 비동기 문제 해결을 위해 직접 데이터 조회 후 제출 로직 수행 권장
            // 여기서는 단순화를 위해 다음 렌더링 사이클에 의존하지 않고 바로 처리
            const selectedRow = params.row;
            if (modals && modals[key]) {
                const modalInfo = modals[key];
                if (modalInfo.callback && typeof modalInfo.callback === 'function') {
                    modalInfo.callback(selectedRow);
                }
            }
            closeModal(key);
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