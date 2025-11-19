import React, {useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBar from "../../components/SearchBar/SearchBar";
import {SchTextField} from "../../components/SearchBar/Components/TextFieldDefault"
import {client} from '../../contraints';
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { CenterFocusStrong, RowingRounded } from "@mui/icons-material";
import { gvGridDropdownDisLabel, gvGetRowData, gvSeData, gvGetGridTreeExpand, gvMakeTreeList, gvMakeTreeList2 } from "../../components/Common";

//tree
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web'; // web.cjs is required for IE 11 support


//Modal
import MyModal from "../../components/Modal/MyModal.js";
import useModal from "../../components/Modal/useModal";
import { CustomGrid } from "../../components/Grid/CustomGrid";

//page
// import BizDetailPop from  './BizDetailPop'
const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
const delYnCmb = [{value:"Y", label:"삭제"},{value:"N", label:"미삭제"}];

// const roleFormater = ({id : rowId, value, field, api }) =>{
//     roleOption.find((opt)=> opt.value === value).label
// }
//tyles :'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
const columns = [
  
  { field: "bizCd", headerName: "사업자코드", editable: false, align:"center", width:120},
  { field: "authSeq",  headerName: "권한순번", editable: false, align:"center", width:120},
  { field: "authNm",  headerName: "권한명", editable: true, width:200},
  { field: "authDesc",  headerName: "권한설명", editable: true, width:500},
];

const columnsNoRegMenu = [
  { field: "bizCd", headerName: "사업자코드", editable: false, align:"center", width:120, hide:true},
  { field: "upMenuCd", headerName: "부모메뉴코드", editable: false, align:"left", width:120, hide:true},
  { field: "menuCd", headerName: "메뉴코드", editable: false, align:"left", width:120, hide:true},
  { field: "menuNm",  headerName: "메뉴명", editable: false, align:"left", width:200},
];
 
const columnsRegMenu = [
  { field: "upMenuCd", headerName: "부모메뉴코드", editable: false, align:"left", width:120, hide:true},
  { field: "menuCd", headerName: "메뉴코드", editable: false, align:"left", width:120, hide:true},
  { field: "menuNm",  headerName: "메뉴명", editable: false, align:"left", width:200},
];

export default function User(props) {
  const {menuNm} = props; //메뉴명
  const {openModal} = useModal();

  //로우선택 ID 
  const [selRowId, setSelRowId] = useState(-1); //권한 rowid
  const [selNoRegMenuRowId, setSelNoRegMenuRowId] = useState(-1); //권한 미등록메뉴 rowid
  const [selRegMenuRowId, setSelRegMenuRowId] = useState(-1); //권한 등록메뉴 rowid

  //리스트
  const [dataList, setDataList] = useState([]); //권한리스트
  const [noRegMenuList, setNoRegMenuList] = useState([]); //미등록 메뉴리스트
  const [regMenuList, setRegMenuList] = useState([]); //권한등록된 메뉴리스트

  //Modal
  // const [isOpen, setIsOpen] = React.useState(false);

  //조회조건
  const [schValues, setSchValues] = useState();
  const onChangeSearch = (event) => {
    event.persist();
    setSchValues({ ...values, [event.target.id]: event.target.value });
  };

  //keydown event
  const onKeyDown = (e) =>{
    e.persist();
    if(e.keyCode === 13){
        e.preventDefault();
        fnSearch();
        return;
    }
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState();
  // const onChagneHandle = (event) => {
  //   setValues({ ...values, [event.target.id]: event.target.value });
  // };

  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearch();
  }, []);
  
  //조회
  const fnSearch = () => {
    console.log('gvSeData',gvSeData);

    var params = {
      bizCd : gvSeData.bizCd,
      userId : gvSeData.userId
    }
    
    client.post(`/api/sys/auth/selectAuthList`, params)
      .then(res => {
        var dataList = res.data.content;
        setDataList(dataList);
        if(dataList.length > -1){
          setSelRowId(1);
          // fnSearchNoRegMenu(dataList[0]); //권한비등록메뉴
          // fnSearchRegMenu(dataList[0]); //권한등록메뉴
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
    console.log(gvSeData.bizCd)
    //선택된 행 다음에 추가
    setDataList(dataList => dataList.concat({
      id:dataList.length+1,
      bizCd: gvSeData.bizCd,
      authSeq : "",
      authNm : "",
      authDesc : "",
    }));
  }

  //저장클릭
  function onClickSave(){
    var rowData = gvGetRowData(dataList, selRowId);
    console.log('저장',rowData)
    openModal(MyModal, {
      title:"",
      content:"저장 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/auth/saveAuth`,rowData)
          .then(res => {
            alert('저장되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }

  //삭제클릭
  function onClickDel(){
    var rowData = gvGetRowData(dataList, selRowId);
    console.log('삭제', rowData)
    openModal(MyModal, {
      title:"",
      content:"삭제 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/auth/deleteAuth`,rowData)
          .then(res => {
            alert('삭제되었습니다.')
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }


  /****************************************************************************************
   * 권한 비등록메뉴리스트
   * **************************************************************************************/
  //조회클릭
  const fnSearchNoRegMenu = () => {
    //메뉴리스트 조회
    client.post(`/api/sys/authMenu/selectNoRegMenuList`,{})
      .then(res => {
        setNoRegMenuList(res.data.content);

        // //셀 포커스
        // if(selRowId > -1){
        //   setValuesNoRegMenu(gvGetRowData(res.data.list, selRowId));
        // }else{
        //   setValuesNoRegMenu(initData);
        // }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  /****************************************************************************************
   * 권한 등록메뉴리스트
   * **************************************************************************************/
  //조회클릭
  const fnSearchRegMenu = () => {
    //메뉴리스트 조회
    client.post(`/api/sys/authMenu/selectRegMenuList`,{})
      .then(res => {
        console.log('fnSearchRegMenu', res.data.content)
        setRegMenuList(res.data.content, 0);

        // //셀 포커스
        // if(selRowId > -1){
        //   setValuesNoRegMenu(gvGetRowData(res.data.list, selRowId));
        // }else{
        //   setValuesNoRegMenu(initData);
        // }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }


  return (
    <>
      <PageTitle title={menuNm} />
      <SearchBar
      onClickSelect={onClickSelect} 
      onClickAdd={onClickAdd} 
      onClickSave={onClickSave}
      onClickDel={onClickDel}
      >
      <SchTextField id="authSeq" label='권한' 
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />    
      </SearchBar>
      
      <Grid container spacing={4}>
        <Grid item xs={6} style={{ height: 250, width: '100%' }}>
          <CustomGrid 
              title={"Auth List"} //제목
              dataList={dataList} //dataList
              columns={columns} //컬럼 정의
              selectionModel={selRowId} //쎌선택 변수지정
              onRowClick={(e)=>{setValues(e.row);setSelRowId(e.row.id);fnSearchNoRegMenu();fnSearchRegMenu();}} //로우 클릭이벤트
              />
        </Grid>

        <Grid item xs={6} style={{ height: 250, width: '100%' }}>
          <CustomGrid
            tree
            // checkboxSelection
            title={"NoRegMenu List"} //제목
            dataList={noRegMenuList} //dataList
            columns={columnsNoRegMenu} //컬럼 정의
            onRowClick={(e)=>{setSelNoRegMenuRowId(e.row.id)} } //로우 클릭이벤트
            selectionModel={selNoRegMenuRowId} //쎌선택 변수지정
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ height: 250, width: '100%' }}>
         <CustomGrid
            checkboxSelection
            title={"RegMenu List"} //제목
            dataList={regMenuList} //dataList
            columns={columnsRegMenu} //컬럼 정의
            onRowClick={(e)=>{setSelRegMenuRowId(e.row.id)} } //로우 클릭이벤트
            selectionModel={selRegMenuRowId} //쎌선택 변수지정
          />
        </Grid>
      </Grid>
      {/* <BizDetailPop isOpen={isOpen} setIsOpen={setIsOpen} id={id} flag={modalStatusFlag} /> */}
    </>
  );
}