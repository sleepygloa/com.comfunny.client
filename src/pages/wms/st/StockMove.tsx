import React, { useState, useCallback } from 'react';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SchTextField, SchDateField, GridDateRenderField, FieldRow } from "../../../components/SearchBar/CmmnTextField";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// Common
import { client } from '../../../constraints'; // 오타 수정 contraints -> constraints
import { 
  gvGridFieldNumberPreEdit, 
  gvGridFieldNumberFormatter, 
  gvGridFieldNumberParser, 
  gvGetRowDataListOfChk,
  gvGetToday 
} from "../../../components/Common";

// Modal
import { useModal } from "../../../context/ModalContext";

// Popup (컴포넌트가 있다고 가정)
// import StockMovePop from "./StockMovePop";
// import StockMoveLocPop from "./StockMoveLocPop";

// --- 인터페이스 정의 ---

interface StockMoveData {
  id: number;
  dcNm: string;
  moveNo: string;
  workYmd: string;
  moveGbnNm: string;
  workStNm: string;
  remark: string;
  [key: string]: any;
}

interface StockMoveDetailData {
  id: number;
  moveDetailSeq: number;
  workStNm: string;
  frLocCd: string;
  toLocCd: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  instQty: number;
  confQty: number;
  lotId: string;
  remark: string;
  pkqty?: number; // 체크박스 로직 등에서 사용될 수 있음
  [key: string]: any;
}

interface SearchValues {
  moveNo: string;
  workYmd: string;
  [key: string]: any;
}

interface StockMoveProps {
  refVal1?: string;
  title?: string;
}

