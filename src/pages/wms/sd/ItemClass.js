import React, {useEffect, useState, useCallback } from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField} from "../../../components/SearchBar/Components/TextFieldDefault.js"
import {client} from '../../../contraints.js';
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Typography } from "@mui/material";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { gvGridDropdownDisLabel, gvGetRowData, gvSeData } from "../../../components/Common.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

// styles
import useStyles from "../styles.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  clientCd: '고객사',
  itemCd: '상품코드',
  itemClassCd: '상품분류코드',
  largeClassCd: '대분류코드',
  largeClassNm: '대분류명',
  middleClassCd: '중분류코드',
  middleClassNm: '중분류명',
  smallClassCd: '소분류코드',
  smallClassNm: '소분류명',
  remark: '비고',
  useYn: '사용여부',
};

export default function Item(props) {
  const {menuTitle} = '상품분류 관리';
  const PRO_URL = '/wms/sd/itemClass';
  const classes = useStyles();
  const {openModal} = useModal();
  const { cmmnCdData, getCmbOfGlobalData } = useCommonData();


  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  const [clientCdCmb, setClientCdCmb] = useState([]); //고객사 콤보박스
  const [useYnCmb, setUseYnCmb] = useState([]);
  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "clientCd",          headerName: "고객사코드",            editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: clientCdCmb,
    },
    { field: "itemClassCd",       headerName: "상품분류코드",           editable: false, align:"left", width:100},
    { field: "largeClassCd",      headerName: "대분류코드",             editable: true, align:"left", width:100},
    { field: "largeClassNm",      headerName: "대분류명",              editable: true, align:"left", width:100},
    { field: "middleClassCd",     headerName: "중분류코드",             editable: true, align:"left", width:100},
    { field: "middleClassNm",     headerName: "중분류명",              editable: true, align:"left", width:100},
    { field: "smallClassCd",      headerName: "소분류코드",             editable: true, align:"left", width:100},
    { field: "smallClassNm",      headerName: "소분류명",              editable: true, align:"left", width:100},

    { field: "useYn",              headerName: "사용여부",             editable: true, 
        align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
    },
    { field: "remark",            headerName: "비고",               editable: true, align:"left", width:300},
  ];
   

  //조회조건
  const [schValues, setSchValues] = useState({ 
    codeCd: "", 
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
    id: dataList.length+1,
    clientCd: '',
    itemClassCd: '',
    largeClassCd: '',
    largeClassNm: '',
    middleClassCd: '',
    middleClassNm: '',
    smallClassCd: '',
    smallClassNm: '',
    useYn: 'Y',
    remark: '',
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);

  //화면 로드시 1번만 실행
  useEffect(() => {

    if(clientCdCmb.length == 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''))
    if(useYnCmb.length == 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));

  }, [selRowId, dataList, clientCdCmb, useYnCmb]);
  
  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectItemClassList`, data, {})
      .then(res => {
        var dataList = res.data;
        setDataList(dataList);
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
    var rowData = gvGetRowData(dataList, selRowId);
    if(!rowData) return;
    
    openModal('', '',  '저장 하시겠습니까?', 
      () => {
        //메뉴리스트 저장
        client.post(`${PRO_URL}/saveItemClass`,rowData, {})
          .then(res => {
            alert('저장되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //삭제클릭
  function onClickDel(){
    var rowData = gvGetRowData(dataList, selRowId);
    if(!rowData) return;
    
    openModal('', '',  '삭제 하시겠습니까?', 
      () => {
        //메뉴리스트 저장
        client.post(`${PRO_URL}/deleteItemClass`,rowData, {})
          .then(res => {
            alert('삭제되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //복사클릭
  function onClickCopy(){
    selRowId === -1 ? alert('복사할 행을 선택해주세요.') :
    openModal('', '',  '선택한 행을 복사 하시겠습니까?', 
      () => {
        var rowData = gvGetRowData(dataList, selRowId);
        var copyData = {...rowData, id: dataList.length+1, itemClassCd: ''};
        setDataList(dataList => dataList.concat(copyData));
      }
    );
  }

  //쎌클릭 핸들링
  const handleGridCellClick = (e) => {
    setValues(e.row); 
    setSelRowId(e.row.id); 
  }  

  //쎌변경시 데이터 변경
  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, value }) => {
      dataList[id-1][field] = value
    },
    [dataList],
  );

  return (
    <>
      <PageTitle title={'상품분류 관리'}  />
      <ComDeGrid
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        onClickCustom1={onClickCopy}
        onClickCustomNm1={'복사'}
        searchBarChildren={
          <>
            <SchTextField id="codeCd" label='코드/명'
              div={"3"}
              onChange={onChangeSearch} 
              onKeyDown={onKeyDown} />  
          </>
        }

        title={"Item Class List"} //제목
        dataList={dataList} //dataList
        columns={columns} //컬럼 정의
        height={"750px"}
        //Event
        // selRowId={selRowId} //쎌선택 변수지정
        // setSelRowId={setSelRowId}
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted} //쎌변경시 데이터변경
        
        //Multi
        type={"single"}
      />
    </>
    
  );
}
