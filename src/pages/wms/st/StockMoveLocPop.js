import React, { useCallback, useState, useEffect } from 'react';

import { useModal } from "../../../context/ModalContext.js";
import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

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

export default function StockMoveLocPop(props) {
  const { formData } = props;
  const {menuTitle} = '로케이션찾기';
  const PRO_URL = '/wms/st/stockMove';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const key = 'FIND_TO_LOC'; 
  const { getCmbOfGlobalData } = useCommonData();
  const refVal1 = (props.refVal1 ? props.refVal1 : 'MV');

  const getRowId = "";
  const [selRowId, setSelRowId] = useState(); //그리드 선택된 행
  const [dataList, setDataList] = useState([]); //메뉴 데이터 변수
  var dtlChkRows = [];

  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "zoneCd",           headerName: "존코드",                editable: false, align:"left", width:100},
    { field: "zoneNm",           headerName: "존명",                  editable: false, align:"left", width:100},
    { field: "locCd",            headerName: "로케이션코드",            editable: false, align:"left", width:150},
  ];

  useEffect(() => {
  }, [selRowId, dataList]);


  const handleSubmit = () => {
    if(selRowId === undefined){
      alert('선택된 데이터가 없습니다.');
      return;
    }
    const data = gvGetRowData(dataList, selRowId);

    const modalInfo = modals[key];
    if (modalInfo.callback && modalInfo.callback instanceof Function) {
        // const result = modalInfo.callback(getModalData(key).data);
        const result = modalInfo.callback(data);
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
    var data = {
      refVal1  : refVal1
    };
    client.post(`${PRO_URL}/selectStockMoveLocPop`, data, {})
      .then(res => {
        var dataList = res.data;
        setDataList(dataList);
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }


  return (
    <>
      <DialogContent>
        <ComDeGrid
          height={400}
          onClickSelect={onClickSelect} 

          title={"Location List"} //제목
          dataList={dataList} //dataList
          columns={columns} //컬럼 정의
          //Event
          onRowClick={(params)=>{setSelRowId(params.id)}}
          // onCellEditCommit={React.useCallback((params) => {dataList[params.id-1][params.field] = params.value;},[dataList])} //쎌변경시 데이터변경
          
          //Multi
          type={"single"} //single, multi
        />
      </DialogContent>
      <DialogActions>
          <Button onClick={() => handleSubmit()}>확인</Button>
          <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}


