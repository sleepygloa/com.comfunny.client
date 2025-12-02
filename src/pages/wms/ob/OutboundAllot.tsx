import React, { useState, useEffect, useCallback } from 'react';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// 컴포넌트 import
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { SchTextField, GridDateRenderField, SchDateField, FieldRow } from "../../../components/SearchBar/CmmnTextField";
import { PageTitle } from '../../../components/SearchBar/SearchBar';

// 공통 함수 import
import { client } from '../../../constraints'; // 오타 수정 contraints -> constraints
import { 
  gvGridFieldNumberFormatter, 
  gvGetRowDataListOfChk,
  gvGetToday
} from "../../../components/Common";

// 컨텍스트 및 모달 import
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// --- 인터페이스 정의 ---

interface OutboundAllotData {
  id: number;
  dcNm: string;
  clientNm: string;
  obNo: string;
  obGbnNm: string;
  obProgStNm: string;
  obPlanYmd: string;
  obYmd: string;
  storeNm: string;
  useYnNm: string;
  remark: string;
  [key: string]: any;
}

interface OutboundAllotDetailData {
  id: number;
  obDetailSeq: number;
  obProgStNm: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  pkqty: number;
  planTotQty: number;
  planBoxQty: number;
  allotTotQty: number;
  allotBoxQty: number;
  allotEaQty: number; // 계산 로직에 필요하므로 추가
  allotQty?: number;  // 계산 로직에 필요할 수 있음
  obCost: number;
  obAmt: number;
  makeLot: string;
  distExpiryYmd: string;
  useYnNm: string;
  remark: string;
  [key: string]: any;
}

interface SearchValues {
  obNo: string;
  obPlanYmd: string;
  [key: string]: any;
}

