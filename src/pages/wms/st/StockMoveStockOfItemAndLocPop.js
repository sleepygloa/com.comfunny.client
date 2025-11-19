import React, { useCallback, useState, useEffect } from 'react';
import { useModal } from "../../../context/ModalContext.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { client } from '../../../contraints.js';
import { gvGetRowData } from "../../../components/Common.js";
import { Button, DialogActions, DialogContent } from '@mui/material';

export default function StockMoveLocPop(props) {
  const { refVal1 = 'MV' } = props; // 참조 값 (디폴트: 'MV')
  const { modals, closeModal } = useModal();
  const key = 'FIND_STOCK_LOC_ITEM'; // 모달 키
  const PRO_URL = '/wms/st/stockMove'; // API URL

  // 상태 관리
  const [dataList, setDataList] = useState([]); // 로케이션 데이터
  const [selRowId, setSelRowId] = useState(undefined); // 선택된 행 ID

  // 컬럼 정의
  const columns = [
    { field: "id", headerName: "ID", width: 20, align: "center" },
    { field: "zoneCd", headerName: "존코드", width: 100 },
    { field: "zoneNm", headerName: "존명", width: 100 },
    { field: "locCd", headerName: "로케이션코드", width: 100 },
    { field: "itemCd", headerName: "상품코드", width: 100 },
    { field: "itemNm", headerName: "상품명", width: 200 },
    { field: "pkqty", headerName: "입수", width: 80 },
    { field: "stockQty", headerName: "재고수량", width: 100 },
    { field: "stockBoxQty", headerName: "재고(박스)", width: 100 },
    { field: "lotId", headerName: "LOT_ID", width: 150 },
    { field: "dcCd", headerName: "물류창고", width: 100 },
    { field: "clientCd", headerName: "고객사", width: 100 },
  ];

  // 데이터 조회
  const fnSearch = useCallback(() => {
    const data = { refVal1 };
    client.post(`${PRO_URL}/selectAvailStockOfItemAndLocAndQtyList`, data)
      .then((res) => setDataList(res.data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, [refVal1]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fnSearch();
  }, [fnSearch]);

  // 확인 버튼 클릭 핸들러
  const handleSubmit = useCallback(() => {
    if (!selRowId) {
      alert('선택된 데이터가 없습니다.');
      return;
    }
    var selectedData = gvGetRowData(dataList, selRowId);
    if(selectedData.length == undefined) selectedData = [selectedData];
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
          title="Stock List"
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
