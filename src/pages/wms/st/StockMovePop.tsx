import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Button, DialogActions, DialogContent, Box, IconButton, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId, GridPreProcessEditCellProps } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

// Common
import { client } from '../../../constraints'; // 오타 수정: contraints -> constraints
import { useModal } from "../../../context/ModalContext";
import { useCommonData } from "../../../context/CommonDataContext";
import { 
  gvGridDropdownDisLabel, 
  gvSetDropdownData, 
  gvGetToday,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser, 
  gvDataGridAddRowAndStatus
} from "../../../components/Common";

import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

import { 
  FrmSelect, 
  FrmTextField, 
  FrmDate 
} from '../../../components/SearchBar/CmmnTextField';

// Popup
// StockMoveStockOfItemAndLocPop 컴포넌트가 있다고 가정
// import StockMoveStockOfItemAndLocPop from "./StockMoveStockOfItemAndLocPop";
import StockMoveLocPop from "./StockMoveLocPop";

// --- 인터페이스 정의 ---

// 필드 라벨 타입
const fieldLabels: { [key: string]: string } = {
  moveNo: '이동번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  moveGbnCd: '이동구분',
  workStCd: '이동진행상태',
  workYmd: '작업일자',
};

// 폼 데이터 인터페이스
interface StockMoveFormData {
  moveNo: string;
  dcCd: string;
  clientCd: string;
  moveGbnCd: string;
  workStCd: string;
  workYmd: string;
  modFlag?: string;
  data?: any[]; // 저장 시 사용될 상세 데이터
  [key: string]: any;
}

// 상세 데이터 인터페이스
interface StockMoveDetailData {
  id: number;
  moveNo?: string;
  moveDetailSeq?: number;
  workStCd?: string;
  zoneNm?: string;
  locCd?: string;
  toLocCd?: string;
  itemCd?: string;
  itemNm?: string;
  itemStCd?: string;
  pkqty?: number;
  stockQty?: number;
  stockBoxQty?: number;
  lotId?: string;
  instQty?: number; // handleItemUpdate에서 사용
  useYn?: string;
  [key: string]: any;
}

// Props 인터페이스
interface StockMovePopProps {
  moveNo?: string;
}

