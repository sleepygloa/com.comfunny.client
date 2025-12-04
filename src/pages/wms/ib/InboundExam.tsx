import React, { useState, useEffect, useCallback } from 'react';
import { Box } from "@mui/material"; // Box import 추가
import { GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';

// components
import PageTitle from "../../../components/PageTitle/PageTitle"; // PageTitle import 추가
import { SearchBar } from "../../../components/SearchBar/SearchBar"; // SearchBar import 추가
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { SchTextField, GridDateRenderField, SchDateField, FieldRow } from "../../../components/SearchBar/CmmnTextField";

// Common
import { client } from '../../../constraints';
import { 
  gvGridDropdownDisLabel, 
  gvGridFieldNumberFormatter, 
  gvGridFieldNumberPreEdit, 
  gvGridFieldNumberParser,
  gvGetRowDataListOfChk,
  gvGetToday
} from "../../../components/Common";

// CommonData
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// --- 인터페이스 정의 ---
interface InboundExamData {
  id: number;
  dcNm: string;
  ibNo: string;
  clientNm: string;
  ibGbnNm: string;
  ibProgStNm: string;
  ibPlanYmd: string;
  ibYmd: string;
  supplierNm: string;
  useYnNm: string;
  remark: string;
  [key: string]: any; 
}

interface InboundExamDetailData {
  id: number;
  ibDetailSeq: number;
  ibProgStNm: string;
  itemCd: string;
  itemNm: string;
  itemStNm: string;
  pkqty: number;
  planBoxQty: number;
  examBoxQty: number;
  examEaQty: number;
  examTotQty: number;
  ibAmt: number;
  remark: string;
  [key: string]: any; 
}

interface SearchValues {
  ibNo: string;
  ibPlanYmd: string;
  [key: string]: any;
}

export default function InboundExam() {
  const menuTitle = '입고검수';
  const PRO_URL = '/wms/ib/inboundExam';
  const { openModal } = useModal();
  useCommonData();

  // 선택된 행 ID 관리
  const [selRowId, setSelRowId] = useState<GridRowId>(-1);
  const [selDtlRowId, setSelDtlRowId] = useState<GridRowId>(-1);

  // 데이터 리스트 상태 관리
  const [dataList, setDataList] = useState<InboundExamData[]>([]);
  const [dataDtlList, setDataDtlList] = useState<InboundExamDetailData[]>([]);

  // 조회 조건 상태 관리
  const [schValues, setSchValues] = useState<SearchValues>({ 
    ibNo: "", 
    ibPlanYmd: gvGetToday()
  });

  // 선택된 상세 데이터 체크 상태 (GridRowId 배열)
  const [dtlChkRows, setDtlChkRows] = useState<GridRowId[]>([]);

  // 조회 조건 변경 핸들러
  const onChangeSearch = (value: any, id?: string) => {
    if (id) {
      setSchValues({ ...schValues, [id]: value });
    }
  };

  // Enter 키로 조회 실행
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fnSearch();
    }
  };

  // 조회 함수
  const fnSearch = () => {
    const data = {
      ibNo: schValues.ibNo,
      ibPlanYmd: schValues.ibPlanYmd,
    };
    client.post(`${PRO_URL}/selectInboundExamList`, data)
      .then(res => {
        const list: InboundExamData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
          setSelRowId(list[0].id);
          fnSearchDtl(list[0]);
        } else {
            setDataDtlList([]);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // 상세 조회 함수
  const fnSearchDtl = (rowData: InboundExamData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectInboundExamDetailList`, rowData)
      .then(res => {
        const list: InboundExamDetailData[] = res.data;
        setDataDtlList(list);
      })
      .catch(error => console.error('Error:', error));
  };

  // 검수 완료 버튼 클릭 핸들러
  const onClickExamCompl = () => {
    const rowData = dataList.find(row => row.id === selRowId);
    if (!rowData) return;

    openModal('', '', '검수완료 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveInboundExam`, rowData)
        .then((res) => {
          if(res.data.stsCd !== 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }
          openModal('', 'I', '검수완료 되었습니다.');
          fnSearch();
        })
        .catch(error => console.error('Error:', error));
    });
  };

  // 검수 취소 버튼 클릭 핸들러
  const onClickExamComplCncl = () => {
    const rowData = dataList.find(row => row.id === selRowId);
    if (!rowData) return;

    openModal('', '', '검수완료취소 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveInboundExamCncl`, rowData)
        .then((res) => {
          if(res.data.stsCd !== 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }
          openModal('', 'I', '검수완료취소 되었습니다.');
          fnSearch();
        })
        .catch(error => console.error('Error:', error));
    });
  };

  // 검수 버튼 클릭 핸들러 (상세)
  const onClickDtlExamCompl = () => {
    const data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows);
    
    if (data.length === 0) {
        openModal('', 'A', '선택된 데이터가 없습니다.');
        return;
    }

    openModal('', '', '검수 하시겠습니까?', () => {
      const formData = { data: data };
      client.post(`${PRO_URL}/saveInboundExamDetailCompl`, formData)
        .then((res) => {
          if(res.data.stsCd !== 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }
          openModal('', 'I', '검수 되었습니다.');
          const currentRow = dataList.find(row => row.id === selRowId);
          if (currentRow) fnSearchDtl(currentRow);
        })
        .catch(error => console.error('Error:', error));
    });
  };

  // 검수 취소 버튼 클릭 핸들러 (상세)
  const onClickDtlExamComplCncl = () => {
    const data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows);

    if (data.length === 0) {
        openModal('', 'A', '선택된 데이터가 없습니다.');
        return;
    }

    openModal('', '', '검수취소 하시겠습니까?', () => {
      const formData = { data: data };
      client.post(`${PRO_URL}/saveInboundExamDetailComplCncl`, formData)
        .then((res) => {
          if(res.data.stsCd !== 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }
          openModal('', 'I', '검수취소 되었습니다.');
          const currentRow = dataList.find(row => row.id === selRowId);
          if (currentRow) fnSearchDtl(currentRow);
        })
        .catch(error => console.error('Error:', error));
    });
  };

  // 데이터 그리드에서 셀 값 변경 시 실행되는 콜백
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: { id: GridRowId, field: string, value: any }) => {
      if (['examBoxQty', 'examEaQty'].includes(field)) {
        const updatedRows = dataDtlList.map(row => {
          if (row.id === id) {
            const newRow = {
              ...row,
              [field]: Number(value),
              examTotQty: (field === 'examBoxQty' ? Number(value) : (row.examBoxQty || 0)) * (row.pkqty || 0) 
                          + (field === 'examEaQty' ? Number(value) : (row.examEaQty || 0)),
            };
            return newRow;
          }
          return row;
        });
        setDataDtlList(updatedRows);
      }
    },
    [dataDtlList]
  );

  // 메인 그리드 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, editable: false, align: "center" },
    { field: "dcNm", headerName: "물류창고", width: 120, editable: false, align: "left" },
    { field: "ibNo", headerName: "입고번호", width: 130, editable: false, align: "left" },
    { field: "clientNm", headerName: "고객사", width: 120, editable: false, align: "left" },
    { field: "ibGbnNm", headerName: "입고구분", width: 120, editable: false, align: "left" },
    { field: "ibProgStNm", headerName: "입고진행상태", width: 100, editable: false, align: "left" },
    { field: "ibPlanYmd", headerName: "입고예정일자", width: 100, editable: false, align: "left", 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> },
    { field: "ibYmd", headerName: "입고일자", width: 100, editable: false, align: "left", 
      renderCell: (params: GridRenderCellParams) => <GridDateRenderField params={params} /> },
    { field: "supplierNm", headerName: "공급처", width: 100, editable: false, align: "left" },
    { field: "useYnNm", headerName: "사용여부", width: 100, editable: false, align: "left" },
    { field: "remark", headerName: "비고", width: 300, editable: false, align: "left" },
  ];

  // 상세 그리드 컬럼 정의
  const columnsDtl: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, editable: false, align: "center" },
    { field: "ibDetailSeq", headerName: "순번", width: 60, editable: false, align: "right" },
    { field: "ibProgStNm", headerName: "진행상태", width: 100, editable: false, align: "left" },
    { field: "itemCd", headerName: "상품코드", width: 100, editable: false, align: "left" },
    { field: "itemNm", headerName: "상품명", width: 200, editable: false, align: "left" },
    { field: "itemStNm", headerName: "상품상태", width: 100, editable: false, align: "left" },
    { field: "planBoxQty", headerName: "예정(박스)", width: 100, editable: false, align: "right", 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) },
    { field: "examBoxQty", headerName: "검수(박스)", width: 100, editable: true, align: "right", 
      preProcessEditCellProps: gvGridFieldNumberPreEdit as any, 
      valueFormatter: (params) => gvGridFieldNumberFormatter(params), 
      valueParser: (value) => gvGridFieldNumberParser(value) 
    },
    { field: "ibAmt", headerName: "입고금액", width: 100, editable: false, align: "right", 
      valueFormatter: (params: GridValueFormatterParams) => gvGridFieldNumberFormatter(params) },
    { field: "remark", headerName: "비고", width: 300, editable: false, align: "left" },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title={menuTitle} />
      
      <SearchBar
        onClickSelect={fnSearch}
        onClickCustom1={onClickExamCompl}
        onClickCustomNm1={'검수완료'}
        onClickCustom2={onClickExamComplCncl}
        onClickCustomNm2={'검수완료취소'}
      >
          <FieldRow>
            <SchTextField id="ibNo" label='입고번호/명' onChange={onChangeSearch}  />  
            <SchDateField id="ibPlanYmd" label='입고예정일' selected={schValues.ibPlanYmd} onChange={onChangeSearch} />    
          </FieldRow>
      </SearchBar>

      {/* 마스터 그리드 */}
      <Box sx={{ height: '40%', mt: 2 }}>
        <ComDeGrid
          title={"Inbound List"}
          dataList={dataList}
          columns={columns}
          onRowClick={(params) => { setSelRowId(params.id); fnSearchDtl(params.row as InboundExamData) }}
          type={"single"}
          height="100%"
        />
      </Box>

      {/* 상세 그리드 */}
      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          onClickCustom1={onClickDtlExamCompl}
          onClickCustomNm1={'검수'}
          onClickCustom2={onClickDtlExamComplCncl}
          onClickCustomNm2={'검수취소'}
          title={"Inbound Detail List"}
          dataList={dataDtlList}
          columns={columnsDtl}
          onRowClick={(params) => setSelDtlRowId(params.id)}
          onCellEditCommit={handleEditCellChangeCommitted}
          type={"multi"}
          onChangeChks={(chkRows) => setDtlChkRows(chkRows.map(item => item.id))}
          height="100%"
        />
      </Box>
    </Box>
  );
}