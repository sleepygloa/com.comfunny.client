import React, {useEffect, useState, useCallback } from "react";

// context
import { useCommonData } from "../../../context/CommonDataContext.js";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField} from "../../../components/SearchBar/Components/TextFieldDefault.js"
import {client} from '../../../contraints.js';
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Typography } from "@mui/material";
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
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import numeral from 'numeral';

//Modal
import {useModal} from "../../../context/ModalContext.js";

// styles
import useStyles from "../styles.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  clientCd: '고객사',
  itemCd: '상품코드',
  itemNm: '상품명',
  itemSpec: '상품규격',
  itemGbnCd: '상품구분',
  largeClassCd: '대분류',
  middleClassCd: '중분류',
  smallClassCd: '소분류',
  ibCost: '입고단가',
  obCost: '출고단가',
  horizontal: '가로',
  vertical: '세로',
  height: '높이',
  cbm: '체적',
  weight: '중량',
  itemBarcode: '상품바코드',
  boxBarcode: '박스바코드',
  keepTempeGbnCd: '보관온도구분',
  replaceItemCd: '대체상품',
  distExpiryDays: '유통기한일수',
  minUomCd: '최소단위',
  setItemYn: '세트상품여부',
  vatYn: '과세여부',
  userCol1: '사용자컬럼1',
  userCol2: '사용자컬럼2',
  userCol3: '사용자컬럼3',
  userCol4: '사용자컬럼4',
  userCol5: '사용자컬럼5',
  remark: '비고',
  useYn: '사용여부',
};