export default function OutboundAllot() {
  const menuTitle = '출고할당'; // 메뉴 타이틀 설정
  const PRO_URL = '/wms/ob/outboundAllot'; // API URL
  const { openModal } = useModal(); // 모달 컨텍스트 가져오기
  const { cmmnCdData } = useCommonData();

  // 상태 관리
  const [selRowId, setSelRowId] = useState<GridRowId | null>(null); // 선택된 메인 그리드 행 ID
  const [selDtlRowId, setSelDtlRowId] = useState<GridRowId | null>(null);

  const [dataList, setDataList] = useState<OutboundAllotData[]>([]); // 메인 그리드 데이터
  const [dataDtlList, setDataDtlList] = useState<OutboundAllotDetailData[]>([]); // 상세 그리드 데이터

  const [schValues, setSchValues] = useState<SearchValues>({ 
    obNo: "", 
    obPlanYmd: gvGetToday() 
  }); // 검색 조건
  
  // 선택된 상세 데이터 체크 상태
  const [dtlChkRows, setDtlChkRows] = useState<GridRowId[]>([]);

  // 메인 그리드 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id",        headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "dcNm",      headerName: "물류창고", editable: false, align: "left", width: 120 },
    { field: "clientNm",  headerName: "회원사", editable: false, align: "left", width: 120 },
    { field: "obNo",      headerName: "출고번호", editable: false, align: "left", width: 150 },
    { field: "obGbnNm",   headerName: "출고구분", editable: false, align: "left", width: 120 },
    { field: "obProgStNm", headerName: "출고진행상태", editable: false, align: "left", width: 100 },
    { 
      field: "obPlanYmd", headerName: "출고예정일자", editable: false, align: "left", width: 150, 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { 
      field: "obYmd",     headerName: "출고일자", editable: false, align: "left", width: 150, 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { field: "storeNm",   headerName: "배송처", editable: false, align: "left", width: 250 },
    { field: "useYnNm",   headerName: "사용여부", editable: false, align: "left", width: 100 },
    { field: "remark",    headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  // 상세 그리드 컬럼 정의
  const columnsDtl: GridColDef[] = [
    { field: "id",          headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "obDetailSeq", headerName: "순번", editable: false, align: "right", width: 60 },
    { field: "obProgStNm",  headerName: "진행상태", editable: false, align: "left", width: 100 },
    { field: "itemCd",      headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm",      headerName: "상품명", editable: false, align: "left", width: 250 },
    { field: "itemStNm",    headerName: "상품상태", editable: false, align: "left", width: 100 },
    { 
      field: "pkqty",       headerName: "입수", editable: false, align: "center", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "planTotQty",  headerName: "예정(총)", editable: false, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "planBoxQty",  headerName: "예정(박스)", editable: false, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "allotTotQty", headerName: "할당(총)", editable: false, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "allotBoxQty", headerName: "할당(박스)", editable: true, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { 
      field: "obCost",      headerName: "출고단가", editable: false, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params)
    },
    { 
      field: "obAmt",       headerName: "출고금액", editable: false, align: "right", width: 100, 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) 
    },
    { field: "makeLot",     headerName: "제조LOT", editable: false, align: "left", width: 150 },
    { 
      field: "distExpiryYmd", headerName: "유통기한일자", editable: false, align: "left", width: 150, 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> 
    },
    { field: "useYnNm",     headerName: "사용여부", editable: false, align: "left", width: 100 },
    { field: "remark",      headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  // 검색 조건 변경 핸들러
  const onChangeSearch = (value: any, id?: string) => {
    if (id) {
        setSchValues((prev) => ({ ...prev, [id]: value }));
    }
  };

  // 검색 실행
  const fnSearch = () => {
    const data = { 
      obNo: schValues.obNo, 
      obPlanYmd: schValues.obPlanYmd 
    };
    client.post(`${PRO_URL}/selectOutboundAllotList`, data)
      .then((res) => {
        const list: OutboundAllotData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
          setSelRowId(list[0].id);
          fnSearchDtl(list[0]);
        } else {
            setDataDtlList([]);
        }
      })
      .catch((error) => {
        console.error('조회 중 에러:', error);
      });
  };

  // 상세 조회
  const fnSearchDtl = (rowData: OutboundAllotData) => {
    client.post(`${PRO_URL}/selectOutboundAllotDetailList`, rowData)
      .then((res) => {
        setDataDtlList(res.data);
      })
      .catch((error) => {
        console.error('상세 조회 중 에러:', error);
      });
  };

  // 할당 완료
  const onClickAllotCompl = () => {
    const rowData = dataList.find(row => row.id === selRowId);
    if (!rowData) return;

    openModal('', '', '출고할당을 완료하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveAllotCompt`, rowData)
        .then((res) => {
          if(res.data.stsCd && res.data.stsCd !== 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }

          openModal('', 'I', '출고할당이 완료되었습니다.');
          fnSearch();
        })
        .catch((error) => {
          console.error('할당 완료 중 에러:', error);
        });
    });
  };

  // 출고할당취소 클릭
  const onClickAllotComplCncl = () => {
    const rowData = dataList.find(row => row.id === selRowId);
    if (!rowData) return;

    openModal('', '',  '출고할당취소 하시겠습니까?', 
      () => {
        client.post(`${PRO_URL}/saveAllotComptCncl`, rowData)
          .then((res) => {
            if(res.data.stsCd && res.data.stsCd !== 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '출고할당취소 되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  // 할당 클릭 (상세)
  const onClickItemAllot = () => {
    const data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows);
    if (data.length === 0) {
        openModal('', 'A', '선택된 데이터가 없습니다.');
        return;
    }

    openModal('', '',  '할당 하시겠습니까?', 
      () => {
        client.post(`${PRO_URL}/saveAllotByItem`, {data:data})
          .then((res) => {
            if(res.data.stsCd && res.data.stsCd !== 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '할당 되었습니다.');
            const currentRow = dataList.find(row => row.id === selRowId);
            if(currentRow) fnSearchDtl(currentRow);
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  // 할당취소 클릭 (상세)
  const onClickItemAllotCncl = () => {
    const data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows);
    if (data.length === 0) {
        openModal('', 'A', '선택된 데이터가 없습니다.');
        return;
    }

    openModal('', '',  '할당취소 하시겠습니까?', 
      () => {
        client.post(`${PRO_URL}/saveAllotCnclByItem`, {data:data})
          .then((res) => {
            if(res.data.stsCd && res.data.stsCd !== 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '할당취소 되었습니다.');
            const currentRow = dataList.find(row => row.id === selRowId);
            if(currentRow) fnSearchDtl(currentRow);
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  // 셀 수정 커밋 핸들러
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: { id: GridRowId, field: string, value: any }) => {
      if (['allotBoxQty', 'allotEaQty'].includes(field)) {
        const updatedRows = dataDtlList.map((row) => {
          if (row.id === id) {
            const numValue = Number(value);
            const pkqty = row.pkqty || 0;
            const currentBoxQty = field === 'allotBoxQty' ? numValue : (row.allotBoxQty || 0);
            const currentEaQty = field === 'allotEaQty' ? numValue : (row.allotEaQty || 0);
            
            const totalQty = (currentBoxQty * pkqty) + currentEaQty;

            const newFieldValues = {
              ...row,
              [field]: numValue,
              allotTotQty: totalQty,
              allotQty: totalQty,
            };
            return newFieldValues;
          }
          return row;
        });
        setDataDtlList(updatedRows);
      }
    },
    [dataDtlList],
  );

  return (
    <>
      <PageTitle title={menuTitle} />
      {/* 메인 그리드 */}
      <ComDeGrid
        onClickSelect={fnSearch}
        onClickCustom1={onClickAllotCompl}
        onClickCustomNm1="할당완료"
        onClickCustom2={onClickAllotComplCncl}
        onClickCustomNm2={'할당완료취소'}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="obNo" label="출고번호/명" onChange={onChangeSearch} />
            <SchDateField id="obPlanYmd" label="출고예정일" selected={schValues.obPlanYmd} onChange={onChangeSearch} />
          </FieldRow>
        }

        height={'250px'}
        title={"Outbound List"}
        dataList={dataList}
        columns={columns}
        onRowClick={(params) => { 
            setSelRowId(params.id); 
            fnSearchDtl(params.row as OutboundAllotData);
        }}
        type={"single"}
      />

      {/* 상세 그리드 */}
      <ComDeGrid
        onClickCustom1={onClickItemAllot}
        onClickCustomNm1={'할당'}
        onClickCustom2={onClickItemAllotCncl}
        onClickCustomNm2={'할당취소'}
        
        title={"Outbound Detail List"}
        dataList={dataDtlList}
        columns={columnsDtl}
        onRowClick={(params) => setSelDtlRowId(params.id)}
        onCellEditCommit={handleEditCellChangeCommitted}
        type={"multi"}
        onChangeChks={(chkRows) => setDtlChkRows(chkRows.map(item => item.id))}
      />
    </>
  );
}