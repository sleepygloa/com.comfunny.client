import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, TextField, Grid, IconButton, Typography, FormControl, useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';

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
import SearchIcon from '@mui/icons-material/Search';

import { FrmSelect, FrmTextField, FrmDate, GridDateRenderField, GridDateSetField, GridNumberSetField } from '../../../components/SearchBar/CmmnTextField.js';

//Popup
import StockMoveStockOfItemAndLocPop from "./StockMoveStockOfItemAndLocPop.js";
import StockMoveLocPop from "./StockMoveLocPop.js";
// import InboundPlanItemPop from "./InboundPlanItemPop.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  moveNo: '이동번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  moveGbnCd: '이동구분',
  workStCd: '이동진행상태',
  workYmd: '작업일자',
};


export default function StockMovePop(props) {
  const key = 'STOCK_MOVE_POP'
  const PRO_URL = '/wms/st/stockMove';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    moveNo: '',
    dcCd: '',
    clientCd: '',
    moveGbnCd: '30',
    workStCd: '10',
    workYmd: gvGetToday(),
  });

  var gChkRows = [];
  
  const [selRowId, setSelRowId] = useState(); //그리드 선택된 행
  const [dataList, setDataList] = useState([]); //그리드 데이터셋
  // 렌더링 트리거를 위한 상태

  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [clientCmb, setClientCmb] = useState([]); //고객사콤보
  const [moveGbnCdCmb, setmoveGbnCdCmb] = useState([]); //이동구분코드콤보 
  const [workStCdCmb, setworkStCdCmb] = useState([]); //이동진행상태콤보
  const [itemStCdCmb, setItemStCdCmb] = useState([]); //상품상태콤보
  //이동전표컬럼
  const columns = [
    // { field: "modFlag",           headerName: "",             editable:false, align:"center", width:20},
    { field: "id",                  headerName: "ID",             editable:false, align:"center", width:20},

    // { field: "moveNo",              headerName: "이동번호",         editable: false, align:"left", width:120},
    // { field: "moveDetailSeq",       headerName: "이동상세순번",       editable: false, align:"left", width:120},
    // { field: "workStCd",            headerName: "이동진행상태코드",   
    //   align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
    //   valueOptions: workStCdCmb,
    // },
    // { field: "zoneCd",              headerName: "존코드", width: 100 },
    { field: "zoneNm",              headerName: "존명", width: 100 },
    { field: "locCd",               headerName: "FR로케이션", width: 100 },
    { field: "toLocCd",             headerName: "TO로케이션", width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton onClick={() => handleLocSearch(params.row)}>
            <SearchIcon />
          </IconButton>
        </Box>
      ),
     },
    { field: "itemCd",              headerName: "상품코드",   editable: false,  align:"left", width:100},
    { field: "itemNm",              headerName: "상품명",   editable: false,    align:"left", width:200},
    { field: "itemStCd",            headerName: "상품상태코드",   editable: false, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: itemStCdCmb,
    },
    { field: "pkqty",               headerName: "입수",      editable: false,  align:"right", width:100,},
    { field: "stockQty",            headerName: "재고(총)",   editable: false, align:"right", width:100},
    { field: "stockBoxQty",         headerName: "재고(박스)",   editable: false, align:"right", width:100,
      preProcessEditCellProps: gvGridFieldNumberPreEdit,
      valueFormatter: gvGridFieldNumberFormatter,
      valueParser: gvGridFieldNumberParser
    },
    { field: "lotId",               headerName: "LOT_ID", width: 150 },
  ];



  //화면 로드시 1번만 실행
  useEffect(() => {
    //초기로딩
    if(props.moveNo != ''){
      formData.modFlag = "I";
    }else{
      formData.modFlag = "U";
    }

    //초기설정들
    if(dcCmb.length == 0) fnSearchDc();
    if(clientCmb.length == 0) fnSearchClient();

    //공통코드 콤보
    if(moveGbnCdCmb.length == 0) setmoveGbnCdCmb(getCodesCmbByGroupCode('MOVE_GBN_CD'));
    if(workStCdCmb.length == 0) setworkStCdCmb(getCodesCmbByGroupCode('WORK_ST_CD'));
    if(itemStCdCmb.length == 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

    //고객사선택시, 공급처 콤보 조회
    // if(clientCmb.length > 0 && formData.clientCd != '') fnSearchSupplier({"clientCd" : formData.clientCd});
  }, [dcCmb, clientCmb, moveGbnCdCmb, workStCdCmb, itemStCdCmb, dataList]);

  // 입력값 변경 이벤트
  const handleChange = (value, id) => {
    const error = validateInput(id, value);

    setFormData(prev => ({...prev,[id]: value}));
    setErrors(prev => ({...prev,[id]: error}));
  };

  //물류창고 조회
  const fnSearchDc = async () => {
    await client.post(`wms/ib/inboundPlan/selectDcCmbList`, null, {})
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  //고객사 콤보 조회
  const fnSearchClient = async () => {
    await client.post(`wms/ib/inboundPlan/selectClientCmbList`, null, {})
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
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
    if(formData.workYmd == ''){
      openModal('', 'I', '작업일자 을 입력해주세요.');
      return;
    }
    
    openModal('', '',  '저장 하시겠습니까?', 
      () => {
        formData.data = dataList;
        if(formData.data.length == 0){
          openModal('', 'I', '상품을 선택해주세요');
          return;
        }

        //이동지시 저장
        client.post(`${PRO_URL}/saveStockMove`,formData, {})
          .then(res => {
            if(res.data.stsCd != undefined && res.data.stsCd != 200){
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
  //이동지시팝업 상세추가
  function onClickAdd(){
    if(formData.clientCd == ''){
      openModal('', 'A', "고객사를 먼저 선택해주세요", );
      return;
    }

    openModal('FIND_STOCK_LOC_ITEM', '상품 찾기', <StockMoveStockOfItemAndLocPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
  }

  // 상품 찾기 팝업 콜백 함수
  const handleItemUpdate = (data) => {
    if (data && data.length > 0) {
      // 기존 dataListRef.current 데이터를 복사한 후 새 데이터를 추가
      const updatedDataList = gvDataGridAddRowAndStatus(dataList, data, {
        workStCd: '10',
        itemStCd: '10',
        instQty: data.stockQty,
        useYn: 'Y',
      });

      setDataList(updatedDataList);
    }
  };


  //이동지시팝업 삭제
  function onClickDel(){
    // openModal('INBOUND_PLAN_POP', '이동지시 팝업', <InboundPlanPop />, handleInboundPlanUpdate, '1200px', '750px');
  }

  //그리드 체크박스 선택
  function onChangeChks(chkRows) {
    updateModalData(key, { ...getModalData(key), 'data':chkRows });
    gChkRows = chkRows;
  }

  
  // 셀 수정 후 업데이트 처리
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
    },
    [dataList]
  );
    // Open location search popup
    const handleLocSearch = (row) => {
      openModal('FIND_TO_LOC', '로케이션 찾기', <StockMoveLocPop  />, (data) => {
        const updatedList = dataList.map((r) =>
          r.id === row.id ? { ...r, toLocCd: data.locCd } : r
        );
        setDataList(updatedList);
      }, '600px', '600px');
    };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
          <Grid item xs={12} sm={3}>
            <FrmTextField
              id="moveNo"
              label={fieldLabels["moveNo"]}
              value={formData.moveNo}
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
              id="moveGbnCd"
              label={fieldLabels["moveGbnCd"]}
              value={formData.moveGbnCd}
              options={moveGbnCdCmb}
              errors={errors}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="workStCd"
              label={fieldLabels["workStCd"]}
              value={formData.workStCd}
              options={workStCdCmb}
              errors={errors}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate
              id="workYmd"
              label={fieldLabels["workYmd"]}
              selected={formData.workYmd}
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
