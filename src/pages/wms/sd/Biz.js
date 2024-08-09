import React, {useEffect, useState, useCallback } from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField} from "../../../components/SearchBar/Components/TextFieldDefault.js"
import {client} from '../../../contraints.js';
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Typography } from "@mui/material";
import { 
  gvGridDropdownDisLabel, 
  gvGridFieldFormatFaxNumber,
  gvGridFieldFormatPhoneNumber,
  gvGetRowData, gvSeData 
} from "../../../components/Common.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

// styles
import useStyles from "../styles.js";

// DataGrid Css
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

//NaverMap
import DaumPostcodeShppingMall from "../maps/DaumPostcodeShppingMall.js";

 
export default function Biz(props) {
  const {menuTitle} = '사업자 관리';
  const PRO_URL = '/wms/sd/biz';
  const classes = useStyles();
  const {openModal, closeModal} = useModal();

  const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "bizCd",             headerName: "사업자코드",           editable: true, align:"left", width:200},
    { field: "bizNo",             headerName: "사업자번호",           editable: true, align:"left", width:120},
    { field: "bizNm",             headerName: "사업자명",             editable: true, align:"left", width:300},
    /* 주소 시작 */
    { field: "deliveryNm",        headerName: "배송처명",            editable: false, align:"left", width:200,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems:'center' }}>
            <Typography variant="body2">{params.value}</Typography>
            <IconButton><SearchIcon /></IconButton>
          </Box>
      ),},
    { field: "zip",               headerName: "우편번호",             editable: false, align:"left", width:100},
    { field: "jibunAddr",         headerName: "지번주소",             editable: false, align:"left", width:300},
    { field: "roadAddr",          headerName: "도로명주소",           editable: false, align:"left", width:300},
    { field: "detailAddr",        headerName: "상세주소",             ditable: false, align:"left", width:300},
    { field: "lat",               headerName: "위도",               editable: false, align:"left", width:150},
    { field: "lon",               headerName: "경도",               editable: false, align:"left", width:150},
    /* 주소 끝 */
    { field: "telNo",             headerName: "전화번호",            editable: true, align:"left", width:120,
      valueFormatter: (params) => gvGridFieldFormatPhoneNumber(params.value),
    },
    { field: "faxNo",             headerName: "팩스",                editable: true, align:"left", width:120,
      valueFormatter: (params) => gvGridFieldFormatFaxNumber(params.value),
    },
    { field: "useYn",             headerName: "사용여부",             editable: true, width:80,
        align:"center",type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
    },
    { field: "etcNo1",            headerName: "기타번호1",             editable: true, align:"left", width:80},
    { field: "etcNo2",            headerName: "기타번호2",             editable: true, align:"left", width:80},
    { field: "etcTp1",            headerName: "기타유형1",             editable: true, align:"left", width:80},
    { field: "etcTp2",            headerName: "기타유형2",             editable: true, align:"left", width:80},
  ];


  const getRowId = "";

  //선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  //배송처 콜백 데이터 변수
  const [callbackDelivery, setCallbackDelivery] = useState(null);

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
    id:dataList.length+1,
    bizCd:'',
    bizNo: "",
    bizNm: "",
    ceoNm: "",

    postNo: "",
    basicAddr: "",
    detailAddr: "",

    bizTp: "",
    bizKnd: "",
    telNo: "",
    faxNo: "",
    contactNm: "",
    contactTelNo: "",
    contactEmail: "",
    countryCd: "",
    cityCd: "",
    userCol1: "",
    userCol2: "",
    userCol3: "",
    userCol4: "",
    userCol5: "",
    remark: "",
    useYn: "Y",
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);

  //화면 로드시 1번만 실행
  useEffect(() => {
    // selRowId 변경을 감지하고, 주소 찾기 함수 호출
    if (selRowId === -1) return;

    //주소 콜백이 있을때만 작동
    if(callbackDelivery != undefined){
      var rowData = gvGetRowData(dataList, selRowId);
      rowData.zip = callbackDelivery.zip;
      rowData.jibunAddr = callbackDelivery.jibunAddr;
      rowData.roadAddr = callbackDelivery.roadAddr;
      rowData.detailAddr = callbackDelivery.detailAddr;
      rowData.deliveryNm = callbackDelivery.deliveryNm;
      rowData.lat = callbackDelivery.lat;
      rowData.lon = callbackDelivery.lon;
      setCallbackDelivery(null);
    }


  }, [selRowId, callbackDelivery]);
  
  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectList`, data, {})
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
        client.post(`${PRO_URL}/save`,rowData, {})
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
        client.post(`${PRO_URL}/delete`,rowData, {})
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
    setSelRowId(e.row.id)
    if (e.field === 'deliveryNm') {
      // 컬럼 이름이 'deliveryId' 일 때 함수 호출
      openPopupFindAddress();
    }
  }  

  //주소찾기 팝업
  const openPopupFindAddress = () => {
    openModal('FIND_ADDR', '주소 찾기', <DaumPostcodeShppingMall />, handleAddressUpdate, '1000px', '600px');
  }

  //배송처 팝업 콜백함수
  const handleAddressUpdate = (addressData) => {
    setCallbackDelivery(addressData);
  };

  //쎌변경시 데이터 변경
  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, value }) => {
      dataList[id-1][field] = value
    },
    [dataList],
  );

  return (
    <>
      <PageTitle title={"사업자 관리"}  />
      <ComDeGrid
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        searchBarChildren={
          <>
            <SchTextField id="codeCd" label='코드/명'
              div={"3"}
              onChange={onChangeSearch} 
              onKeyDown={onKeyDown} />  
          </>
        }

        title={"Biz List"} //제목
        dataList={dataList} //dataList
        columns={columns} //컬럼 정의
        // height={"250px"}
        //Event
        // selRowId={selRowId} //쎌선택 변수지정
        // setSelRowId={setSelRowId}
        onRowClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted} //쎌변경시 데이터변경
        
        //Multi
        type={"single"}
      />
    </>
    
  );
}
