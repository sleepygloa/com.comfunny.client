import React, {useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";

// components
import PageTitle from "../components/PageTitle/PageTitle.js";
import SearchBar from "../components/SearchBar/SearchBar.js";
import {SchTextField} from "../components/SearchBar/Components/TextFieldDefault.js"
import {client} from '../../contraints';
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { CenterFocusStrong, RowingRounded } from "@mui/icons-material";
import { gvGridDropdownDisLabel, gvGetRowData } from "../components/Common.js";

//Modal
import MyModal from "../components/Modal/MyModal.js";
import useModal from "../components/Modal/useModal.js";

//page
// import BizDetailPop from  './BizDetailPop'
const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
const delYnCmb = [{value:"Y", label:"삭제"},{value:"N", label:"미삭제"}];

// const roleFormater = ({id : rowId, value, field, api }) =>{
//     roleOption.find((opt)=> opt.value === value).label
// }
//tyles :'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
const columns = [
  { field: "id",        headerName: "ID",                        align:"center", width:20},
  { field: "bizCd",     headerName: "사업자코드",   editable: true, align:"center", width:120},
  { field: "proCd",     headerName: "프로그램코드",  editable: true, align:"center", width:120},
  { field: "proNm",     headerName: "프로그램명",   editable: true, width:200},
  { field: "url",       headerName: "URL",       editable: true, width:300},
  { field: "useYn",     headerName: "사용여부",    editable: true, 
      align:"center",
      type: "singleSelect",
      valueOptions: useYnCmb,
      valueFormatter: gvGridDropdownDisLabel,
  },
  // { field: "delYn",     headerName: "삭제여부",    editable: true, 
  //     align:"center",
  //     type: "singleSelect",
  //     valueOptions: delYnCmb,
  //     valueFormatter: gvGridDropdownDisLabel,},
  { field: "inUserId",  headerName: "등록자",},
  { field: "inDt",      headerName: "등록일시",},
  { field: "upUserId",  headerName: "수정자",},
  { field: "upDt",      headerName: "수정일시",},
];


 
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  div3 : {
    display:'flex',
    width:'33.3%',
    heigth:'25px',
    marginBottom:'5px'
  },
  div4 : {
    display:'flex',
    width:'25%',
    heigth:'25px',
    marginBottom:'5px'
  },
  button: {
    margin: theme.spacing(1),
  },
}))

export default function Program(props) {
  const {menuNm} = props;
  const classes = useStyles();
  const {openModal} = useModal();

  const getRowId = "";
  // const [loading, setLoading] = React.useState(true);
  // function handleClick() {
  //   setLoading(true);
  // }

  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  // const [modalStatusFlag, setModalStatusFlag] = useState(false)

  //Modal
  // const [isOpen, setIsOpen] = React.useState(false);

  //data COLUMN 과 동일시 시켜야함
  //데이터 핸들링하는 rowData Column들.
  const initData = { 
    id : 0,

    bizCd: "", 
    proCd: "",
    proNm: "",
    proDesc: "",
    url: "",
    jsPath: "",
    useYn: "",
    delYn: "",
  }

  //조회조건
  const [schValues, setSchValues] = useState({ 
    proCd: "", 
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
  const [values, setValues] = useState(initData);
  const onChagneHandle = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearch();
  }, []);
  
  const fnSearch = () => {
    //메뉴리스트 조회
    client.post(
      `/api/sys/program/selectProgramList`,
      {
        proCd : schValues.proCd
      },{
      }
      )
      .then(res => {
        setDataList(res.data.content);

        if(selRowId > -1){

        }else{

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
    console.log(selRowId);
    console.log('==', dataList.length)
    //선택된 행 다음에 추가
    setDataList(dataList => dataList.concat({
      id:dataList.length+1,
      proCd:"",
      proNm:"",
      proDesc:"",
      url:"",
      jsPath:"",
      useYn:"",
    }));
  }

  //저장클릭
  function onClickSave(){
    openModal(MyModal, {
      title:"",
      content:"저장 하시겠습니까?",
      onSubmit: () => {
        console.log('저장',values)
        //메뉴리스트 저장
        client.post(
          `/api/sys/program/saveProgram`,
          values
          )
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
    console.log('삭제 클릭')
    openModal(MyModal, {
      title:"",
      content:"삭제 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/program/deleteProgram`,
          values,
          {
          }
          )
          .then(res => {
            alert('삭제되었습니다.')
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }

  //그리드 행 선택 이벤트
  function gridSelected(e, nodeIds){
    //선택된 행 저장
    setSelRowId(nodeIds);

    //데이터셋 세팅
    if(nodeIds <= 0){
      setValues({});
    }else{
        setValues(gvGetRowData(dataList, nodeIds));
    }
  }

  return (
    <>
      <PageTitle title={menuNm} 
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}
      />
      <SearchBar>
          <SchTextField id="proCd" label='코드/명' 
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />    
      </SearchBar>
      
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ height: 500, width: '100%' }}>
          <DataGrid
            title={"Employee List"}
            rows={dataList}
            columns={columns}
            headerHeight={40}
            rowHeight={28}
            // onCellDoubleClick={fnGridDbClick}
          />
        </Grid>
      </Grid>
      {/* <BizDetailPop isOpen={isOpen} setIsOpen={setIsOpen} id={id} flag={modalStatusFlag} /> */}
    </>
    
  );
}
