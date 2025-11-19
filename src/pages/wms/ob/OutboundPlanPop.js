import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Button, DialogActions, DialogContent } from '@mui/material';

// Common
import { client } from '../../../contraints.js';
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

// Popup
import OutboundPlanItemPop from "./OuboundPlanItemPop.js";

// 필드 라벨 정의
const fieldLabels = {
  obNo: '출고번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  obGbnCd: '출고구분',
  obProgStCd: '출고진행상태',
  obPlanYmd: '출고예정일',
  storeCd: '배송처',
  remark: '비고',
  useYn: '사용여부',
};

export default function OutboundPlanPop(props) {
  const key = 'OUTBOUND_PLAN_POP'; // 모달 키값
  const PRO_URL = '/wms/ob/outboundPlan'; // API URL
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { getCodesCmbByGroupCode } = useCommonData();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    obNo: '',
    dcCd: '',
    clientCd: '',
    obGbnCd: '12',
    obProgStCd: '10',
    obPlanYmd: gvGetToday(),
    storeCd: '',
    carNo: '',
    remark: '',
    useYn: 'Y',
  });

  var gChkRows = [];

  // 그리드 및 콤보박스 상태
  const [selRowId, setSelRowId] = useState(); //그리드 선택된 행
  const [dataList, setDataList] = useState([]);

  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [clientCmb, setClientCmb] = useState([]); //고객사콤보
  const [storeCmb, setStoreCmb] = useState([]); //배송처콤보 
  const [obGbnCdCmb, setObGbnCdCmb] = useState([]); //출고구분콤보
  const [obProgStCdCmb, setObProgStCdCmb] = useState([]); //출고진행상태콤보 
  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부콤보 
  const [ynCmb, setYnCmb] = useState([]); //여부콤보
  const [itemStCdCmb, setItemStCdCmb] = useState([]); //상품상태콤보


  //출고전표컬럼
  const columns = [
    // { field: "modFlag",           headerName: "",             editable:false, align:"center", width:20},
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},

    // { field: "obNo",              headerName: "출고번호",         editable: false, align:"left", width:120},
    { field: "obDetailSeq",       headerName: "출고상세순번",       editable: false, align:"left", width:120},
    { field: "obProgStCd",        headerName: "출고진행상태코드",   
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: obProgStCdCmb,
    },
    { field: "itemCd",            headerName: "상품코드",   editable: false,  align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",   editable: false,    align:"left", width:300},
    { field: "itemStCd",          headerName: "상품상태코드",   editable: false, 
      align:"center", type: "singleSelect", valueOptions: itemStCdCmb,
      valueFormatter: gvGridDropdownDisLabel,
    },
    { field: "pkqty",             headerName: "입수",      editable: false,  align:"center", width:100,},
    { field: "planTotQty",        headerName: "예정(총)",   editable: false, align:"right", width:100},
    { field: "planBoxQty",        headerName: "예정(박스)",   editable: true, align:"right", width:100,
      preProcessEditCellProps: gvGridFieldNumberPreEdit,
      valueFormatter: gvGridFieldNumberFormatter,
      valueParser: gvGridFieldNumberParser
    },
    { field: "ibCost",            headerName: "입고단가",   editable: false, align:"left", width:100,
      valueFormatter: gvGridFieldNumberFormatter,
    },
    { field: "ibVat",             headerName: "입고VAT",   editable: false, align:"left", width:100,
      valueFormatter: gvGridFieldNumberFormatter,
    },
    { field: "ibAmt",             headerName: "입고금액",   editable: false, align:"left", width:100,
      valueFormatter: gvGridFieldNumberFormatter,
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

  // 초기 데이터 로드
  useEffect(() => {
    //초기로딩
    if(props.obNo != ''){
      formData.modFlag = "I";
    }else{
      formData.modFlag = "U";
    }

    //배송처콤보가 있으면, 실행하지 않음
    if(storeCmb.length > 0) return;
    
    // 물류창고, 고객사, 배송처 데이터 초기화
    if (dcCmb.length == 0) fnSearchDc();
    if (clientCmb.length == 0) fnSearchClient();

    //공통코드 콤보
    if (ynCmb.length == 0) setYnCmb(getCodesCmbByGroupCode('YN'));
    if (useYnCmb.length == 0) setUseYnCmb(getCodesCmbByGroupCode('USE_YN'));
    if (obGbnCdCmb.length == 0) setObGbnCdCmb(getCodesCmbByGroupCode('OB_GBN_CD'));
    if (obProgStCdCmb.length == 0) setObProgStCdCmb(getCodesCmbByGroupCode('OB_PROG_ST_CD'));
    if (itemStCdCmb.length == 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

    // 고객사 변경 시 배송처 초기화
    if(clientCmb.length > 0 && formData.clientCd != '') fnSearchStore({clientCd : formData.clientCd});
  }, [dcCmb, clientCmb, useYnCmb, obGbnCdCmb, obProgStCdCmb, storeCmb, itemStCdCmb, dataList]);


  // 입력값 변경 처리
  const handleChange = (value, id) => {
    const error = validateInput(id, value);

    setFormData(prev => ({...prev,[id]: value}));
    setErrors(prev => ({...prev,[id]: error}));

    //고객사 변경사 공급처 초기화
    if(id == "clientCd"){
      setFormData(prev => ({...prev,["storeCd"]: ''}));
      fnSearchStore({"clientCd" : value});
    }
  };

  // 물류창고 데이터 조회
  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcCmbList`, null, {})
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  };

  // 고객사 데이터 조회
  const fnSearchClient = async () => {
    await client.post(`${PRO_URL}/selectClientCmbList`, null, {})
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  };

  // 배송처 데이터 조회
  const fnSearchStore = async (data) => {
    await client.post(`${PRO_URL}/selectStoreCmbList`, data, {})
      .then(res => {
        setStoreCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  };

  // 데이터 저장 처리
  const handleSubmit = () => {
    const modalInfo = modals[key];
    if (modalInfo.callback) {
        const result = modalInfo.callback(modalInfo.data);
        if (result == false) return;
    }

    // 필수값 검증
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

    // 저장 요청
    openModal('', '', '저장 하시겠습니까?', 
      () => {
        formData.data = dataList;
        if(formData.data.length == 0){
          openModal('', 'I', '상품을 선택해주세요');
          return;
        }

        //출고예정 저장
        client.post(`${PRO_URL}/saveOutboundPlan`,formData, {})
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
  //출고예정팝업 상세추가
  function onClickAdd(){
    if(formData.clientCd == ''){
      openModal('', 'A', "고객사를 먼저 선택해주세요", );
      return;
    }

    openModal('FIND_OUTBOUND_ITEM', '상품 찾기', <OutboundPlanItemPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
  }


  // 상품 추가 처리
  const handleItemUpdate = (data) => {
    if (data && data.length > 0) {
      const updatedDataList = gvDataGridAddRowAndStatus(dataList, data, {
        obProgStCd: '10',
        itemStCd: '10',
        planQty : 0,
        planTotQty: 0,
        planBoxQty: 0,
        planEaQty: 0,
        useYn: 'Y',
      });
      setDataList(updatedDataList);
    }
  };


  //출고예정팝업 삭제
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
                id="obNo"
                label={fieldLabels["obNo"]}
                value={formData.obNo}
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
              id="obGbnCd"
              label={fieldLabels["obGbnCd"]}
              value={formData.obGbnCd}
              options={obGbnCdCmb}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="obProgStCd"
              label={fieldLabels["obProgStCd"]}
              value={formData.obProgStCd}
              options={obProgStCdCmb}
              errors={errors}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate
              id="obPlanYmd"
              label={fieldLabels["obPlanYmd"]}
              selected={formData.obPlanYmd}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="storeCd"
              label={fieldLabels["storeCd"]}
              value={formData.storeCd}
              options={storeCmb}
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

        {/* 데이터 그리드 */}
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
        <Button onClick={handleSubmit}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}
