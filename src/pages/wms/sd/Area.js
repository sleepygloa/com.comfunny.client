import React, {useEffect, useContext, useState} from "react";

//CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField} from "../../../components/SearchBar/Components/TextFieldDefault.js"
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

//Common
import {client} from '../../../contraints.js';
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
} from "../../../components/Common.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

export default function Biz(props) {
  const {menuTitle} = '구역 관리';
  const PRO_URL = '/wms/sd/area';
  const {openModal} = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부
  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [keepTempGbnCmb, setKeepTempGbnCmb] = useState([]); //보관온도구분콤보

  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "dcCd",              headerName: "물류창고",         editable: true, 
        align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,  
        valueOptions: dcCmb,
    },
    { field: "areaCd",            headerName: "구역코드",             editable: true, align:"left", width:100},
    { field: "areaNm",            headerName: "구역명",               editable: true, align:"left", width:200},
    { field: "keepTempeGbnCd",    headerName: "보관온도구분",             editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,  
      valueOptions: keepTempGbnCmb,
    },

    { field: "stdWidth",          headerName: "기준X",                editable: true, align:"center", width:100},
    { field: "stdLength",         headerName: "기준Y",                editable: true, align:"center", width:100},
    { field: "width",             headerName: "가로",                 editable: true, align:"center", width:100},
    { field: "length",            headerName: "세로",                 editable: true, align:"center", width:100},
    { field: "height",            headerName: "높이",                 editable: true, align:"center", width:100},
    
    { field: "useYn",             headerName: "사용여부",             editable: true, 
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
    areaCd: "",
    areaNm: "",
    keepTempeGbnCd: "",
    remark: "",
    useYn: "Y",
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);
  //화면 로드시 1번만 실행
  useEffect(() => {
    // selRowId 변경을 감지하고, 주소 찾기 함수 호출
    if (selRowId !== -1) {

    }else{
      if(useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      if(keepTempGbnCmb.length === 0) setKeepTempGbnCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD'))

      if(dcCmb.length === 0) fnSearchDc();
    }

  }, [selRowId, useYnCmb, keepTempGbnCmb, dcCmb]);
  
  //물류창고 조회
  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcList`, null, {})
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  
  
  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectAreaList`, data, {})
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
    openModal('', '',  '저장 하시겠습니까?', 
      () => {
        //메뉴리스트 저장
        client.post(`${PRO_URL}/saveArea`,rowData, {})
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
    openModal('', '',  '삭제 하시겠습니까?', 
      () => {
        //메뉴리스트 저장
        client.post(`${PRO_URL}/deleteArea`,rowData, {})
          .then(res => {
            alert('삭제되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //쎌클릭 핸들링
  const handleGridCellClick = (e) => {
    setValues(e.row); 
    setSelRowId(e.row.id); 
  }  

  return (
    <>
      <PageTitle title={"구역 관리"}  />
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
      
      <Grid item xs={12} style={{ height: 750, width: '100%' }}>
        <DataGrid
          title={menuTitle} //제목
          rows={dataList} //dataList
          columns={columns} //컬럼 정의
          headerHeight={30} //헤더 높이
          rowHeight={28} //행 높이
          onCellClick={handleGridCellClick}
          footerHeight={30}
          selectionModel={selRowId} //쎌선택 변수지정
          onCellEditCommit={React.useCallback((params) => {dataList[params.id-1][params.field] = params.value;},[dataList] //쎌변경시 데이터변경
        )}
        />
      </Grid>
    </>
    
  );
}
