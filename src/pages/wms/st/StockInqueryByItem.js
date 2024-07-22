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
import { SchSelectField } from '../../../components/SearchBar/Components/TextFieldDefault.js';

//CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";



//Modal
import {useModal} from "../../../context/ModalContext.js";

export default function InboundPlan() {
  const {menuTitle} = '제품별 재고조회';
  const PRO_URL = '/wms/st/stockInqueryByItem';
  const {openModal} = useModal();
  const { cmmnCdData, getCmbOfGlobalData } = useCommonData();

  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  const [dcCdCmb, setDcCdCmb] = useState([]);
  const [clientCdCmb, setClientCdCmb] = useState([]);
  //제품별 재고조회
  const columns = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "dcNm",              headerName: "물류창고",        editable: false, align:"left", width:120},
    { field: "clientNm",          headerName: "고객사",         editable: false, align:"left", width:120},
    { field: "itemCd",            headerName: "상품코드",       editable: false, align:"left", width:120},
    { field: "itemNm",            headerName: "상품명",        editable: false, align:"left", width:300},
    { field: "itemStNm",          headerName: "상품상태",       editable: false, align:"left", width:120},
    { field: "stockQty",          headerName: "재고수량",       editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "ibPlanQty",         headerName: "입고예정수량",    editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "obPlanQty",         headerName: "출고예정수량",    editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "holdQty",           headerName: "보류수량",       editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "canStockQty",       headerName: "가용재고수량",       editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
  ];

  //조회조건
  const [schValues, setSchValues] = useState({ 
    dcCd: "", 
    clientCd : "",
    itemCd : "",
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


  useEffect(() => {
    if(selRowId > -1){
    }else{
        //콤보박스 데이터 조회
        if(dcCdCmb.length == 0) setDcCdCmb(getCmbOfGlobalData("DC_CD", ''))
        if(clientCdCmb.length == 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''))
    }
  }, [dcCdCmb, clientCdCmb, dataList]);


  //조회
  const fnSearch = () => {
    var data = {
      dcCd      : schValues.dcCd,
      clientCd  : schValues.clientCd,
      itemCd    : schValues.itemCd,
    };
    client.post(`${PRO_URL}/selectList`, data, {})
      .then(res => {
        var list = res.data;
        setDataList(list);

        if(list.length > -1){
          setSelRowId(1);
        }

      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //조회 클릭
  function onClickSelect(){
    fnSearch();
  }

  return (
    <>
      <ComDeGrid
        onClickSelect={onClickSelect} 
        searchBarChildren={
          <>
            <SchSelectField 
              id="dcCd"
              name={"물류센터"}
              formData={schValues}
              // errors={errors}
              list={dcCdCmb}
              onChange={onChangeSearch}
            />
            <SchSelectField 
              id="clientCd"
              name={"고객사"}
              formData={schValues}
              // errors={errors}
              list={clientCdCmb}
              onChange={onChangeSearch}
            />
          </>
        }

        title={"StockInqueryByItem List"} //제목
        dataList={dataList} //dataList
        columns={columns} //컬럼 정의
        height={"500px"}
        //Event
        // selRowId={selRowId} //쎌선택 변수지정
        // setSelRowId={setSelRowId}
        onRowClick={(params)=>{setSelRowId(params.id); }}
        
        //Multi
        type={"single"}
      />
    </>
  );
}
