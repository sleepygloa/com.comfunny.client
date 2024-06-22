import React, { useState, useEffect } from 'react';

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField, SchDateField} from "../../../components/SearchBar/Components/TextFieldDefault.js"

import { DataGrid } from "@mui/x-data-grid";
import { Box, Tabs, Tab, Badge, Grid } from '@mui/material';

//Common
import {client} from '../../../contraints.js';
import { gvGridDropdownDisLabel, 
  gvGetToday
} from "../../../components/Common.js";

//CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

export default function InboundInq() {
  const {menuTitle} = '입고현황';
  const PRO_URL = '/wms/ib/inboundInq';
  const {openModal} = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();

  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  const [selDtlRowId, setSelDtlRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  const [dataDtlList, setDataDtlList] = useState([]); //

  const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
  //입고전표컬럼
  const columns = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "dcCd",              headerName: "물류창고코드",      editable: false, align:"left", width:120},
    { field: "ibNo",              headerName: "입고번호",         editable: false, align:"left", width:120},
    { field: "clientCd",          headerName: "고객사코드",       editable: false, align:"left", width:120},
    { field: "ibGbnCd",           headerName: "입고구분코드",     editable: false, align:"left", width:120},
    { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "ibPlanYmd",         headerName: "입고예정일자",     editable: false, align:"left", width:100},
    { field: "ibYmd",             headerName: "입고일자",       editable: false, align:"left", width:100},
    { field: "poNo",              headerName: "발주번호",       editable: false, align:"left", width:100},
    { field: "poYmd",             headerName: "발주일자",       editable: false, align:"left", width:100},
    { field: "supplierCd",        headerName: "공급처코드",     editable: false, align:"left", width:100},
    { field: "carNo",             headerName: "차량번호",       editable: false, align:"left", width:100},
    { field: "tcObNo",            headerName: "이고출고번호",     editable: false, align:"left", width:100},
    { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    { field: "useYn",             headerName: "사용여부",         editable: false, 
        align:"center", type: "singleSelect",
        valueOptions: useYnCmb,
        valueFormatter: gvGridDropdownDisLabel,
    },
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];
  //입고전표컬럼
  const columnsDtl = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "ibNo",              headerName: "입고번호",         editable: false, align:"left", width:120},
    { field: "ibDetailSeq",       headerName: "입고상세순번",       editable: false, align:"left", width:120},
    { field: "poDetailSeq",       headerName: "발주상세순번",       editable: false, align:"left", width:120},
    { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "itemCd",            headerName: "상품코드",   editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",   editable: false, align:"left", width:100},
    { field: "itemStCd",          headerName: "상품상태코드",   editable: false, align:"left", width:100},
    { field: "poUomCd",           headerName: "발주단위코드",   editable: false, align:"left", width:100},
    { field: "poQty",             headerName: "발주수량",   editable: false, align:"left", width:100},
    { field: "planQty",           headerName: "예정수량",   editable: false, align:"left", width:100},
    { field: "confQty",           headerName: "확정수량",   editable: false, align:"left", width:100},
    { field: "apprQty",           headerName: "승인수량",   editable: false, align:"left", width:100},
    { field: "examQty",           headerName: "검수수량",   editable: false, align:"left", width:100},
    { field: "instQty",           headerName: "지시수량",   editable: false, align:"left", width:100},
    { field: "putwQty",           headerName: "적치수량",   editable: false, align:"left", width:100},

    { field: "noIbRsnCd",         headerName: "미입고사유코드",   editable: false, align:"left", width:100},
    { field: "ibCost",            headerName: "입고단가",   editable: false, align:"left", width:100},
    { field: "ibVat",             headerName: "입고VAT",   editable: false, align:"left", width:100},
    { field: "ibAmt",             headerName: "입고금액",   editable: false, align:"left", width:100},
    { field: "makeLot",           headerName: "제조LOT",   editable: false, align:"left", width:100},
    { field: "makeYmd",           headerName: "제조일자",   editable: false, align:"left", width:100},
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: false, align:"left", width:100},
    { field: "lotId",             headerName: "LOT_ID",   editable: false, align:"left", width:100},
    { field: "lotAttr1",          headerName: "LOT속성1",   editable: false, align:"left", width:100},
    { field: "lotAttr2",          headerName: "LOT속성2",   editable: false, align:"left", width:100},
    { field: "lotAttr3",          headerName: "LOT속성3",   editable: false, align:"left", width:100},
    { field: "lotAttr4",          headerName: "LOT속성4",   editable: false, align:"left", width:100},
    { field: "lotAttr5",          headerName: "LOT속성5",   editable: false, align:"left", width:100},

    { field: "tcObDetailSeq",     headerName: "이고출고상세순번",     editable: false, align:"left", width:100},
    { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    { field: "useYn",             headerName: "사용여부",         editable: false, 
        align:"center", type: "singleSelect",
        valueOptions: useYnCmb,
        valueFormatter: gvGridDropdownDisLabel,
    },
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

  //조회조건
  const [schValues, setSchValues] = useState({ 
    ibNo: "", 
    ibPlanYmd : ""
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
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectInboundOrderList`, data, {})
      .then(res => {
        var dataList = res.data;
        setDataList(dataList);
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //상세조회
  const fnSearchDtl = (rowData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectInboundOrderDetailList`, rowData, {})
      .then(res => {
        var dataList = res.data;
        setDataDtlList(dataList);
        if(dataList.length > -1){
          setSelDtlRowId(1);
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
  function onClickAdd(){
    //선택된 행 다음에 추가
    setDataList(dataList => dataList.concat(initData));
  }

  //저장클릭
  function onClickSave(){
  }

  //삭제클릭
  function onClickDel(){
  }
  //조회 클릭(상세)
  function onClickDtlSelect(){
    fnSearchDtl(values);
  }
  //신규클릭
  function onClickDtlAdd(){
  }

  //저장클릭
  function onClickDtlSave(){
  }

  //삭제클릭
  function onClickDtlDel(){
  }

  return (
    <>
      <SearchBar
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        >
          <SchTextField id="ibNo" label='입고번호/명'
            div={"4"}
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />  
          <SchDateField id="ibPlanYmd" label='입고예정일'
            div={"4"}
            selected={schValues.ibPlanYmd}
            // value={schValues.ibPlanYmd}
            // onChange={(date)=>onChangeSearch(date, 'ibPlanYmd')} 
            onChange={onChangeSearch} 
            // onKeyDown={onKeyDown} 
            />    
      </SearchBar>
      <Grid item xs={12} style={{ height: 350, width: '100%' }}>
        <DataGrid
          title={"Inbound List"} //제목
          rows={dataList} //dataList
          columns={columns} //컬럼 정의
          headerHeight={30} //헤더 높이
          rowHeight={28} //행 높이
          onRowClick={(e)=>{setValues(e.row); fnSearchDtl(e.row)} }
          footerHeight={30}
          selectionModel={selRowId} //쎌선택 변수지정
          
          onCellEditCommit={React.useCallback((params) => {
            dataList[params.id-1][params.field] = params.value;
            
          },[dataList] //쎌변경시 데이터변경
        )}
        />
      </Grid>      

      <SearchBar
        onClickSelect={onClickDtlSelect}
        onClickAdd={onClickDtlAdd}
        onClickSave={onClickDtlSave}
        onClickDel={onClickDtlDel}>
      </SearchBar>
      <Grid item xs={12} style={{ height: '500px', width: '100%' }}>
        <DataGrid
          title={"Inbound Detail List"} //제목
          rows={dataDtlList} //dataList
          columns={columnsDtl} //컬럼 정의
          headerHeight={30} //헤더 높이
          rowHeight={28} //행 높이
          onRowClick={(e)=>{setValuesDtl(e.row); setSelDtlRowId(e.row.id);} }
          footerHeight={30}
          selectionModel={selDtlRowId} //쎌선택 변수지정
          
          onCellEditCommit={React.useCallback((params) => {
            dataDtlList[params.id-1][params.field] = params.value;
            
          },[dataDtlList] //쎌변경시 데이터변경
        )}
        />
      </Grid>
    </>
  );
}
