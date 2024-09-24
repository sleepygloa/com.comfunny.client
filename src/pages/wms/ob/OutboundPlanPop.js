import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, MenuItem, Select, InputLabel, FormControl, useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';

//Common
import {client} from '../../../contraints.js';
import { useModal } from "../../../context/ModalContext.js";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvGridLevelDropdownDisLabel, 
  gvSetLevelDropdownData ,
  gvGridLevel2DropdownDisLabel, 
  gvSetLevel2DropdownData ,
  gvGetToday,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser , 
  gvGetRowDataListOfChk,
  gvDataGridAddRowAndStatus
} from "../../../components/Common.js";

import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

import { FrmSelect, FrmTextField, FrmDate, GridDateRenderField, GridDateSetField, GridNumberSetField } from '../../../components/SearchBar/Components/TextFieldDefault.js';

//Popup
import OutboundPlanItemPop from "./OuboundPlanItemPop.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  obNo: '출고번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  obGbnCd: '출고구분',
  obProgStCd: '출고진행상태',
  obPlanYmd: '출고예정일',
  obYmd: '출고일',
  storeCd: '배송처',
  carNo: '차량번호',
  userCol1: '사용자컬럼1',
  userCol2: '사용자컬럼2',
  userCol3: '사용자컬럼3',
  userCol4: '사용자컬럼4',
  userCol5: '사용자컬럼5',
  remark: '비고',
  useYn: '사용여부',
};


