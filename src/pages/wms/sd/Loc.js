import React, {useEffect, useState} from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField} from "../../../components/SearchBar/Components/TextFieldDefault.js"
import {client} from '../../../contraints.js';
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { gvGridDropdownDisLabel, gvGetRowData, gvSeData } from "../../../components/Common.js";

//Modal
import MyModal from "../../../components/Modal/MyModal.js";
import useModal from "../../../components/Modal/useModal.js";

// styles
import useStyles from "../styles.js";


const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
const columns = [
  { field: "id",                headerName: "ID",                               align:"center", width:20},
  { field: "bizCd",             headerName: "사업자코드",         editable: true, align:"left", width:100},
  { field: "dcCd",              headerName: "물류창고코드",       editable: true, align:"left", width:100},
  { field: "zoneCd",            headerName: "지역코드",         editable: true, align:"left", width:100},
  { field: "locCd",             headerName: "로케이션코드",       editable: true, align:"left", width:100},
  { field: "linCd",             headerName: "행",               editable: true, align:"left", width:100},
  { field: "rowCd",             headerName: "열",             editable: true, align:"left", width:100},
  { field: "levCd",             headerName: "단",             editable: true, align:"left", width:100},
  { field: "locTypeCd",         headerName: "로케이션유형",     editable: true, align:"left", width:100},
  { field: "loadGbnCd",         headerName: "로케이션구분",       editable: true, align:"left", width:100},
  { field: "holdStCd",          headerName: "보류상태",         editable: true, align:"left", width:100},
  { field: "locPrioord",        headerName: "로케이션우선순위",   editable: true, align:"left", width:100},
  { field: "itemMixLoadYn",     headerName: "제품혼적여부",     editable: true, align:"left", width:100},
  { field: "lotMixLoadYn",      headerName: "LOT혼적여부",      editable: true, align:"left", width:100},
  { field: "horizontal",        headerName: "가로",           editable: true, align:"left", width:100},
  { field: "vertical",          headerName: "세로",             editable: true, align:"left", width:100},
  { field: "height",            headerName: "높이",             editable: true, align:"left", width:100},
  { field: "cbm",               headerName: "체적",             editable: true, align:"left", width:100},
  { field: "weight",            headerName: "중량",             editable: true, align:"left", width:100},
  { field: "useYn",             headerName: "사용여부",             editable: true, 
      align:"center",
      type: "singleSelect",
      valueOptions: useYnCmb,
      valueFormatter: gvGridDropdownDisLabel,
  },
  { field: "remark",            headerName: "비고",               editable: true, align:"left", width:300},
];
 

export default function Biz(props) {
  const {menuTitle} = '로케이션 리스트';
  const classes = useStyles();
  const {openModal} = useModal();


  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  //조회조건
  const [schValues, setSchValues] = useState({ 
    codeCd: "", 
  });
  //조회조건
  const onChangeSearch = (event) => {
    setSchValues({ ...values, [event.target.id]: event.target.value });
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
    bizCd:'',
    dcCd: "",
    zoneCd: "",
    locCd: "",
    linCd: "",
    rowCd: "",
    levCd: "",
    locTypeCd: "",
    loadGbnCd: "",
    locPrioord: "",
    itemMixLoadYn: "",
    lotMixLoadYn: "",
    horizontal: "",
    vertical: "",
    cbm: "",
    weight: "",
    remark: "",
    useYn: "Y",
  }
  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);
  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearch();
  }, []);
  
  //코드그룹리스트 조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`/wms/sd/loc/selectLocList`, data, {})
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
    console.log('저장',selRowId, rowData)
    openModal(MyModal, {
      title:"",
      content:"저장 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(`/wms/sd/loc/saveLoc`,rowData, {})
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
    console.log('삭제',rowData)
    openModal(MyModal, {
      title:"",
      content:"삭제 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(`/wms/sd/loc/deleteLoc`,rowData,{})
          .then(res => {
            alert('삭제되었습니다.')
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }

  return (
    <>
      <PageTitle title={menuTitle}  />
      <SearchBar
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}>
          <SchTextField id="codeCd" label='코드/명'
            div={"3"}
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />    
      </SearchBar>
      
      <Grid spacing={4}>
        <Grid item xs={12} style={{ height: 750, width: '100%' }}>
          <DataGrid
            title={"Loc List"} //제목
            rows={dataList} //dataList
            columns={columns} //컬럼 정의
            headerHeight={30} //헤더 높이
            rowHeight={28} //행 높이
            onRowClick={(e)=>{setValues(e.row); setSelRowId(e.row.id);} }
            footerHeight={30}
            selectionModel={selRowId} //쎌선택 변수지정
            onCellEditCommit={React.useCallback((params) => {dataList[params.id-1][params.field] = params.value;},[dataList] //쎌변경시 데이터변경
          )}
          />
        </Grid>
      </Grid>
    </>
    
  );
}