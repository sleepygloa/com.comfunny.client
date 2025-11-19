import React, { useCallback, useState, useEffect } from 'react';
import { useModal } from "../../../context/ModalContext.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { client } from '../../../contraints.js';
import { gvGetRowData } from "../../../components/Common.js";
import { Button, DialogActions, DialogContent } from '@mui/material';

export default function StockMoveLocPop(props) {
  const { refVal1 = 'MV' } = props; // 참조 값 (디폴트: 'MV')
  const { modals, closeModal } = useModal();
  const key = 'FIND_TO_LOC'; // 모달 키
  const PRO_URL = '/wms/st/stockMove'; // API URL

  // 상태 관리
  const [dataList, setDataList] = useState([]); // 로케이션 데이터
  const [selRowId, setSelRowId] = useState(undefined); // 선택된 행 ID

  // 컬럼 정의
  const columns = [
    { field: "id", headerName: "ID", width: 20, align: "center" },
    { field: "zoneCd", headerName: "존코드", width: 100 },
    { field: "zoneNm", headerName: "존명", width: 100 },
    { field: "locCd", headerName: "로케이션코드", width: 150 },
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
      alert('선택된 데이터가 없습니다.');
      return;
    }
    const selectedData = gvGetRowData(dataList, selRowId);
    const modalInfo = modals[key];

    if (modalInfo?.callback instanceof Function) {
      const result = modalInfo.callback(selectedData);
      if (result === false) return;
    }
    closeModal(key);
  }, [selRowId, dataList, modals, closeModal]);

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