export default function OutboundPlanPop(props) {
  const key = 'OUTBOUND_PLAN_POP'
  const PRO_URL = '/wms/ob/outboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    obNo: '',
    dcCd: '',
    clientCd: '',
    obGbnCd: '12',
    obProgStCd: '10',
    obPlanYmd: gvGetToday(),
    obYmd: '',
    storeCd: '',
    carNo: '',
    tcObNo: '',
    userCol1: '',
    userCol2: '',
    userCol3: '',
    userCol4: '',
    userCol5: '',
    remark: '',
    useYn: 'Y',
  });

  var gChkRows = [];
  
  const [selRowId, setSelRowId] = useState(); //그리드 선택된 행
  const [dataList, setDataList] = useState([]); //그리드 데이터셋

  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [clientCmb, setClientCmb] = useState([]); //구역콤보
  const [storeCmb, setStoreCmb] = useState([]); //배송처콤보
  const [obGbnCdCmb, setobGbnCdCmb] = useState([]); //출고구분코드콤보 
  const [obProgStCdCmb, setobProgStCdCmb] = useState([]); //출고진행상태콤보
  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부콤보
  const [ynCmb, setYnCmb] = useState([]); //여부콤보
  const [itemStCdCmb, setItemStCdCmb] = useState([]); //상품상태콤보
  //출고전표컬럼
  const columns = [
    // { field: "modFlag",           headerName: "",             editable:false, align:"center", width:20},
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},

    { field: "obNo",              headerName: "출고번호",         editable: false, align:"left", width:120},
    { field: "obDetailSeq",       headerName: "출고상세순번",       editable: false, align:"left", width:120},
    { field: "obProgStCd",        headerName: "출고진행상태코드",   
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: obProgStCdCmb,
    },
    { field: "itemCd",            headerName: "상품코드",   editable: false,  align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",   editable: false,    align:"left", width:300},
    { field: "itemStCd",          headerName: "상품상태코드",   editable: false, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: itemStCdCmb,
    },
    { field: "pkqty",             headerName: "입수",      editable: false,  align:"center", width:100,},
    { field: "planTotQty",           headerName: "예정(총)",   editable: false, align:"right", width:100},
    { field: "planBoxQty",           headerName: "예정(박스)",   editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "planEaQty",           headerName: "예정(낱개)",   editable: true, align:"right", width:100,
      preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "obCost",            headerName: "출고단가",   editable: false, align:"left", width:100,
      // preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      // valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "obVat",             headerName: "출고VAT",   editable: false, align:"left", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "obAmt",             headerName: "출고금액",   editable: false, align:"left", width:100,
      // preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      // valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "makeLot",           headerName: "제조LOT",   editable: true, align:"left", width:100,
      valueSetter: (params) => {return GridNumberSetField(params, 'makeLot', 12);},
    },
    { field: "makeYmd",           headerName: "제조일자",   editable: true, align:"left", width:150,
      valueSetter: (params) => {return GridDateSetField(params, 'makeYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: true, align:"left", width:150,
      valueSetter: (params) => {return GridDateSetField(params, 'distExpiryYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "useYn",             headerName: "사용여부",         editable: false, 
        align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
    },
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];


  // 입력값 변경 이벤트
  const handleChange = (value, id) => {
    const error = validateInput(id, value);

    setFormData(prev => ({...prev,[id]: value}));
    setErrors(prev => ({...prev,[id]: error}));

    //고객사 변경사 배송처 초기화
    if(id == "clientCd"){
      setFormData(prev => ({...prev,["storeCd"]: ''}));
      fnSearchstore({"clientCd" : value});
    }
  };

  //화면 로드시 1번만 실행
  useEffect(() => {
    //초기로딩
    if(props.obNo != ''){
      formData.modFlag = "I";
    }else{
      formData.modFlag = "U";
    }

    //배송처콤보가 있으면, 실행하지 않음
    if(storeCmb.length > 0) return;

    //초기설정들
    if(dcCmb.length == 0) fnSearchDc();
    if(clientCmb.length == 0) fnSearchClient();

    //공통코드 콤보
    if(ynCmb.length == 0) setYnCmb(getCodesCmbByGroupCode('YN'));
    if(useYnCmb.length == 0) setUseYnCmb(getCodesCmbByGroupCode('USE_YN'));
    if(obGbnCdCmb.length == 0) setobGbnCdCmb(getCodesCmbByGroupCode('OB_GBN_CD'));
    if(obProgStCdCmb.length == 0) setobProgStCdCmb(getCodesCmbByGroupCode('OB_PROG_ST_CD'));
    if(itemStCdCmb.length == 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

    //고객사선택시, 배송처 콤보 조회
    if(clientCmb.length > 0 && formData.clientCd != '') fnSearchstore({"clientCd" : formData.clientCd});
  }, [dcCmb, clientCmb, useYnCmb, obGbnCdCmb, obProgStCdCmb, storeCmb, itemStCdCmb, dataList]);

  //물류창고 조회
  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcCmbList`, null, {})
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  //고객사 콤보 조회
  const fnSearchClient = async () => {
    await client.post(`${PRO_URL}/selectClientCmbList`, null, {})
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  //배송처 콤보 조회
  const fnSearchstore = async (data) => {
    console.log(data)
    await client.post(`${PRO_URL}/selectStoreCmbList`, data, {})
      .then(res => {
        setStoreCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  const handleSubmit = (key) => {
    const modalInfo = modals[key];
    if (modalInfo.callback) {
        const result = modalInfo.callback(modalInfo.data);
        if (result == false) return;
    }

    if(formData.dcCd == ''){
      openModal('', 'I', '물류센터 를 선택해주세요.');
      return;
    }
    if(formData.clientCd == ''){
      openModal('', 'I', '고객사 를 선택해주세요.');
      return;
    }
    if(formData.storeCd == ''){
      openModal('', 'I', '배송처 를 선택해주세요.');
      return;
    }
    if(formData.obPlanYmd == ''){
      openModal('', 'I', '출고예정일 을 입력해주세요.');
      return;
    }
    
    openModal('', '',  '저장 하시겠습니까?', 
      () => {

        formData.data = getModalData(key).data;
        // console.log(formData.data, dataList)
        // var rowss = dataList.filter(row => {return formData.data.includes(row.id)});
        // console.log(rowss);
        if(formData.data.length == 0){
          openModal('', 'I', '상품을 선택해주세요');
          return;
        }

        //로케이션 저장
        client.post(`${PRO_URL}/saveOutboundPlan`,formData, {})
          .then(res => {
            openModal('', 'I', '저장 되었습니다.');
            closeModal(key);
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  };

  //입력값 검증
  const validateInput = (id, value) => {
    if(id === 'dcCd' || id === 'areaCd' || id === 'zoneCd') return '';


    return '';
  };

  //신규클릭
  //출고예정팝업 상세추가
  function onClickAdd(){
    if(formData.clientCd == ''){
      openModal('', 'A', "고객사를 먼저 선택해주세요", );
      return;
    }

    openModal('FIND_OUTBOUND_ITEM', '상품 찾기', <OutboundPlanItemPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
  }

  //상품 찾기 팝업 콜백함수
  const handleItemUpdate = (data) => {
    if(data != undefined && data.length > 0){
      const newDataList = gvDataGridAddRowAndStatus(dataList, data, {
        obProgStCd: '10',
        itemStCd: '10',
        planQty: 0,
        planTotQty: 0,
        planBoxQty: 0,
        planEaQty: 0,
        useYn: 'Y'
      });

      // 한 번에 상태 업데이트
      setDataList(newDataList);
      return;
    }
  };

  //출고예정팝업 삭제
  function onClickDel(){
    // openModal('INBOUND_PLAN_POP', '출고예정 팝업', <InboundPlanPop />, handleInboundPlanUpdate, '1200px', '750px');
  }

  //그리드 체크박스 선택
  function onChangeChks(chkRows) {
    updateModalData(key, { ...getModalData(key), 'data':chkRows });
  }


  const handleEditCellChangeCommitted = React.useCallback(

    //가로, 세로, 높이 수정시 체적 계산
    ({ id, field, value }) => {
      
      if (['planBoxQty', 'planEaQty'].includes(field)) {
        const updatedRows = dataList.map((row) => {
          if (row.id === id) {
            const newFieldValues = {
              ...row,
              [field]: Number(value),
            };
            // Calculate new volume
            newFieldValues.planTotQty = newFieldValues.planBoxQty * newFieldValues.pkqty + newFieldValues.planEaQty;
            newFieldValues.planQty = newFieldValues.planBoxQty * newFieldValues.pkqty + newFieldValues.planEaQty;
            return newFieldValues;
          }
          return row;
        });
        setDataList(updatedRows);
      }

    },
    [dataList],
  );

  return (
    <>
      <DialogContent>
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="obNo"
              name={fieldLabels["obNo"]}
              value={formData.obNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
              readonly
              maxLength={12}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="dcCd"
              name={fieldLabels["dcCd"]}
              formData={formData}
              errors={errors}
              list={dcCmb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="clientCd"
              name={fieldLabels["clientCd"]}
              formData={formData}
              errors={errors}
              list={clientCmb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="obGbnCd"
              name={fieldLabels["obGbnCd"]}
              formData={formData}
              errors={errors}
              list={obGbnCdCmb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="obProgStCd"
              name={fieldLabels["obProgStCd"]}
              formData={formData}
              errors={errors}
              list={obProgStCdCmb}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate 
              id="obPlanYmd"
              name={fieldLabels["obPlanYmd"]}
              selected={formData.obPlanYmd}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <FrmDate 
              id="obYmd"
              name={fieldLabels["obYmd"]}
              selected={formData.obYmd}
              onChange={handleChange}
              readonly
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="poNo"
              name={fieldLabels["poNo"]}
              value={formData.poNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
              readonly
              maxLength={12}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate 
              id="poYmd"
              name={fieldLabels["poYmd"]}
              selected={formData.poYmd}
              onChange={handleChange}
            />
          </Grid> */}
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="storeCd"
              name={fieldLabels["storeCd"]}
              formData={formData}
              errors={errors}
              list={storeCmb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="carNo"
              name={fieldLabels["carNo"]}
              value={formData.carNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="tcObNo"
              name={fieldLabels["tcObNo"]}
              value={formData.tcObNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol1"
              name={fieldLabels["userCol1"]}
              value={formData.userCol1}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol2"
              name={fieldLabels["userCol2"]}
              value={formData.userCol2}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol3"
              name={fieldLabels["userCol3"]}
              value={formData.userCol3}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol4"
              name={fieldLabels["userCol4"]}
              value={formData.userCol4}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol5"
              name={fieldLabels["userCol5"]}
              value={formData.userCol5}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid> */}
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="remark"
              name={fieldLabels["remark"]}
              value={formData.remark}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="useYn"
              name={fieldLabels["useYn"]}
              formData={formData}
              errors={errors}
              list={useYnCmb}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <ComDeGrid 
          onClickAdd={onClickAdd}
          onClickDel={onClickDel}
          dataList={dataList}
          columns={columns}
          //Event
          onRowClick={(params)=>{setSelRowId(params.id)}}
          onCellEditCommit={handleEditCellChangeCommitted} //쎌변경시 데이터변경

          //Multi
          type={"multi"}
          onChangeChks={onChangeChks}
        /> 
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(key)}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}
