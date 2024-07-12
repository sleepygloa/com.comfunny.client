import React, {useEffect, useState} from "react";

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
import { gvGridDropdownDisLabel, gvGetRowData, gvSetDropdownData, gvGridLevelDropdownDisLabel, gvSetLevelDropdownData } from "../../../components/Common.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

export default function Biz(props) {
  const {menuTitle} = '지역 관리';
  const PRO_URL = '/wms/sd/zone';
  const {openModal} = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부
  const [keepTypeCdCmb, setKeepTypeCdCmb] = useState([]); //보관유형
  const [holdStCdCmb, setHoldStCdCmb] = useState([]); //보류상태
  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [dcAreaCmb, setDcAreaCmb] = useState([]); //구역콤보
  const [keepTempGbnCmb, setKeepTempGbnCmb] = useState([]); //보관온도구분콤보
  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "dcCd",              headerName: "물류창고",         editable: true,
      align:"center", type: "singleSelect", 
      valueGetter : (params) => {
        const option = dcCmb.find((v) => v.value === params.row.dcCd);
        return option ? option.label : '';
    },
      valueOptions: dcCmb,  
    },
    { field: "areaCd",            headerName: "구역",             editable: true, 
      align:"center", type: "singleSelect",
      valueGetter : (params) => {
        const options = dcAreaCmb[params.row.dcCd] || [];
        const option = options.find(v => v.value === params.value);
        return option ? option.label : '';
    },
      valueOptions: (params) => dcAreaCmb[params.row.dcCd] || [],
    },
    { field: "zoneCd",            headerName: "지역코드",             editable: true, align:"left", width:100},
    { field: "zoneNm",            headerName: "지역명",             editable: true, align:"left", width:100},
    { field: "keepTypeCd",        headerName: "보관유형",             editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: keepTypeCdCmb,
    },
    { field: "holdStCd",          headerName: "보류상태",             editable: true,
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: holdStCdCmb,
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
    zoneCd: "",
    zoneNm: "",
    keepTypeCd: "1",
    holdStCd: "1",
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
      if(holdStCdCmb.length === 0) setHoldStCdCmb(getCmbOfGlobalData('CMMN_CD', 'HOLD_ST_CD'));
      if(keepTypeCdCmb.length === 0) setKeepTypeCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TYPE_CD'));

      if(dcCmb.length == 0) fnSearchDc();
      if(dcAreaCmb.length == 0) fnSearchDcArea();
    }

  }, [selRowId, useYnCmb, dcAreaCmb, dcCmb, holdStCdCmb, keepTempGbnCmb]);
  
  //물류창고 조회
  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcList`, null, {})
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  //물류창고,구역 조회
  const fnSearchDcArea = async () => {
    await client.post(`${PRO_URL}/selectDcAreaList`, null, {})
      .then(res => {
        setDcAreaCmb(gvSetLevelDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectZoneList`, data, {})
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
        client.post(`${PRO_URL}/saveZone`,rowData, {})
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
        client.post(`${PRO_URL}/deleteZone`,rowData, {})
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
      <PageTitle title={"존 관리"}  />
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
          onCellEditCommit={React.useCallback((params) => {
            dataList[params.id-1][params.field] = params.value;
            //dc 변경시 area 초기화
            if(params.field == "dcCd") {
              dataList[params.id-1]['areaCd'] = null;
            }
            
          },[dataList] //쎌변경시 데이터변경
        )}
        />
      </Grid>
    </>
    
  );
}
