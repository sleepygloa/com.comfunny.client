import React, { useCallback, useState, useEffect } from 'react';

import { useModal } from "../../../context/ModalContext.js";
import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "../../../components/SearchBar/SearchBar.js";

// context
import { useCommonData } from "../../../context/CommonDataContext.js";

import { gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvGridLevelDropdownDisLabel, 
  gvSetLevelDropdownData ,
  gvGridLevel2DropdownDisLabel, 
  gvSetLevel2DropdownData ,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser , 
  gvGetRowDataListOfChk,
} from "../../../components/Common.js";
import {client} from '../../../contraints.js';

import { Box, TextField, IconButton, Grid, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function InboundPlanItemPop(props) {
  const { formData } = props;
  const {menuTitle} = '입고예정 상품 관리';
  const PRO_URL = '/wms/ib/inboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const key = 'FIND_INBOUND_ITEM'; 
  const { getCmbOfGlobalData } = useCommonData();

  const getRowId = "";
  const [selRowId, setSelRowId] = useState(); //그리드 선택된 행
  const [dataList, setDataList] = useState([]); //메뉴 데이터 변수
  var chkRows = [];

  const [clientCdCmb, setClientCdCmb] = useState([]); //고객사
  const [keepTempeGbnCdCmb, setKeepTempeGbnCdCmb] = useState([]); //보관온도구분
  const [minUomCdCmb, setMinUomCdCmb] = useState([]); //최소단위
  const [setItemYnCmb, setSetItemYnCmb] = useState([]); //세트상품여부
  const [vatYnCmb, setVatYnCmb] = useState([]); //과세여부
  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부
  const [largeClassCdCmb, setLargeClassCdCmb] = useState([]); //대분류
  const [largeMiddleClassCdCmb, setLargeMiddleClassCdCmb] = useState([]); //중분류
  const [largeMiddleSmallClassCdCmb, setLargeMiddleSmallClassCdCmb] = useState([]); //소분류
  const [itemGbnCdCmb, setItemGbnCdCmb] = useState([]); //상품구분

  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "itemCd",            headerName: "상품코드",             editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",              editable: false, align:"left", width:300},
    { field: "itemSpec",          headerName: "상품규격",             editable: false, align:"left", width:100},
    { field: "itemGbnCd",         headerName: "상품구분",             editable: false, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: itemGbnCdCmb,
    },
    { field: "ibCost",             headerName: "입고단가",            editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "obCost",             headerName: "출고단가",            editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "horizontal",         headerName: "가로(m)",            editable: false, align:"right", width:80},
    { field: "vertical",           headerName: "세로(m)",            editable: false, align:"right", width:80},
    { field: "height",             headerName: "높이(m)",            editable: false, align:"right", width:80},
    { field: "cbm",                headerName: "체적(m3)",           editable: false, align:"right", width:100},
    { field: "weight",             headerName: "중량(Kg)",           editable: false, align:"right", width:80},
    { field: "itemBarcode",        headerName: "아이템바코드",         editable: false, align:"left", width:100},
    { field: "boxBarcode",         headerName: "박스바코드",           editable: false, align:"left", width:100},
    { field: "keepTempeGbnCd",     headerName: "보관온도구분",          editable: false, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: keepTempeGbnCdCmb,
  },
    { field: "replaceItemCd",      headerName: "대체상품코드",          editable: false, align:"left", width:100},
    { field: "distExpiryDays",     headerName: "유통기한일수",          editable: false, align:"left", width:100},
    { field: "minUomCd",           headerName: "최소단위코드",          editable: false, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: minUomCdCmb,
  },
    { field: "setItemYn",          headerName: "세트상품여부",          editable: false, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: setItemYnCmb,
  },
    { field: "vatYn",              headerName: "과세여부",             editable: false, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: vatYnCmb,
  },
    { field: "useYn",              headerName: "사용여부",             editable: false, 
        align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
    },
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

  useEffect(() => {
    if(selRowId !== undefined){

    }else{

      //콤보박스 데이터 조회
      setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''))
  
      //콤보박스 데이터 조회
      setKeepTempeGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD'));
      setMinUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
      setSetItemYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
      setVatYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
      setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      setItemGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'ITEM_GBN_CD'));

    }
  }, [selRowId, clientCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb, largeClassCdCmb, largeMiddleClassCdCmb, largeMiddleSmallClassCdCmb, itemGbnCdCmb]);


  const handleSubmit = () => {
    const modalInfo = modals[key];
    console.log('111', getModalData(key).data)
    if (modalInfo.callback && modalInfo.callback instanceof Function) {
        const result = modalInfo.callback(getModalData(key).data);
        if (result == false) return;
    }
    closeModal(key);
  };

  //조회 클릭
  function onClickSelect(){
    fnSearch();
  }

  //조회
  const fnSearch = () => {
    var data = {clientCd : formData.clientCd};
    client.post(`${PRO_URL}/selectInboundPlanItemPopList`, data, {})
      .then(res => {
        var dataList = res.data;
        setDataList(dataList);
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //그리드 체크박스 선택
  function handleSelectionChange(ids) {
    chkRows = gvGetRowDataListOfChk(dataList, ids)
    updateModalData(key, { ...getModalData(key), 'data':chkRows });
  }

  return (
    <>
      <DialogContent>
        <SearchBar
          onClickSelect={onClickSelect} 
          // onClickAdd={onClickAdd} 
          // onClickSave={onClickSave}
          // onClickDel={onClickDel}
          >
        </SearchBar>
        <Grid item style={{ height: '500px', width: '100%' }}>
            <DataGrid
              title={"Inbound Detail Item List"} //제목
              rows={dataList} //dataList
              columns={columns} //컬럼 정의
              headerHeight={30} //헤더 높이
              rowHeight={28} //행 높이
              // onCellClick={handleGridCellClick}
              footerHeight={30}
              selectionModel={selRowId} //쎌선택 변수지정
              onCellEditCommit={React.useCallback((params) => {
                  dataList[params.id-1][params.field] = params.value;
                },[dataList] //쎌변경시 데이터변경
              )}
              //체크박스
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={handleSelectionChange}

            />
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button onClick={() => handleSubmit()}>확인</Button>
          <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}