export default function StockMovePop(props: StockMovePopProps) {
  const key = 'STOCK_MOVE_POP';
  const PRO_URL = '/wms/st/stockMove';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { getCodesCmbByGroupCode } = useCommonData();
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<StockMoveFormData>({
    moveNo: '',
    dcCd: '',
    clientCd: '',
    moveGbnCd: '30',
    workStCd: '10',
    workYmd: gvGetToday(),
  });

  // gChkRows는 렌더링과 무관한 변수이므로 useRef 사용 권장하지만, 원본 로직 유지 (주석 처리)
  // var gChkRows = [];
  
  const [selRowId, setSelRowId] = useState<GridRowId>(-1); // 그리드 선택된 행
  const [dataList, setDataList] = useState<StockMoveDetailData[]>([]); // 그리드 데이터셋

  // 콤보박스 상태
  const [dcCmb, setDcCmb] = useState<any[]>([]); // 물류센터콤보
  const [clientCmb, setClientCmb] = useState<any[]>([]); // 고객사콤보
  const [moveGbnCdCmb, setmoveGbnCdCmb] = useState<any[]>([]); // 이동구분코드콤보 
  const [workStCdCmb, setworkStCdCmb] = useState<any[]>([]); // 이동진행상태콤보
  const [itemStCdCmb, setItemStCdCmb] = useState<any[]>([]); // 상품상태콤보

  // 이동전표 컬럼
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, align: "center", width: 20 },
    // { field: "moveNo", headerName: "이동번호", editable: false, align: "left", width: 120 },
    // { field: "moveDetailSeq", headerName: "이동상세순번", editable: false, align: "left", width: 120 },
    // { 
    //   field: "workStCd", headerName: "이동진행상태코드", align: "center", 
    //   type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: workStCdCmb,
    // },
    // { field: "zoneCd", headerName: "존코드", width: 100 },
    { field: "zoneNm", headerName: "존명", width: 100, align: "left" },
    { field: "locCd", headerName: "FR로케이션", width: 100, align: "left" },
    { 
      field: "toLocCd", headerName: "TO로케이션", width: 100, align: "left",
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton onClick={() => handleLocSearch(params.row)}>
            <SearchIcon />
          </IconButton>
        </Box>
      ),
    },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 200 },
    { 
      field: "itemStCd", headerName: "상품상태코드", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: itemStCdCmb,
    },
    { field: "pkqty", headerName: "입수", editable: false, align: "right", width: 100 },
    { field: "stockQty", headerName: "재고(총)", editable: false, align: "right", width: 100 },
    { 
      field: "stockBoxQty", headerName: "재고(박스)", editable: false, align: "right", width: 100,
      // [타입 호환성 해결] any 캐스팅
      preProcessEditCellProps: gvGridFieldNumberPreEdit as any,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
      valueParser: (value: any) => gvGridFieldNumberParser(value)
    },
    { field: "lotId", headerName: "LOT_ID", width: 150, align: "left" },
  ];

  // 초기 데이터 로드
  useEffect(() => {
    // 초기로딩
    if (props.moveNo && props.moveNo !== '') {
      setFormData(prev => ({ ...prev, modFlag: "I" }));
    } else {
      setFormData(prev => ({ ...prev, modFlag: "U" }));
    }

    // 초기설정들
    if (dcCmb.length === 0) fnSearchDc();
    if (clientCmb.length === 0) fnSearchClient();

    // 공통코드 콤보
    if (moveGbnCdCmb.length === 0) setmoveGbnCdCmb(getCodesCmbByGroupCode('MOVE_GBN_CD'));
    if (workStCdCmb.length === 0) setworkStCdCmb(getCodesCmbByGroupCode('WORK_ST_CD'));
    if (itemStCdCmb.length === 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

    // 고객사 선택시 (추가 로직 필요 시 구현)
  }, [dcCmb, clientCmb, moveGbnCdCmb, workStCdCmb, itemStCdCmb, props.moveNo, getCodesCmbByGroupCode]);

  // 입력값 검증
  const validateInput = (id: string, value: any) => {
    return '';
  };

  // 입력값 변경 이벤트
  const handleChange = (value: any, id?: string) => {
    if (!id) return;
    const error = validateInput(id, value);

    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: error }));
  };

  // 물류창고 조회
  const fnSearchDc = async () => {
    // URL 수정 필요할 수 있음 (기존 코드 유지)
    await client.post(`wms/ib/inboundPlan/selectDcCmbList`, null)
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }
  
  // 고객사 콤보 조회
  const fnSearchClient = async () => {
    // URL 수정 필요할 수 있음 (기존 코드 유지)
    await client.post(`wms/ib/inboundPlan/selectClientCmbList`, null)
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }

  // 저장
  const handleSubmit = (key: string) => {
    if (modals && modals[key]) {
        const modalInfo = modals[key];
        if (modalInfo.callback) {
            // const result = modalInfo.callback(modalInfo.data);
            // if (result === false) return;
        }
    }

    if (formData.dcCd === '') {
      openModal('', 'I', '물류센터 를 선택해주세요.');
      return;
    }
    if (formData.clientCd === '') {
      openModal('', 'I', '고객사 를 선택해주세요.');
      return;
    }
    if (formData.workYmd === '') {
      openModal('', 'I', '작업일자 을 입력해주세요.');
      return;
    }
    
    openModal('', '', '저장 하시겠습니까?', 
      () => {
        const submitData = { ...formData };
        submitData.data = dataList;

        if (submitData.data.length === 0) {
          openModal('', 'I', '상품을 선택해주세요');
          return;
        }

        // 이동지시 저장
        client.post(`${PRO_URL}/saveStockMove`, submitData)
          .then(res => {
            if (res.data.stsCd !== undefined && res.data.stsCd !== 200) {
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '저장 되었습니다.');
            closeModal(key);
          }).catch(error => { 
            console.log('error = ' + error); 
          })
      }
    );
  };

  // 상품 찾기 팝업 콜백 함수
  const handleItemUpdate = (data: any[]) => {
    if (data && data.length > 0) {
      // 기존 dataList 데이터를 복사한 후 새 데이터를 추가
      const updatedDataList = gvDataGridAddRowAndStatus(dataList, data, {
        workStCd: '10',
        itemStCd: '10',
        instQty: data[0].stockQty, // data[0]이 맞는지 확인 필요 (배열 처리 로직 확인)
        useYn: 'Y',
      });

      setDataList(updatedDataList);
    }
  };

  // 신규 클릭 (이동지시팝업 상세추가)
  function onClickAdd() {
    if (formData.clientCd === '') {
      openModal('', 'A', "고객사를 먼저 선택해주세요");
      return;
    }

    // StockMoveStockOfItemAndLocPop 컴포넌트 필요
    // openModal('FIND_STOCK_LOC_ITEM', '상품 찾기', <StockMoveStockOfItemAndLocPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
    alert("상품 찾기 팝업 준비 중입니다.");
  }

  // 이동지시팝업 삭제
  function onClickDel() {
    // 삭제 로직 구현 필요
  }

  // 그리드 체크박스 선택
  function onChangeChks(chkRows: any[]) {
    if (updateModalData && getModalData) {
        updateModalData(key, { ...getModalData(key), 'data': chkRows });
    }
  }
  
  // 셀 수정 후 업데이트 처리
  const handleEditCellChangeCommitted = useCallback(
    ({  }: { id: GridRowId, field: string, value: any }) => {
        // 현재는 로직 없음
    },
    [dataList]
  );

  // 로케이션 찾기 팝업
  const handleLocSearch = (row: any) => {
    openModal('FIND_TO_LOC', '로케이션 찾기', <StockMoveLocPop />, (data: any) => {
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
              // errors={errors}
              onChange={handleChange}
              readonly
              // maxLength={12}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="dcCd"
              label={fieldLabels["dcCd"]}
              value={formData.dcCd}
              options={dcCmb}
              // errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="clientCd"
              label={fieldLabels["clientCd"]}
              value={formData.clientCd}
              options={clientCmb}
              // errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="moveGbnCd"
              label={fieldLabels["moveGbnCd"]}
              value={formData.moveGbnCd}
              options={moveGbnCdCmb}
              // errors={errors}
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
              // errors={errors}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate
              label={fieldLabels["workYmd"]}
              selected={formData.workYmd}
              onChange={(val) => handleChange(val, "workYmd")}
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