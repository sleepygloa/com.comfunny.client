import React, { useState, useEffect } from 'react';

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField, SchDateField} from "../../../components/SearchBar/Components/TextFieldDefault.js"

import { DataGrid } from "@mui/x-data-grid";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { Box, Tabs, Tab, Badge, Grid } from '@mui/material';

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

export default function StockMove() {
  //초기변수 세팅
  const {menuTitle} = '재고이동';
  const PRO_URL = '/wms/st/stockMove';
  const {openModal} = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();

  //프로그램내 처리변수 세팅
  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState();
  const [selDtlRowId, setSelDtlRowId] = useState();
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
    { field: "clientNm",          headerName: "고객사",       editable: false, align:"left", width:120},
    { field: "moveNo",            headerName: "재고이동번호",   editable: false, align:"left", width:150},
    // { field: "ibGbnCd",           headerName: "입고구분코드",     editable: false, align:"left", width:120},
    { field: "workYmd",           headerName: "작업일",       editable: false, align:"left", width:120},
    // { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "moveGbnNm",         headerName: "이동구분명",     editable: false, align:"left", width:100},
    { field: "workStNm",          headerName: "이동상태명",     editable: false, align:"left", width:100},
    
    { field: "refVal1",           headerName: "참조값1",     editable: false, align:"left", width:100},
    { field: "refVal2",           headerName: "참조값2",     editable: false, align:"left", width:100},
    { field: "refVal3",           headerName: "참조값3",     editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",       editable: false, align:"left", width:500},
  ];
  //재고이동상세
  const columnsDtl = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "ibDetailSeq",       headerName: "순번",       editable: false, align:"right", width:60},
    // { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "ibProgStNm",        headerName: "진행상태",   editable: false, align:"left", width:100},
    { field: "itemCd",            headerName: "상품코드",   editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",     editable: false, align:"left", width:300},
    // { field: "itemStCd",          headerName: "상품상태코드",   editable: false, align:"left", width:100},
    { field: "itemStNm",          headerName: "상품상태",   editable: false, align:"left", width:100},
    // { field: "poUomCd",           headerName: "발주단위코드",   editable: false, align:"left", width:100},
    // { field: "poQty",             headerName: "발주수량",   editable: false, align:"left", width:100},
    { field: "planQty",           headerName: "예정",     editable: false, align:"right", width:60},
    // { field: "confQty",           headerName: "확정",   editable: false, align:"right", width:60},
    // { field: "apprQty",           headerName: "승인",   editable: false, align:"right", width:60},

    { field: "pkqty",             headerName: "입수",      editable: false,  align:"center", width:100,},
    { field: "planTotQty",           headerName: "예정(총)",   editable: false, align:"right", width:100},
    { field: "planBoxQty",           headerName: "예정(박스)",   editable: false, align:"right", width:100},
    { field: "planEaQty",           headerName: "예정(낱개)",   editable: false, align:"right", width:100},
    { field: "examTotQty",           headerName: "검수(총)",   editable: false, align:"right", width:100},
    { field: "examBoxQty",           headerName: "검수(박스)",   editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "examEaQty",           headerName: "검수(낱개)",   editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)
    },
    // { field: "instQty",           headerName: "지시",   editable: false, align:"right", width:60},
    // { field: "putwQty",           headerName: "적치",   editable: false, align:"right", width:60},

    // { field: "noIbRsnCd",         headerName: "미입고사유코드",   editable: false, align:"left", width:100},
    { field: "ibCost",            headerName: "입고단가",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "ibVat",             headerName: "입고VAT",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "ibAmt",             headerName: "입고금액",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "makeLot",           headerName: "제조LOT",   editable: false, align:"left", width:100},
    { field: "makeYmd",           headerName: "제조일자",   editable: false, align:"left", width:100},
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: false, align:"left", width:100},
    { field: "lotId",             headerName: "LOT_ID",   editable: false, align:"left", width:100},
    // { field: "lotAttr1",          headerName: "LOT속성1",   editable: false, align:"left", width:100},
    // { field: "lotAttr2",          headerName: "LOT속성2",   editable: false, align:"left", width:100},
    // { field: "lotAttr3",          headerName: "LOT속성3",   editable: false, align:"left", width:100},
    // { field: "lotAttr4",          headerName: "LOT속성4",   editable: false, align:"left", width:100},
    // { field: "lotAttr5",          headerName: "LOT속성5",   editable: false, align:"left", width:100},

    // { field: "tcObDetailSeq",     headerName: "이고출고상세순번",     editable: false, align:"left", width:100},
    // { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    // { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    // { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    // { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    // { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    // { field: "useYn",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "useYnNm",             headerName: "사용여부",         editable: false, align:"left", width:100},
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
  }, []);


  //조회
  const fnSearch = () => {
    var data = {
      moveNo : schValues.moveNo,
      moveYmd : schValues.moveYmd,
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
        client.post(`${PRO_URL}/saveInboundExam`,rowData, {})
          .then(res => {
            openModal('', 'I', '검수완료 되었습니다.');
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
        client.post(`${PRO_URL}/saveStockMoveDtlList`,formData, {})
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

  return (
    <>
      <PageTitle title={"재고이동"}  />
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
        onRowClick={(params)=>{setSelDtlRowId(params.id)}}
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
