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

export default function OutboundAllot() {
  const {menuTitle} = '출고지시';
  const PRO_URL = '/wms/ob/outboundAllot';
  const {openModal} = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();

  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState();
  const [selDtlRowId, setSelDtlRowId] = useState();
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  const [dataDtlList, setDataDtlList] = useState([]); //

  //상세 체크한 데이터
  var dtlChkRows = [];

  //출고전표컬럼
  const columns = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "dcNm",              headerName: "물류창고",      editable: false, align:"left", width:120},
    { field: "obNo",              headerName: "출고번호",         editable: false, align:"left", width:150},
    { field: "clientNm",          headerName: "고객사",       editable: false, align:"left", width:120},
    { field: "obGbnNm",           headerName: "출고구분",     editable: false, align:"left", width:120},
    { field: "obProgStNm",        headerName: "출고진행상태",   editable: false, align:"left", width:100},
    { field: "obPlanYmd",         headerName: "출고예정일자",     editable: false, align:"left", width:100},
    { field: "obYmd",             headerName: "출고일자",       editable: false, align:"left", width:100},
    { field: "storeNm",           headerName: "배송처",         editable: false, align:"left", width:100},
    { field: "carNo",             headerName: "차량번호",       editable: false, align:"left", width:100},
    { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    { field: "useYnNm",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];
  //출고전표컬럼
  const columnsDtl = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "obDetailSeq",       headerName: "순번",       editable: false, align:"right", width:60},
    { field: "obProgStNm",        headerName: "진행상태",   editable: false, align:"left", width:100},
    { field: "itemCd",            headerName: "상품코드",   editable: false, align:"left", width:100},
    { field: "itemNm",             headerName: "상품명",   editable: false, align:"left", width:300},
    { field: "itemStNm",          headerName: "상품상태",   editable: false, align:"left", width:100},
    { field: "planQty",           headerName: "예정",   editable: false, align:"right", width:60},
    { field: "pkqty",             headerName: "입수",      editable: false,  align:"center", width:100,},
    { field: "planTotQty",           headerName: "예정(총)",   editable: false, align:"right", width:100},
    { field: "planBoxQty",           headerName: "예정(박스)",   editable: false, align:"right", width:100},
    { field: "planEaQty",           headerName: "예정(낱개)",   editable: false, align:"right", width:100},
    { field: "allotTotQty",           headerName: "할당(총)",   editable: false, align:"right", width:100},
    { field: "allotBoxQty",           headerName: "할당(박스)",   editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "allotEaQty",           headerName: "할당(낱개)",   editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "obCost",            headerName: "출고단가",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "obVat",             headerName: "출고VAT",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "obAmt",             headerName: "출고금액",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "makeLot",           headerName: "제조LOT",   editable: false, align:"left", width:100},
    { field: "makeYmd",           headerName: "제조일자",   editable: false, align:"left", width:100},
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: false, align:"left", width:100},
    { field: "lotId",             headerName: "LOT_ID",   editable: false, align:"left", width:100},
    { field: "useYnNm",           headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

  //조회조건
  const [schValues, setSchValues] = useState({ 
    obNo: "", 
    obPlanYmd : gvGetToday()
  });
  //조회조건
  const onChangeSearch = (event, id) => {
    setSchValues({ ...schValues, [id]: event });
  };
  const onKeyDown = (e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        fnSearch();
        return;
    }
  }
  const initData = {
    id:dataList.length+1,
    useYn: "Y",
  }

  const initDataDtl = {
    id:dataDtlList.length+1,
    useYn: "Y",
  }
  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);
  const [valuesDtl, setValuesDtl] = useState(initDataDtl);

  useEffect(() => {
  }, []);


  //조회
  const fnSearch = () => {
    var data = {
      obNo : schValues.obNo,
      obPlanYmd : schValues.obPlanYmd,
    };
    client.post(`${PRO_URL}/selectOutboundAllotList`, data, {})
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
    client.post(`${PRO_URL}/selectOutboundAllotDetailList`, rowData, {})
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

  //검수완료 클릭
  function onClickExamCompl(){
    openModal('', '',  '검수완료 하시겠습니까?', 
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
  //검수취소 클릭
  function onClickExamComplCncl(){
    openModal('', '',  '검수완료취소 하시겠습니까?', 
      () => {
        var rowData = gvGetRowData(dataList, selRowId);
        //로케이션 저장
        client.post(`${PRO_URL}/saveInboundExamCncl`,rowData, {})
          .then(res => {
            openModal('', 'I', '검수완료취소 되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //할당 클릭(상세)
  function onClickDtlAllotCompl(){
    openModal('', '',  '할당 하시겠습니까?', 
      () => {
        const formData = {}
        formData.data = dtlChkRows;
        //로케이션 저장
        client.post(`${PRO_URL}/saveOutboundAllotDetailCompl`,formData, {})
          .then(res => {
            openModal('', 'I', '할당 되었습니다.');
            fnSearchDtl(gvGetRowData(dataList, selRowId));
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //할당완료 클릭(상세)
  function onClickAllotCompl(){
    openModal('', '',  '할당완료 하시겠습니까?', 
      () => {
        const formData = {}
        formData.data = dtlChkRows;

        //로케이션 저장
        client.post(`${PRO_URL}/saveAllotCompt`,formData, {})
          .then(res => {
            openModal('', 'I', '할당완료 되었습니다.');
            fnSearchDtl(gvGetRowData(dataList, selRowId));
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //할당완료취소 클릭(상세)
  function onClickAllotComplCncl(){
    openModal('', '',  '할당완료취소 하시겠습니까?', 
      () => {
        const formData = {}
        formData.data = dtlChkRows;

        //로케이션 저장
        client.post(`${PRO_URL}/saveAllotComptCncl`,formData, {})
          .then(res => {
            openModal('', 'I', '할당완료취소 되었습니다.');
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
      if (['allotBoxQty', 'allotEaQty'].includes(field)) {
        const updatedRows = dataDtlList.map((row) => {
          if (row.id === id) {
            const newFieldValues = {
              ...row,
              [field]: Number(value),
            };
            // Calculate new volume
            newFieldValues.allotTotQty = newFieldValues.allotBoxQty * newFieldValues.pkqty + newFieldValues.allotEaQty;
            return newFieldValues;
          }
          return row;
        });
        setDataDtlList(updatedRows);
      }

      dataDtlList[id-1][field] = value
    },
    [dataDtlList],
  );

  return (
    <>

      <ComDeGrid
        onClickSelect={onClickSelect} 
        onClickCustom1={onClickAllotCompl}
        onClickCustomNm1={'할당완료'}
        onClickCustom2={onClickAllotComplCncl}
        onClickCustomNm2={'할당완료취소'}
        searchBarChildren={
          <>
            <SchTextField id="obNo" label='출고번호/명'
              div={"4"}
              onChange={onChangeSearch} 
              onKeyDown={onKeyDown} />  
            <SchDateField id="obPlanYmd" label='출고예정일'
              div={"4"}
              selected={schValues.obPlanYmd}
              onChange={onChangeSearch} 
              />    
          </>
        }

        height={'250px'}
        title={"Outbound List"} //제목
        dataList={dataList} //dataList
        columns={columns} //컬럼 정의
        //Event
        // selRowId={selRowId} //쎌선택 변수지정
        // setSelRowId={setSelRowId}
        onRowClick={(params)=>{setSelRowId(params.id); fnSearchDtl(params.row)}}
        
        //Multi
        type={"single"}
      />

      <ComDeGrid
        onClickCustom1={onClickDtlAllotCompl}
        onClickCustomNm1={'할당'}

        title={"Outbound Detail List"} //제목
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
          // console.log(chkRows)
        }}
      />
    </>
  );
}
