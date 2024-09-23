import React, { useState, useEffect } from 'react';

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField, GridDateRenderField, SchDateField} from "../../../components/SearchBar/Components/TextFieldDefault.js"

import { DataGrid } from "@mui/x-data-grid";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { Box, Tabs, Tab, Badge, Grid, Typography } from '@mui/material';

//Common
import {client} from '../../../contraints.js';
import { gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvGridLevelDropdownDisLabel, 
  gvSetLevelDropdownData ,
  gvGridLevel2DropdownDisLabel, 
  gvSetLevel2DropdownData ,
  gvGetToday,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser , 
  gvGetRowDataListOfChk,
  gvDataGridAddRowAndStatus
} from "../../../components/Common.js";

//CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

// DataGrid Css
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import StockMoveLocPop from "./StockMoveLocPop.js";

export default function StockMove(props) {
  //초기변수 세팅
  const {menuTitle} = '재고이동';
  const PRO_URL = '/wms/st/stockMove';
  const {openModal} = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();
  const refVal1 = (props.refVal1 ? props.refVal1 : "MV");

  //프로그램내 처리변수 세팅
  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState();
  // const [selDtlRowId, setSelDtlRowId] = useState();
  var selDtlRowId = -1;
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  const [dataDtlList, setDataDtlList] = useState([]); //
  //상세 체크한 데이터
  var dtlChkRows = [];

  //재고이동 컬럼
  const columns = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    // { field: "dcCd",              headerName: "물류창고",      editable: false, align:"left", width:120},
    { field: "dcNm",              headerName: "물류창고",      editable: false, align:"left", width:120},
    // { field: "clientCd",          headerName: "고객사코드",       editable: false, align:"left", width:120},
    // { field: "clientNm",          headerName: "고객사",       editable: false, align:"left", width:120},
    { field: "moveNo",            headerName: "재고이동번호",   editable: false, align:"left", width:150},
    // { field: "ibGbnCd",           headerName: "입고구분코드",     editable: false, align:"left", width:120},
    { field: "workYmd",           headerName: "작업일",       editable: false, align:"left", width:150,
      // valueSetter: (params) => {return GridDateSetField(params, 'dealEndYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    // { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "moveGbnNm",         headerName: "이동구분명",     editable: false, align:"left", width:100},
    { field: "workStNm",          headerName: "이동상태명",     editable: false, align:"left", width:100},
    
    // { field: "refVal1",           headerName: "참조값1",     editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",       editable: false, align:"left", width:500},
  ];
  //재고이동상세
  const columnsDtl = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "moveDetailSeq",       headerName: "순번",       editable: false, align:"right", width:60},
    // { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "workStNm",            headerName: "작업상태",       editable: false, align:"left", width:100},
    { field: "frLocCd",            headerName: "FR로케이션",    editable: false, align:"left", width:100},
    { field: "toLocCd",            headerName: "TO로케이션",     editable: false, align:"left", width:150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems:'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton><SearchIcon /></IconButton>
        </Box>
    ),},
    { field: "itemCd",            headerName: "상품코드",       editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",         editable: false, align:"left", width:200},
    { field: "itemStNm",          headerName: "상품상태",       editable: false, align:"left", width:100},
    { field: "instQty",           headerName: "지시수량",       editable: false, align:"right", width:80,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "confQty",           headerName: "확정수량",       editable: true, align:"right", width:80,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)
    },

    { field: "lotId",             headerName: "LOT_ID",       editable: false, align:"left", width:150},
    { field: "moveRsNm",          headerName: "이동사유구분",           editable: false, align:"right", width:100},

    { field: "workDt",            headerName: "작업일시",      editable: false,  align:"center", width:100,},
    { field: "workUserId",        headerName: "작업자",       editable: false, align:"center", width:100},
    // { field: "refVal1",           headerName: "참조값1",      editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

  //조회조건
  const [schValues, setSchValues] = useState({ 
    moveNo: "", 
    workYmd : gvGetToday()
  });
  //조회조건 이벤트
  const onChangeSearch = (event, id) => {
    setSchValues({ ...schValues, [id]: event });
  };
  //조회조건 엔터이벤트
  const onKeyDown = (e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        fnSearch();
        return;
    }
  }
  //그리드 초기데이터 세팅
  const initData = {
    id:dataList.length+1,
    useYn: "Y",
  }
  //상세그리드 초기데이터 세팅
  const initDataDtl = {
    id:dataDtlList.length+1,
    useYn: "Y",
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);
  const [valuesDtl, setValuesDtl] = useState(initDataDtl);

  //프로그램 로딩시 실행 및 상태관리
  useEffect(() => {
  }, [selRowId, dataList, dataDtlList]);


  //조회
  const fnSearch = () => {
    var data = {
      moveNo : schValues.moveNo,
      workYmd : schValues.workYmd,
      refVal1 : refVal1,
    };
    client.post(`${PRO_URL}/selectStockMoveList`, data, {})
      .then(res => {
        var list = res.data;
        setDataList(list);

        if(list.length > -1){
          setSelRowId(1);
          fnSearchDtl(list[0]);
        }

      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //상세조회
  const fnSearchDtl = (rowData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectStockMoveDetailList`, rowData, {})
      .then(res => {
        var list = res.data;
        setDataDtlList(list);

        if(list.length > -1){
          // setSelDtlRowId(1);
        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }


  //조회 클릭
  function onClickSelect(){
    fnSearch();
  }

  //신규클릭
  //입고예정팝업
  function onClickAdd(){
  }

  //재고이동확정 클릭
  function onClickStocKMoveConfirm(){
    openModal('', '',  '재고이동확정 하시겠습니까?', 
      () => {
        var rowData = gvGetRowData(dataList, selRowId);
        //로케이션 저장
        client.post(`${PRO_URL}/saveStockMoveConfirm`,rowData, {})
          .then(res => {
            openModal('', 'I', '재고이동확정 되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //검수 클릭(상세)
  function onClickDtlStockMoveProc(){
    openModal('', '',  '선택한 상품의 재고이동 처리 하시겠습니까?', 
      () => {
        const formData = {}
        formData.data = dtlChkRows;
        //로케이션 저장
        client.post(`${PRO_URL}/saveStockMoveDetailWorkProcOfPc`,formData, {})
          .then(res => {
            openModal('', 'I', '재고이동 처리 되었습니다.');
            fnSearchDtl(gvGetRowData(dataList, selRowId));
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }


  //쎌변경시 데이터 변경
  const handleEditCellChangeCommitted = React.useCallback(
    //가로, 세로, 높이 수정시 체적 계산
    ({ id, field, value }) => {
      dataDtlList[id-1][field] = value
    },
    [dataDtlList],
  );

  //쎌클릭 핸들링
  const handleGridCellClick = React.useCallback((e) => {
    selDtlRowId = e.id;
    //로케이션 찾기 팝업
    //TO_LOC_CD 클릭 및 작업상태가 10일때
    if (e.field === 'toLocCd' && e.row.workStCd == '10') {
      openPopupFindToLocCd();
    }
  }  ,[dataDtlList])

  //로케이션찾기 팝업
  const openPopupFindToLocCd = () => {
    openModal('FIND_TO_LOC', '로케이션 찾기', <StockMoveLocPop refVal1={refVal1} />, handleAddressUpdate, '800px', '600px');
  }

  //로케이션찾기 팝업 콜백함수
  const handleAddressUpdate = (data) => {
    //현재 선택된 row 에 리턴된 locCd 를 toLocCd에 세팅
    const rowData = gvGetRowData(dataDtlList, selDtlRowId);
    rowData["toLocCd"] = data.locCd;
  };

  return (
    <>
      <PageTitle title={props.title || props.title == "" ? props.title : "재고이동"}  />
      <ComDeGrid
        height={"250px"}
        onClickSelect={onClickSelect} 
        onClickCustom1={onClickStocKMoveConfirm}
        onClickCustomNm1={'재고이동확정'}
        searchBarChildren={
          <>
            <SchTextField id="moveNo" label='재고이동번호'
              div={"4"}
              onChange={onChangeSearch} 
              onKeyDown={onKeyDown} />  
            <SchDateField id="workYmd" label='작업일'
              div={"4"}
              selected={schValues.workYmd}
              onChange={onChangeSearch} 
              />    
          </>
        }

        title={"Move List"} //제목
        dataList={dataList} //dataList
        columns={columns} //컬럼 정의
        onRowClick={(params)=>{setSelRowId(params.id); fnSearchDtl(params.row)}}
        
        //Multi
        type={"single"}
      />

      <ComDeGrid
        onClickCustom1={onClickDtlStockMoveProc}
        onClickCustomNm1={'재고이동 처리'}

        title={"StockMove Detail List"} //제목
        dataList={dataDtlList} //dataList
        columns={columnsDtl} //컬럼 정의
        //Event
        onCellClick={handleGridCellClick}
        onRowClick={(params)=>{selDtlRowId = params.id;}}
        onCellEditCommit={handleEditCellChangeCommitted} //쎌변경시 데이터변경
        
        //Multi
        type={"multi"}
        onChangeChks={(chkRows)=>{
          if(chkRows.length == 0) return;
          dtlChkRows = chkRows;
        }}
      />
    </>
  );
}
