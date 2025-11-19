import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, TextField, Grid, MenuItem, Select, InputLabel, FormControl, useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';

//Common
import {client} from '../../../contraints.js';
import { useModal } from "../../../context/ModalContext.js";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { 
  gvGridDropdownDisLabel, 
  gvSetDropdownData, 
  gvGetToday,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser , 
  gvDataGridAddRowAndStatus
} from "../../../components/Common.js";

import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

import { FrmSelect, FrmTextField, FrmDate, GridDateRenderField, GridDateSetField, GridNumberSetField } from '../../../components/SearchBar/CmmnTextField.js';

//Popup
import InboundPlanItemPop from "./InboundPlanItemPop.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  ibNo: '입고번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  ibGbnCd: '입고구분',
  ibProgStCd: '입고진행상태',
  ibPlanYmd: '입고예정일',
  ibYmd: '입고일',
  poNo: '발주번호',
  poYmd: '발주일자',
  supplierCd: '공급처',
  carNo: '차량번호',
  tcObNo: '이고출고번호',
  userCol1: '사용자컬럼1',
  userCol2: '사용자컬럼2',
  userCol3: '사용자컬럼3',
  userCol4: '사용자컬럼4',
  userCol5: '사용자컬럼5',
  remark: '비고',
  useYn: '사용여부',
};