export default function StockMove(props: StockMoveProps) {
  // Constants and URLs
  const menuTitle = '재고이동';
  const PRO_URL = '/wms/st/stockMove';
  const { openModal } = useModal();
  const refVal1 = (props.refVal1 ? props.refVal1 : "MV");

  // States
  const [dataList, setDataList] = useState<StockMoveData[]>([]); // Main data list
  const [dataDtlList, setDataDtlList] = useState<StockMoveDetailData[]>([]); // Detail data list
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null); // Selected row ID
  const [selDtlRowId, setSelDtlRowId] = useState<GridRowId | null>(null); // Selected detail row ID
  const [dtlChkRows, setDtlChkRows] = useState<GridRowId[]>([]); // Checked rows in detail grid
  const [schValues, setSchValues] = useState<SearchValues>({
    moveNo: "",
    workYmd: gvGetToday(),
  }); 

  // Handlers for search inputs
  const onChangeSearch = (value: any, id?: string) => {
    if (id) {
        setSchValues({ ...schValues, [id]: value });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fnSearch();
    }
  };

  // Main columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, align: "center" },
    { field: "dcNm", headerName: "물류창고", width: 120, align: "left" },
    { field: "moveNo", headerName: "재고이동번호", width: 150, align: "left" },
    { 
      field: "workYmd", headerName: "작업일", width: 150, align: "left",
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />  
    },
    { field: "moveGbnNm", headerName: "이동구분명", width: 100, align: "left" },
    { field: "workStNm", headerName: "이동상태명", width: 100, align: "left" },
    { field: "remark", headerName: "비고", width: 500, align: "left" },
  ];

  // Detail columns
  const columnsDtl: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, align: "center" },
    { field: "moveDetailSeq", headerName: "순번", width: 60, align: "right" },
    { field: "workStNm", headerName: "작업상태", width: 100, align: "left" },
    { field: "frLocCd", headerName: "FR로케이션", width: 100, align: "left" },
    { 
      field: "toLocCd", headerName: "TO로케이션", width: 150, align: "left",
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton onClick={() => handleLocSearch(params.row)}>
            <SearchIcon />
          </IconButton>
        </Box>
      ),
    },
    { field: "itemCd", headerName: "상품코드", width: 100, align: "left" },
    { field: "itemNm", headerName: "상품명", width: 200, align: "left" },
    { field: "itemStNm", headerName: "상품상태", width: 100, align: "left" },
    { 
      field: "instQty", headerName: "지시수량", width: 100, align: "right",
      editable: false,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
    },
    { 
      field: "confQty", headerName: "확정수량", width: 100, align: "right",
      editable: true,
      // [타입 호환성 해결] any 캐스팅
      preProcessEditCellProps: gvGridFieldNumberPreEdit as any,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
      valueParser: (value: any) => gvGridFieldNumberParser(value),
    },
    { field: "lotId", headerName: "LOT_ID", width: 150, align: "left" },
    { field: "remark", headerName: "비고", width: 300, align: "left" },
  ];

  // Fetch data list
  const fnSearch = useCallback(() => {
    const data = { ...schValues, refVal1: refVal1 };
    client.post(`${PRO_URL}/selectStockMoveList`, data)
      .then((res) => {
        const list: StockMoveData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
            // 첫 행 선택 및 상세 조회
            // setSelRowId(list[0].id);
            fnSearchDtl(list[0]);
        } else {
            setDataDtlList([]);
        }
      })
      .catch(console.error);
  }, [schValues, refVal1]);

  // Fetch detail list
  const fnSearchDtl = useCallback((rowData: StockMoveData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectStockMoveDetailList`, rowData)
      .then((res) => setDataDtlList(res.data))
      .catch(console.error);
  }, []);

  // Edit cell handler
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: { id: GridRowId, field: string, value: any }) => {
      const updatedList = dataDtlList.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );
      setDataDtlList(updatedList);
    },
    [dataDtlList]
  );

  // Open location search popup
  const handleLocSearch = (row: StockMoveDetailData) => {
    // StockMoveLocPop 컴포넌트 필요
    /*
    openModal('FIND_TO_LOC', '로케이션 찾기', <StockMoveLocPop refVal1={refVal1} />, (data) => {
      const updatedList = dataDtlList.map((r) =>
        r.id === row.id ? { ...r, toLocCd: data.locCd } : r
      );
      setDataDtlList(updatedList);
    }, '600px', '600px');
    */
    alert("로케이션 찾기 팝업 준비 중입니다.");
  };

  // Stock move confirm
  const onClickStockMoveConfirm = () => {
    const rowData = dataList.find((row) => row.id === selRowId);
    if (!rowData) return;

    openModal('', '', '재고이동확정 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveStockMoveConfirm`, rowData)
        .then((res) => {
          if(res.data.stsCd && res.data.stsCd !== 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }
          openModal('', 'I', '재고이동확정 되었습니다.');
          fnSearch();
        })
        .catch(console.error);
    });
  };

  // 재고이동 처리 (상세)
  const onClickDtlStockMoveProc = () => {
    const data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows);
    
    if (data.length === 0) {
        openModal('', 'A', '선택된 데이터가 없습니다.');
        return;
    }

    openModal('', '',  '선택한 상품의 재고이동 처리 하시겠습니까?', 
      () => {
        const formData = {
          data : data
        }
        client.post(`${PRO_URL}/saveStockMoveDetailWorkProcOfPc`, formData)
          .then((res) => {
            if(res.data.stsCd && res.data.stsCd !== 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '재고이동 처리 되었습니다.');
            const currentRow = dataList.find(row => row.id === selRowId);
            if(currentRow) fnSearchDtl(currentRow);
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  // 추가
  const onClickAdd = () => {
    // StockMovePop 컴포넌트 필요
    // openModal('STOCK_MOVE_POP', '재고이동 팝업', <StockMovePop />, handleInboundPlanUpdate, '1200px', '750px');
    alert("재고이동 팝업 준비 중입니다.");
  };

  // 삭제 (현재 주석처리됨)
  /*
  const onClickDel = () => {
    if (selRowId === -1) {
      openModal('', 'A', '삭제할 항목을 선택하세요.');
      return;
    }
    // 실제 삭제 로직 (API 호출 등) 필요
    const updatedList = dataList.filter((row) => row.id !== selRowId);
    setDataList(updatedList);
    setSelRowId(null);
  };
  */

  // 팝업 콜백함수
  const handleInboundPlanUpdate = (props: any) => {
    fnSearch();
  };

  return (
    <>
      {props.title ? <PageTitle title={props.title || "재고이동"} /> : <></>}
      <ComDeGrid
        onClickAdd={onClickAdd}
        // onClickDel={onClickDel}
        onClickSelect={fnSearch}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="moveNo" label="재고이동번호" onChange={onChangeSearch} />
            <SchDateField id="workYmd" label="작업일" selected={schValues.workYmd} onChange={onChangeSearch} />
          </FieldRow>
        }
        
        height="250px"
        title="Move List"
        dataList={dataList}
        columns={columns}
        onRowClick={(params) => fnSearchDtl(params.row as StockMoveData)}
        onClickCustom1={onClickStockMoveConfirm}
        onClickCustomNm1="재고이동확정"
        type={"single"}
      />
      <ComDeGrid
        onClickCustom1={onClickDtlStockMoveProc}
        onClickCustomNm1={'재고이동 처리'}

        title="StockMove Detail List"
        dataList={dataDtlList}
        columns={columnsDtl}
        onRowClick={(params) => setSelDtlRowId(params.id)}
        onCellEditCommit={handleEditCellChangeCommitted}
        onChangeChks={(chkRows) => setDtlChkRows(chkRows.map(item => item.id))}
        type="multi"
      />
    </>
  );
}