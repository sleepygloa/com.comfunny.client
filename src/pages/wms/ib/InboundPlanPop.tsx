import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Button, DialogActions, DialogContent, SelectChangeEvent } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

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
  FrmDate, 
  GridDateRenderField, 
  GridDateSetField, 
  GridNumberSetField 
} from '../../../components/SearchBar/CmmnTextField';

// Popup
// InboundPlanItemPop 컴포넌트가 있다고 가정 (없다면 주석 처리하거나 더미 생성 필요)
// import InboundPlanItemPop from "./InboundPlanItemPop"; 

// --- 인터페이스 정의 ---

// 필드 라벨 타입
const fieldLabels: { [key: string]: string } = {
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

// 폼 데이터 인터페이스
interface InboundPlanFormData {
  ibNo: string;
  dcCd: string;
  clientCd: string;
  ibGbnCd: string;
  ibProgStCd: string;
  ibPlanYmd: string;
  ibYmd: string;
  poNo: string;
  poYmd: string;
  supplierCd: string;
  carNo: string;
  tcObNo: string;
  userCol1: string;
  userCol2: string;
  userCol3: string;
  userCol4: string;
  userCol5: string;
  remark: string;
  useYn: string;
  modFlag?: string; // 추가된 속성
  data?: any[]; // 저장 시 사용될 상세 데이터
  [key: string]: any;
}

// 상세 데이터 인터페이스
interface InboundPlanDetailData {
  id: number;
  ibNo?: string;
  ibDetailSeq?: number;
  ibProgStCd: string;
  itemCd?: string;
  itemNm?: string;
  itemStCd: string;
  pkqty?: number;
  planTotQty: number;
  planBoxQty: number;
  planEaQty: number; // 주석 해제하여 사용
  planQty: number; // planQty도 필요함 (계산 로직)
  ibCost?: number;
  ibVat?: number;
  ibAmt?: number;
  makeLot?: string;
  makeYmd?: string;
  distExpiryYmd?: string;
  useYn: string;
  remark?: string;
  [key: string]: any;
}

// Props 인터페이스
interface InboundPlanPopProps {
  ibNo?: string; // 부모 컴포넌트에서 전달받을 수 있음
}

export default function InboundPlanPop(props: InboundPlanPopProps) {
  const key = 'INBOUND_PLAN_POP';
  const PRO_URL = '/wms/ib/inboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const [formData, setFormData] = useState<InboundPlanFormData>({
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

  // gChkRows는 렌더링과 무관한 변수이므로 useRef 사용 권장하지만, 원본 로직 유지
  // var gChkRows = []; 
  
  const [selRowId, setSelRowId] = useState<GridRowId>(-1); // 그리드 선택된 행
  const [dataList, setDataList] = useState<InboundPlanDetailData[]>([]); // 그리드 데이터셋

  // 콤보박스 상태
  const [dcCmb, setDcCmb] = useState<any[]>([]); // 물류센터콤보
  const [clientCmb, setClientCmb] = useState<any[]>([]); // 고객사콤보
  const [supplierCmb, setSupplierCmb] = useState<any[]>([]); // 공급처콤보
  const [ibGbnCdCmb, setIbGbnCdCmb] = useState<any[]>([]); // 입고구분코드콤보 
  const [ibProgStCdCmb, setIbProgStCdCmb] = useState<any[]>([]); // 입고진행상태콤보
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]); // 사용여부콤보
  const [ynCmb, setYnCmb] = useState<any[]>([]); // 여부콤보
  const [itemStCdCmb, setItemStCdCmb] = useState<any[]>([]); // 상품상태콤보

  // 입고전표 컬럼
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "ibNo", headerName: "입고번호", editable: false, align: "left", width: 120 },
    { field: "ibDetailSeq", headerName: "입고상세순번", editable: false, align: "left", width: 120 },
    { 
      field: "ibProgStCd", headerName: "입고진행상태코드", align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: ibProgStCdCmb 
    },
    { field: "itemCd", headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm", headerName: "상품명", editable: false, align: "left", width: 300 },
    { 
      field: "itemStCd", headerName: "상품상태코드", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: itemStCdCmb 
    },
    { field: "pkqty", headerName: "입수", editable: false, align: "center", width: 100 },
    { field: "planTotQty", headerName: "예정(총)", editable: false, align: "right", width: 100 },
    { 
      field: "planBoxQty", headerName: "예정(박스)", editable: true, align: "right", width: 100,
      // [타입 호환성 해결] any 캐스팅
      preProcessEditCellProps: gvGridFieldNumberPreEdit as any,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params),
      valueParser: (value: any) => gvGridFieldNumberParser(value)
    },
    // { field: "planEaQty", headerName: "예정(낱개)", editable: false, align: "right", width: 100, ... },
    { 
      field: "ibCost", headerName: "입고단가", editable: false, align: "left", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params)
    },
    { 
      field: "ibVat", headerName: "입고VAT", editable: false, align: "left", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params)
    },
    { 
      field: "ibAmt", headerName: "입고금액", editable: false, align: "left", width: 100,
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params)
    },
    { 
      field: "makeLot", headerName: "제조LOT", editable: true, align: "left", width: 100,
      valueSetter: (params) => { return GridNumberSetField(params, 'makeLot'); }, // GridNumberSetField 인자 수정
    },
    { 
      field: "makeYmd", headerName: "제조일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => { return GridDateSetField(params, 'makeYmd'); },
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { 
      field: "distExpiryYmd", headerName: "유통기한일자", editable: true, align: "left", width: 150,
      valueSetter: (params) => { return GridDateSetField(params, 'distExpiryYmd'); },
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} />,
    },
    { 
      field: "useYn", headerName: "사용여부", editable: false, align: "center", 
      type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb 
    },
    { field: "remark", headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  // 화면 로드시 1번만 실행
  useEffect(() => {
    // 초기로딩
    if (props.ibNo && props.ibNo !== '') {
      setFormData(prev => ({ ...prev, modFlag: "I" }));
    } else {
      setFormData(prev => ({ ...prev, modFlag: "U" }));
    }
    
    // 공급처 콤보가 있으면 실행하지 않음 (의존성 배열 관리 필요)
    if (supplierCmb.length > 0) return;

    // 초기설정들
    if (dcCmb.length === 0) fnSearchDc();
    if (clientCmb.length === 0) fnSearchClient();

    // 공통코드 콤보
    if (ynCmb.length === 0) setYnCmb(getCodesCmbByGroupCode('YN'));
    if (useYnCmb.length === 0) setUseYnCmb(getCodesCmbByGroupCode('USE_YN'));
    if (ibGbnCdCmb.length === 0) setIbGbnCdCmb(getCodesCmbByGroupCode('IB_GBN_CD'));
    if (ibProgStCdCmb.length === 0) setIbProgStCdCmb(getCodesCmbByGroupCode('IB_PROG_ST_CD'));
    if (itemStCdCmb.length === 0) setItemStCdCmb(getCodesCmbByGroupCode('ITEM_ST_CD'));

    // 고객사 선택시, 공급처 콤보 조회
    if (clientCmb.length > 0 && formData.clientCd !== '') {
        fnSearchSupplier({ "clientCd": formData.clientCd });
    }
  }, [dcCmb, clientCmb, useYnCmb, ibGbnCdCmb, ibProgStCdCmb, supplierCmb, itemStCdCmb, props.ibNo, formData.clientCd]);

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

    // 고객사 변경시 공급처 초기화 및 조회
    if (id === "clientCd") {
      setFormData(prev => ({ ...prev, ["supplierCd"]: '' }));
      fnSearchSupplier({ "clientCd": value });
    }
  };

  // 물류창고 조회
  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcCmbList`, null)
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }
  
  // 고객사 콤보 조회
  const fnSearchClient = async () => {
    await client.post(`${PRO_URL}/selectClientCmbList`, null)
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }
  
  // 공급처 콤보 조회
  const fnSearchSupplier = async (data: any) => {
    await client.post(`${PRO_URL}/selectSupplierCmbList`, data)
      .then(res => {
        setSupplierCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }

  // 저장
  const handleSubmit = (key: string) => {
    if (modals && modals[key]) {
        const modalInfo = modals[key];
        if (modalInfo.callback) {
            // 콜백에 현재 상태 전달 가능
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
    if (formData.supplierCd === '') {
      openModal('', 'I', '공급처 를 선택해주세요.');
      return;
    }
    if (formData.ibPlanYmd === '') {
      openModal('', 'I', '입고예정일 을 입력해주세요.');
      return;
    }
    
    openModal('', '', '저장 하시겠습니까?', 
      () => {
        // 복사본 생성하여 데이터 할당
        const submitData = { ...formData };
        submitData.data = dataList;

        if (submitData.data.length === 0) {
          openModal('', 'I', '상품을 선택해주세요');
          return;
        }

        // 입고예정 저장
        client.post(`${PRO_URL}/saveInboundPlan`, submitData)
          .then(res => {
            if (res.data.stsCd !== 200) {
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

  // 신규 클릭 (입고예정팝업 상세추가)
  function onClickAdd() {
    if (formData.clientCd === '') {
      openModal('', 'A', "고객사를 먼저 선택해주세요");
      return;
    }

    // InboundPlanItemPop 컴포넌트가 필요함.
    // openModal('FIND_INBOUND_ITEM', '상품 찾기', <InboundPlanItemPop formData={formData}/>, handleItemUpdate, '1000px', '600px');
    alert("상품 찾기 팝업 준비 중입니다.");
  }

  // 삭제 클릭
  function onClickDel() {
    // 삭제 로직 구현 필요
  }

  // 그리드 체크박스 선택
  function onChangeChks(chkRows: any[]) {
    // 모달 데이터 업데이트 (필요시)
    if (updateModalData && getModalData) {
        updateModalData(key, { ...getModalData(key), 'data': chkRows });
    }
    // gChkRows = chkRows; // 지역 변수 대신 상태 관리 권장
  }
  
  // 셀 수정 후 업데이트 처리
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: { id: GridRowId, field: string, value: any }) => {
      console.log(id, field, value, dataList)
      if (['planBoxQty', 'planEaQty'].includes(field)) {
        const updatedRows = dataList.map((row) => {
          if (row.id === id) {
            const numValue = Number(value);
            const pkqty = row.pkqty || 0;
            const currentBoxQty = field === 'planBoxQty' ? numValue : (row.planBoxQty || 0);
            const currentEaQty = field === 'planEaQty' ? numValue : (row.planEaQty || 0);
            
            const totalQty = (currentBoxQty * pkqty) + currentEaQty;

            const updatedRow = {
              ...row,
              [field]: numValue,
              planTotQty: totalQty,
              planQty: totalQty,
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
              // errors={errors} // 타입 정의 필요시 수정
              onChange={handleChange}
              readonly
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
              id="ibGbnCd"
              label={fieldLabels["ibGbnCd"]}
              value={formData.ibGbnCd}
              options={ibGbnCdCmb}
              // errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="ibProgStCd"
              label={fieldLabels["ibProgStCd"]}
              value={formData.ibProgStCd}
              options={ibProgStCdCmb}
              // errors={errors}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate
              label={fieldLabels["ibPlanYmd"]}
              selected={formData.ibPlanYmd}
              onChange={(val) => handleChange(val, "ibPlanYmd")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="supplierCd"
              label={fieldLabels["supplierCd"]}
              value={formData.supplierCd}
              options={supplierCmb}
              // errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField
              id="carNo"
              label={fieldLabels["carNo"]}
              value={formData.carNo}
              // errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField
              id="remark"
              label={fieldLabels["remark"]}
              value={formData.remark}
              // errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect
              id="useYn"
              label={fieldLabels["useYn"]}
              value={formData.useYn}
              options={useYnCmb}
              // errors={errors}
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