export default function InboundPlanPop(props) {
  const key = 'INBOUND_PLAN_POP'
  const PRO_URL = '/wms/ib/inboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ibNo: '',
    dcCd: '',
    clientCd: '',
    ibGbnCd: '12',
    ibProgStCd: '10',
    ibPlanYmd: gvGetToday(),
    ibYmd: '',
    poNo: '',
    poYmd: '',
    supplierCd: '',
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
  // 렌더링 트리거를 위한 상태

  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [clientCmb, setClientCmb] = useState([]); //고객사콤보
  const [supplierCmb, setSupplierCmb] = useState([]); //공급처콤보
  const [ibGbnCdCmb, setIbGbnCdCmb] = useState([]); //입고구분코드콤보 
  const [ibProgStCdCmb, setIbProgStCdCmb] = useState([]); //입고진행상태콤보
  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부콤보
  const [ynCmb, setYnCmb] = useState([]); //여부콤보
  const [itemStCdCmb, setItemStCdCmb] = useState([]); //상품상태콤보
  //입고전표컬럼
  const columns = [
    // { field: "modFlag",           headerName: "",             editable:false, align:"center", width:20},
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},

    { field: "ibNo",              headerName: "입고번호",         editable: false, align:"left", width:120},
    { field: "ibDetailSeq",       headerName: "입고상세순번",       editable: false, align:"left", width:120},
    { field: "ibProgStCd",        headerName: "입고진행상태코드",   
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: ibProgStCdCmb,
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
    // { field: "planEaQty",           headerName: "예정(낱개)",   editable: false, align:"right", width:100,
    //   // preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
    //   valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    //   valueParser: (value) => gvGridFieldNumberParser(value)
    // },
    { field: "ibCost",            headerName: "입고단가",   editable: false, align:"left", width:100,
      // preProcessEditCellProps: (params) => gvGridFieldNumberPreEdit(params),
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
      // valueParser: (value) => gvGridFieldNumberParser(value)
    },
    { field: "ibVat",             headerName: "입고VAT",   editable: false, align:"left", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params.value),
    },
    { field: "ibAmt",             headerName: "입고금액",   editable: false, align:"left", width:100,
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



  //화면 로드시 1번만 실행
  useEffect(() => {
    //초기로딩
    if(props.ibNo != ''){
      formData.modFlag = "I";
    }else{
      formData.modFlag = "U";
    }
    //공급처콤보가 있으면, 실행하지 않음
    if(supplierCmb.length > 0) return;

    //초기설정들
    if(dcCmb.length == 0) fnSearchDc();
    if(clientCmb.length == 0) fnSearchClient();

    //공통코드 콤보
    if(ynCmb.length == 0) setYnCmb(getCodesCmbByGroupCode('YN'));
    if(useYnCmb.length == 0) setUseYnCmb(getCodesCmbByGroupCode('USE_YN'));
    if(ibGbnCdCmb.length == 0) setIbGbnCdCmb(getCodesCmbByGroupCode('IB_GBN_CD'));
    if(ibProgStCdCmb.length == 0) setIbProgStCdCmb(getCodesCmbByGroupCode('IB_PROG_ST_CD'));
    if(itemStCdCmb.length == 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

    //고객사선택시, 공급처 콤보 조회
    if(clientCmb.length > 0 && formData.clientCd != '') fnSearchSupplier({"clientCd" : formData.clientCd});
  }, [dcCmb, clientCmb, useYnCmb, ibGbnCdCmb, ibProgStCdCmb, supplierCmb, itemStCdCmb, dataList]);

  // 입력값 변경 이벤트
  const handleChange = (value, id) => {
    const error = validateInput(id, value);

    setFormData(prev => ({...prev,[id]: value}));
    setErrors(prev => ({...prev,[id]: error}));

    //고객사 변경사 공급처 초기화
    if(id == "clientCd"){
      setFormData(prev => ({...prev,["supplierCd"]: ''}));
      fnSearchSupplier({"clientCd" : value});
    }
  };

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
  //공급처 콤보 조회
  const fnSearchSupplier = async (data) => {
    await client.post(`${PRO_URL}/selectSupplierCmbList`, data, {})
      .then(res => {
        setSupplierCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

    //저장
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
    if(formData.supplierCd == ''){
      openModal('', 'I', '공급처 를 선택해주세요.');
      return;
    }
    if(formData.ibPlanYmd == ''){
      openModal('', 'I', '입고예정일 을 입력해주세요.');
      return;
    }
    
    openModal('', '',  '저장 하시겠습니까?', 
      () => {
        formData.data = dataList;
        if(formData.data.length == 0){
          openModal('', 'I', '상품을 선택해주세요');
          return;
        }

        //입고예정 저장
        client.post(`${PRO_URL}/saveInboundPlan`,formData, {})
          .then(res => {
            if(res.data.stsCd != 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
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
    return '';
  };

  //신규클릭
  //입고예정팝업 상세추가
  function onClickAdd(){
    if(formData.clientCd == ''){
      openModal('', 'A', "고객사를 먼저 선택해주세요", );
      return;
    }

    openModal('FIND_INBOUND_ITEM', '상품 찾기', <InboundPlanItemPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
  }

  // 상품 찾기 팝업 콜백 함수
  const handleItemUpdate = (data) => {
    if (data && data.length > 0) {
      // 기존 dataListRef.current 데이터를 복사한 후 새 데이터를 추가
      const updatedDataList = gvDataGridAddRowAndStatus(dataList, data, {
        ibProgStCd: '10',
        itemStCd: '10',
        planQty: 0,
        planTotQty: 0,
        planBoxQty: 0,
        planEaQty: 0,
        useYn: 'Y',
      });

      setDataList(updatedDataList);
    }
  };


  //입고예정팝업 삭제
  function onClickDel(){
    // openModal('INBOUND_PLAN_POP', '입고예정 팝업', <InboundPlanPop />, handleInboundPlanUpdate, '1200px', '750px');
  }

  //그리드 체크박스 선택
  function onChangeChks(chkRows) {
    updateModalData(key, { ...getModalData(key), 'data':chkRows });
    gChkRows = chkRows;
  }

  
  // 셀 수정 후 업데이트 처리
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
      console.log(id, field, value, dataList)
      if (['planBoxQty', 'planEaQty'].includes(field)) {
        const updatedRows = dataList.map((row) => {
          if (row.id === id) {
            const updatedRow = {
              ...row,
              [field]: Number(value),
              planTotQty: (field === 'planBoxQty' ? Number(value) : row.planBoxQty) * row.pkqty 
                        + (field === 'planEaQty' ? Number(value) : row.planEaQty),
              planQty: (field === 'planBoxQty' ? Number(value) : row.planBoxQty) * row.pkqty 
                        + (field === 'planEaQty' ? Number(value) : row.planEaQty),
            };
            return updatedRow;
          }
          return row;
        });
        setDataList(updatedRows);
      }
    },
    [dataList]
  );
  

  return (
    <>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
          <Grid item xs={12} sm={3}>
            <FrmTextField
              id="ibNo"
              label={fieldLabels["ibNo"]}
              value={formData.ibNo}
              errors={errors}
              // onChange={handleChange}
              readonly
              maxLength={12}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="dcCd"
              label={fieldLabels["dcCd"]}
              value={formData.dcCd}
              options={dcCmb}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="clientCd"
              label={fieldLabels["clientCd"]}
              value={formData.clientCd}
              options={clientCmb}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="ibGbnCd"
              label={fieldLabels["ibGbnCd"]}
              value={formData.ibGbnCd}
              options={ibGbnCdCmb}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="ibProgStCd"
              label={fieldLabels["ibProgStCd"]}
              value={formData.ibProgStCd}
              options={ibProgStCdCmb}
              errors={errors}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate
              id="ibPlanYmd"
              label={fieldLabels["ibPlanYmd"]}
              selected={formData.ibPlanYmd}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="supplierCd"
              label={fieldLabels["supplierCd"]}
              value={formData.supplierCd}
              options={supplierCmb}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField
              id="carNo"
              label={fieldLabels["carNo"]}
              value={formData.carNo}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField
              id="remark"
              label={fieldLabels["remark"]}
              value={formData.remark}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="useYn"
              label={fieldLabels["useYn"]}
              value={formData.useYn}
              options={useYnCmb}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <ComDeGrid
          onClickAdd={onClickAdd}
          onClickDel={onClickDel}
          dataList={dataList}
          columns={columns}
          onRowClick={(params) => { setSelRowId(params.id) }}
          onCellEditCommit={handleEditCellChangeCommitted}
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
