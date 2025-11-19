import React, { useState, useEffect, useCallback } from 'react';

// Components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SchTextField, SchDateField, GridDateRenderField, FieldRow } from "../../../components/SearchBar/CmmnTextField.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { Box, IconButton, Typography,  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Common
import { client } from '../../../contraints.js';
import { gvGridFieldNumberPreEdit, 
  gvGridFieldNumberFormatter, 
  gvGridFieldNumberParser, 
  gvGetRowDataListOfChk,
  gvGetRowData,
  gvGetToday 
} from "../../../components/Common.js";

// Modal
import { useModal } from "../../../context/ModalContext.js";

// Popup
import StockMovePop from "./StockMovePop.js";
import StockMoveLocPop from "./StockMoveLocPop.js";

export default function StockMove(props) {
  // Constants and URLs
  const { menuTitle } = '재고이동';
  const PRO_URL = '/wms/st/stockMove';
  const { openModal } = useModal();
  const refVal1 = (props.refVal1 ? props.refVal1 : "MV");

  // States
  const [dataList, setDataList] = useState([]); // Main data list
  const [dataDtlList, setDataDtlList] = useState([]); // Detail data list
  const [selRowId, setSelRowId] = useState(-1); // Selected row ID
  const [selDtlRowId, setSelDtlRowId] = useState(-1); // Selected detail row ID
  const [dtlChkRows, setDtlChkRows] = useState([]); // Checked rows in detail grid
  const [schValues, setSchValues] = useState({
    moveNo: "",
    workYmd: gvGetToday(),
  }); // Search values

  // Handlers for search inputs
  const onChangeSearch = (event, id) => setSchValues({ ...schValues, [id]: event });
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fnSearch();
    }
  };

  // Main columns
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "dcNm", headerName: "물류창고", width: 120 },
    { field: "moveNo", headerName: "재고이동번호", width: 150 },
    { field: "workYmd", headerName: "작업일", width: 150, 
      renderCell: (params) => <GridDateRenderField params={params} />  
    },
    { field: "moveGbnNm", headerName: "이동구분명", width: 100 },
    { field: "workStNm", headerName: "이동상태명", width: 100 },
    { field: "remark", headerName: "비고", width: 500 },
  ];

  // Detail columns
  const columnsDtl = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "moveDetailSeq", headerName: "순번", width: 60 },
    { field: "workStNm", headerName: "작업상태", width: 100 },
    { field: "frLocCd", headerName: "FR로케이션", width: 100 },
    { 
      field: "toLocCd", headerName: "TO로케이션", width: 150, 
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton onClick={() => handleLocSearch(params.row)}>
            <SearchIcon />
          </IconButton>
        </Box>
      ),
    },
    { field: "itemCd", headerName: "상품코드", width: 100 },
    { field: "itemNm", headerName: "상품명", width: 200 },
    { field: "itemStNm", headerName: "상품상태", width: 100 },
    { 
      field: "instQty", headerName: "지시수량", width: 100,
      editable: false,
      // valueFormatter: gvGridFieldNumberFormatter,
      // valueParser: gvGridFieldNumberParser,
    },
    { 
      field: "confQty", headerName: "확정수량", width: 100,
      editable: true,
      preProcessEditCellProps: gvGridFieldNumberPreEdit,
      valueFormatter: gvGridFieldNumberFormatter,
      valueParser: gvGridFieldNumberParser,
    },
    { field: "lotId", headerName: "LOT_ID", width: 150 },
    { field: "remark", headerName: "비고", width: 300 },
  ];

  // Fetch data list
  const fnSearch = useCallback(() => {
    const data = { ...schValues, refVal1: refVal1 };
    client.post(`${PRO_URL}/selectStockMoveList`, data)
      .then((res) => {
        setDataList(res.data);
        if (res.data.length > 0) fnSearchDtl(res.data[0]);
      })
      .catch(console.error);
  }, [schValues]);

  // Fetch detail list
  const fnSearchDtl = useCallback((rowData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectStockMoveDetailList`, rowData)
      .then((res) => setDataDtlList(res.data))
      .catch(console.error);
  }, []);

  // Edit cell handler
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
      const updatedList = dataDtlList.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );
      setDataDtlList(updatedList);
    },
    [dataDtlList]
  );

  // Open location search popup
  const handleLocSearch = (row) => {
    openModal('FIND_TO_LOC', '로케이션 찾기', <StockMoveLocPop refVal1={refVal1} />, (data) => {
      const updatedList = dataDtlList.map((r) =>
        r.id === row.id ? { ...r, toLocCd: data.locCd } : r
      );
      setDataDtlList(updatedList);
    }, '600px', '600px');
  };

  // Stock move confirm
  const onClickStockMoveConfirm = () => {
    openModal('', '', '재고이동확정 하시겠습니까?', () => {
      const rowData = dataList.find((row) => row.id === selRowId);
      client.post(`${PRO_URL}/saveStockMoveConfirm`, rowData)
        .then((res) => {
          if(res.data.stsCd && res.data.stsCd != 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }
          openModal('', 'I', '재고이동확정 되었습니다.');
          fnSearch();
        })
        .catch(console.error);
    });
  };


  //검수 클릭(상세)
  function onClickDtlStockMoveProc(){
    var data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows)
    openModal('', '',  '선택한 상품의 재고이동 처리 하시겠습니까?', 
      () => {
        const formData = {
          data : data
        }
        //로케이션 저장
        client.post(`${PRO_URL}/saveStockMoveDetailWorkProcOfPc`,formData, {})
          .then((res) => {
            if(res.data.stsCd && res.data.stsCd != 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '재고이동 처리 되었습니다.');
            fnSearchDtl(gvGetRowData(dataList, selRowId));
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }
  //추가
  const onClickAdd = () => {
    openModal('STOCK_MOVE_POP', '재고이동 팝업', <StockMovePop />, handleInboundPlanUpdate, '1200px', '750px');
  };

  //삭제
  const onClickDel = () => {
    if (selRowId === -1) {
      openModal('', 'A', '삭제할 항목을 선택하세요.');
      return;
    }
    const updatedList = dataList.filter((row) => row.id !== selRowId);
    setDataList(updatedList);
    setSelRowId(-1);
  };

  //입고예정팝업 팝업 콜백함수
  const handleInboundPlanUpdate = (props) => {
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
            <SchTextField id="moveNo" label="재고이동번호" div="4" onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <SchDateField id="workYmd" label="작업일" div="4" selected={schValues.workYmd} onChange={onChangeSearch} />
          </FieldRow>
        }
        
        height="250px"
        title="Move List"
        dataList={dataList}
        columns={columns}
        onRowClick={(params) => fnSearchDtl(params.row)}
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
