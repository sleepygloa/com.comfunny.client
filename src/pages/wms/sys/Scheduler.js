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
import useModal from "../../../components/Modal/useModal.js";

// styles
import useStyles from "../styles.js";

//page
// import BizDetailPop from  './BizDetailPop'
const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
const delYnCmb = [{value:"Y", label:"삭제"},{value:"N", label:"미삭제"}];


// const roleFormater = ({id : rowId, value, field, api }) =>{
//     roleOption.find((opt)=> opt.value === value).label
// }
//tyles :'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
const columns = [
  { field: "id",          headerName: "ID",                               align:"center", width:20},
  { field: "scheSeq",     headerName: "순번",               editable: true, align:"center", width:50},
  { field: "scheNm",      headerName: "스케쥴명",            editable: true, align:"left", width:300},
  { field: "scheDesc",    headerName: "스케쥴설명",           editable: true, align:"left", width:300},
  { field: "scheClassPath", headerName: "스케쥴클래스파일경로",  editable: true, align:"left", width:300},
  { field: "scheSec",     headerName: "초",                 editable: true, align:"left", width:50},
  { field: "scheMin",     headerName: "분",                 editable: true, align:"left", width:100},
  { field: "scheHour",    headerName: "시",                 editable: true, align:"left", width:50},
  { field: "scheDay",     headerName: "일",                 editable: true, align:"left", width:50},
  { field: "scheMonth",   headerName: "월",                 editable: true, align:"left", width:50},
  { field: "scheYear",    headerName: "연",                 editable: true, align:"left", width:50},
  { field: "useYn",       headerName: "사용여부",             editable: true, 
      align:"center",
      type: "singleSelect",
      valueOptions: useYnCmb,
      valueFormatter: gvGridDropdownDisLabel,
  },
];

 
export default function Code(props) {
  const {menuTitle} = '스케쥴 리스트';
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

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState({ 
    id : 0,
    scheNm: "",
    scheDesc: "",
    scheClassPath: "",
    scheSec: "",
    scheMin: "",
    scheHour: "",
    scheDay: "",
    scheMonth: "",
    scheYear: "",
    useYn: "Y",
  });

  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearch();
  }, []);
  

  //코드그룹리스트 조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`/wms/sys/scheduler/selectSchedulerList`, data, {})
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
    setDataList(dataList => dataList.concat({
      id:dataList.length+1,
      bizCd:'COMFUNNY_DEVELOPERS',
      scheNm: "",
      scheDesc: "",
      scheClassPath: "",
      scheSec: "",
      scheMin: "",
      scheHour: "",
      scheDay: "",
      scheMonth: "",
      scheYear: "",
      useYn: "Y",
    }));
  }

  //저장클릭
  function onClickSave(){
    var rowData = gvGetRowData(dataList, selRowId);
    // openModal(MyModal, {
    //   title:"",
    //   content:"저장 하시겠습니까?",
    //   onSubmit: () => {
    //     //메뉴리스트 저장
    //     client.post(`/wms/sys/scheduler/saveScheduler`,rowData)
    //       .then(res => {
    //         alert('저장되었습니다.');
    //       }).catch(error => { 
    //         console.log('error = '+error); 
    //       })

    //   }
    // });
  }

  //삭제클릭
  function onClickDel(){
    var rowData = gvGetRowData(dataList, selRowId);
    // openModal(MyModal, {
    //   title:"",
    //   content:"삭제 하시겠습니까?",
    //   onSubmit: () => {
    //     //메뉴리스트 저장
    //     client.post(`/wms/sys/scheduler/deleteScheduler`,rowData,{})
    //       .then(res => {
    //         alert('삭제되었습니다.')
    //       }).catch(error => { 
    //         console.log('error = '+error); 
    //       })

    //   }
    // });
  }
  return (
    <>
      <PageTitle title={'스케쥴 리스트'} />
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
            title={"Scheulder List"} //제목
            rows={dataList} //dataList
            columns={columns} //컬럼 정의
            headerHeight={30} //헤더 높이
            rowHeight={28} //행 높이
            onRowClick={(e)=>{setValues(e.row);} }
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