export default function Item(props) {
  const {menuTitle} = '상품 관리';
  const PRO_URL = '/wms/sd/item';
  const classes = useStyles();
  const {openModal} = useModal();
  const { getCmbOfGlobalData } = useCommonData();


  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //


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
    { field: "clientCd",          headerName: "고객사",              editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: clientCdCmb,
    },
    { field: "itemCd",            headerName: "상품코드",             editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",              editable: true, align:"left", width:300},
    { field: "itemSpec",          headerName: "상품규격",             editable: true, align:"left", width:100},
    { field: "itemGbnCd",         headerName: "상품구분",             editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: itemGbnCdCmb,
    },
    { field: "largeClassCd",      headerName: "대분류",              editable: true, 
      align:"center", type: "singleSelect", 
      valueGetter : (params) => {
        const option = largeClassCdCmb.find((v) => v.value === params.row.largeClassCd);
        return option ? option.label : '';
    },
      valueOptions: largeClassCdCmb, 
    },
    { field: "middleClassCd",     headerName: "중분류",              editable: true, 
      align:"center", type: "singleSelect",
      valueGetter : (params) => {
        if(largeMiddleClassCdCmb === undefined) return '';
        if(largeMiddleClassCdCmb[params.row.largeClassCd] === undefined) return '';

        const options = largeMiddleClassCdCmb[params.row.largeClassCd] || [];
        const option = options.find(v => v.value === params.value);
        return option ? option.label : '';
    },
      valueOptions: (params) => largeMiddleClassCdCmb[params.row.largeClassCd] || [],
    },
    { field: "smallClassCd",      headerName: "소분류",              editable: true, 
      align:"center", type: "singleSelect",
      valueGetter : (params) => {
        if(largeMiddleSmallClassCdCmb === undefined) return '';
        if(largeMiddleSmallClassCdCmb[params.row.largeClassCd] === undefined) return '';
        if(largeMiddleSmallClassCdCmb[params.row.largeClassCd][params.row.middleClassCd] === undefined) return '';

        const options = largeMiddleSmallClassCdCmb[params.row.largeClassCd][params.row.middleClassCd] || [];
        const option = options.find(v => v.value === params.value);
        return option ? option.label : '';
    },
      valueOptions: (params) => largeMiddleSmallClassCdCmb[params.row.largeClassCd][params.row.middleClassCd] || [],
    },

    { field: "ibCost",             headerName: "입고단가",            editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)

    },
    { field: "obCost",             headerName: "출고단가",            editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)

    },
    { field: "horizontal",         headerName: "가로(m)",            editable: true, align:"right", width:80},
    { field: "vertical",           headerName: "세로(m)",            editable: true, align:"right", width:80},
    { field: "height",             headerName: "높이(m)",            editable: true, align:"right", width:80},
    { field: "cbm",                headerName: "체적(m3)",           editable: false, align:"right", width:100},
    { field: "weight",             headerName: "중량(Kg)",           editable: true, align:"right", width:80},
    { field: "itemBarcode",        headerName: "아이템바코드",         editable: true, align:"left", width:100},
    { field: "boxBarcode",         headerName: "박스바코드",           editable: true, align:"left", width:100},
  
    { field: "keepTempeGbnCd",     headerName: "보관온도구분",          editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: keepTempeGbnCdCmb,
  },
    // { field: "replaceItemCd",      headerName: "대체상품코드",          editable: true, align:"left", width:100},
    { field: "distExpiryDays",     headerName: "유통기한일수",          editable: true, align:"left", width:100},
  //   { field: "minUomCd",           headerName: "최소단위코드",          editable: true, 
  //     align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
  //     valueOptions: minUomCdCmb,
  // },
  //   { field: "setItemYn",          headerName: "세트상품여부",          editable: true, 
  //     align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
  //     valueOptions: setItemYnCmb,
  // },
    { field: "vatYn",              headerName: "과세여부",             editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: vatYnCmb,
  },
    { field: "useYn",              headerName: "사용여부",             editable: true, 
        align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
    },
    // { field: "userCol1",         headerName: "사용자컬럼1",               editable: true, align:"left", width:100},
    // { field: "userCol2",         headerName: "사용자컬럼2",               editable: true, align:"left", width:100},
    // { field: "userCol3",         headerName: "사용자컬럼3",               editable: true, align:"left", width:100},
    // { field: "userCol4",         headerName: "사용자컬럼4",               editable: true, align:"left", width:100},
    // { field: "userCol5",         headerName: "사용자컬럼5",               editable: true, align:"left", width:100},
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
    bizCd: '',
    clientCd: '',
    itemCd: '',
    itemNm: '',
    itemSpec: '',
    itemGbnCd: '',
    largeClassCd: '',
    middleClassCd: '',
    smallClassCd: '',
    ibCost: '',
    obCost: '',
    horizontal: '1',
    vertical: '1',
    height: '1',
    cbm: '',
    weight: '',
    itemBarcode: '',
    boxBarcode: '',
    keepTempeGbnCd: '',
    replaceItemCd: '',
    distExpiryDays: '9999',
    minUomCd: '',
    setItemYn: 'N',
    vatYn: 'N',
    useYn: 'Y',
    userCol1: '',
    userCol2: '',
    userCol3: '',
    userCol4: '',
    userCol5: '',
    remark: '',
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);

  //화면 로드시 1번만 실행
  useEffect(() => {
    if(selRowId !== -1){

    }else{
      if(clientCdCmb.length == 0) setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''))
      //콤보박스 데이터 조회
      if(keepTempeGbnCdCmb.length == 0) setKeepTempeGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TEMPE_GBN_CD'));
      if(minUomCdCmb.length == 0) setMinUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
      if(setItemYnCmb.length == 0) setSetItemYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
      if(vatYnCmb.length == 0) setVatYnCmb(getCmbOfGlobalData('CMMN_CD', 'YN'));
      if(useYnCmb.length == 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      if(itemGbnCdCmb.length == 0) setItemGbnCdCmb(getCmbOfGlobalData('CMMN_CD', 'ITEM_GBN_CD'));

      if(largeClassCdCmb.length > 0) return;
      //대분류, 중분류, 소분류 조회 
      fnSearchLargeClassCd();
      fnSearchLargeMiddleClassCd();
      fnSearchLargeMiddleSmallClassCd();
    }
  }, [selRowId, clientCdCmb, keepTempeGbnCdCmb, minUomCdCmb, setItemYnCmb, vatYnCmb, useYnCmb, largeClassCdCmb, largeMiddleClassCdCmb, largeMiddleSmallClassCdCmb]);
  
  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectItemList`, data, {})
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
        client.post(`${PRO_URL}/saveItem`,rowData, {})
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
        client.post(`${PRO_URL}/deleteItem`,rowData, {})
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
    selRowId === -1 ? openModal('','A','복사할 행을 선택해주세요.') :
    openModal('', '',  '선택한 행을 복사 하시겠습니까?', 
      () => {
        var rowData = gvGetRowData(dataList, selRowId);
        var copyData = {...rowData, id: dataList.length+1, itemCd:'', itemClassCd: ''};
        setDataList(dataList => dataList.concat(copyData));
      }
    );
  }

  //쎌클릭 핸들링
  const handleGridCellClick = (e) => {
    setValues(e.row); 
    setSelRowId(e.row.id); 
  }  

  //대분류 조회
  const fnSearchLargeClassCd = () => {
    client.post(`${PRO_URL}/selectLargeClassCdList`, {}, {})
      .then(res => {
        setLargeClassCdCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //중분류 조회
  const fnSearchLargeMiddleClassCd = () => {
    client.post(`${PRO_URL}/selectLargeMiddleClassCdList`, {}, {})
      .then(res => {
        setLargeMiddleClassCdCmb(gvSetLevelDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //소분류 조회
  const fnSearchLargeMiddleSmallClassCd = () => {
    client.post(`${PRO_URL}/selectLargeMiddleSmallClassCdList`, {}, {})
      .then(res => {
        setLargeMiddleSmallClassCdCmb(gvSetLevel2DropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //쎌변경시 데이터 변경
  const handleEditCellChangeCommitted = React.useCallback(

    //가로, 세로, 높이 수정시 체적 계산
    ({ id, field, value }) => {
      if (['horizontal', 'vertical', 'height'].includes(field)) {
        const updatedRows = dataList.map((row) => {
          if (row.id === id) {
            const newFieldValues = {
              ...row,
              [field]: Number(value),
            };
            // Calculate new volume
            newFieldValues.cbm = newFieldValues.horizontal * newFieldValues.vertical * newFieldValues.height;
            return newFieldValues;
          }
          return row;
        });
        setDataList(updatedRows);
      }

      dataList[id-1][field] = value
    },
    [dataList],
  );

  return (
    <>
      <PageTitle title={'상품 관리'}  />
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

        title={"Item List"} //제목
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
