import React, { useEffect, useState } from "react";
import { Box } from "@mui/material"; // Box 추가
import { GridColDef, GridRowId } from "@mui/x-data-grid";

// Components
import { PageTitle } from "../../../components/SearchBar/SearchBar"; // Note: PageTitle 위치가 SearchBar 내부인 경우
// 만약 PageTitle이 별도 컴포넌트라면 import 경로 수정 필요: import PageTitle from "../../../components/PageTitle/PageTitle";
import { SchTextField, FieldRow } from "../../../components/SearchBar/CmmnTextField";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// Common
import { client } from "../../../constraints"; 
import { gvGridDropdownDisLabel } from "../../../components/Common";
import { useModal } from "../../../context/ModalContext";

// --- 인터페이스 정의 ---

interface CodeGroupData {
  id: number;
  codeGrpCd: string;
  codeGrpNm: string;
  codeGrpDesc: string;
  codeGrpTp: string;
  useYn: string;
  inUserId?: string;
  inDt?: string;
  upUserId?: string;
  upDt?: string;
  [key: string]: any;
}

interface CodeDetailData {
  id: number;
  codeCd: string;
  codeNm: string;
  codeDesc: string;
  codeOrder: number;
  codeOther1: string;
  useYn: string;
  delYn: string;
  inUserId?: string;
  inDt?: string;
  upUserId?: string;
  upDt?: string;
  [key: string]: any;
}

interface SearchValues {
  codeGrpCd: string; // 상단 검색 조건
  codeCd: string;    // 하단 검색 조건
  [key: string]: any;
}

// 콤보박스 옵션
const useYnCmb = [{ value: "Y", label: "사용" }, { value: "N", label: "미사용" }];
const delYnCmb = [{ value: "Y", label: "삭제" }, { value: "N", label: "미삭제" }];

export default function Code() {
  const { openModal } = useModal();
  
  // 상태 관리
  const [selRowId, setSelRowId] = useState<GridRowId>(-1);
  const [dataList, setDataList] = useState<CodeGroupData[]>([]);
  const [dataDtlList, setDataDtlList] = useState<CodeDetailData[]>([]);
  const [schValues, setSchValues] = useState<SearchValues>({ codeGrpCd: "", codeCd: "" });
  
  // 선택된 행 데이터 (그룹 코드)
  const [values, setValues] = useState<CodeGroupData>({
    id: 0,
    codeGrpCd: "",
    codeGrpNm: "",
    codeGrpDesc: "",
    codeGrpTp: "",
    useYn: "Y",
  });

  // 그룹 코드 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 60 },
    { field: "codeGrpCd", headerName: "그룹코드", editable: true, align: "center", width: 180 },
    { field: "codeGrpNm", headerName: "그룹코드명", editable: true, align: "left", width: 250 },
    { field: "codeGrpDesc", headerName: "그룹코드설명", editable: true, align: "left", width: 250 },
    { field: "codeGrpTp", headerName: "그룹코드유형", editable: true, align: "center", width: 120 },
    { 
      field: "useYn", headerName: "사용여부", editable: true, align: "center", 
      type: "singleSelect", valueOptions: useYnCmb, valueFormatter: gvGridDropdownDisLabel 
    },
    { field: "inUserId", headerName: "등록자", align: "center", width: 100 },
    { field: "inDt", headerName: "등록일시", align: "center", width: 140 },
    { field: "upUserId", headerName: "수정자", align: "center", width: 100 },
    { field: "upDt", headerName: "수정일시", align: "center", width: 140 },
  ];

  // 상세 코드 컬럼 정의
  const columnsDtl: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 60 },
    { field: "codeCd", headerName: "코드", editable: true, align: "center", width: 180 },
    { field: "codeNm", headerName: "코드명", editable: true, align: "left", width: 250 },
    { field: "codeDesc", headerName: "코드설명", editable: true, align: "left", width: 250 },
    { field: "codeOrder", headerName: "순서", editable: true, align: "center", width: 80 },
    { field: "codeOther1", headerName: "코드기타1", editable: true, align: "center", width: 80 },
    { 
      field: "useYn", headerName: "사용여부", editable: true, align: "center", 
      type: "singleSelect", valueOptions: useYnCmb, valueFormatter: gvGridDropdownDisLabel 
    },
    { 
      field: "delYn", headerName: "삭제여부", editable: true, align: "center", 
      type: "singleSelect", valueOptions: delYnCmb, valueFormatter: gvGridDropdownDisLabel 
    },
    { field: "inUserId", headerName: "등록자", align: "center", width: 100 },
    { field: "inDt", headerName: "등록일시", align: "center", width: 140 },
    { field: "upUserId", headerName: "수정자", align: "center", width: 100 },
    { field: "upDt", headerName: "수정일시", align: "center", width: 140 },
  ];

  useEffect(() => {
    fnSearch();
  }, []);

  const onChangeSearch = (value: any, id?: string) => {
    if (id) {
        setSchValues((prev) => ({ ...prev, [id]: value }));
    }
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeGrpCd }; // 그룹코드 조회 조건
    client.post(`/wms/sys/code/selectCodeGrpList`, data)
      .then((res) => {
        const list: CodeGroupData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
          const firstRow = list[0];
          setSelRowId(firstRow.id);
          fnSearchDtl(firstRow);
          setValues(firstRow);
        } else {
            setDataDtlList([]);
            setValues({
                id: 0,
                codeGrpCd: "",
                codeGrpNm: "",
                codeGrpDesc: "",
                codeGrpTp: "",
                useYn: "Y",
            });
        }
      })
      .catch((error) => console.log('error = ', error));
  };

  const fnSearchDtl = (rowData: CodeGroupData) => {
    setSelRowId(rowData.id);
    // 상세 조회시 하단 검색 조건(codeCd)도 함께 보낼 수 있음
    client.post(`/wms/sys/code/selectCodeList`, { ...rowData, codeCd: schValues.codeCd })
      .then((res) => setDataDtlList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  // 하단 상세 조회 버튼 클릭 시 (현재 선택된 그룹 코드 기준 재조회)
  const onClickSelectDtl = () => {
    if (values && values.id !== 0) {
      fnSearchDtl(values);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      
      {/* --- 상단: 코드 그룹 리스트 --- */}
      <PageTitle title="코드그룹 리스트" />
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ComDeGrid
          onClickSelect={fnSearch}
          searchBarChildren={
            <FieldRow>
              <SchTextField id="codeGrpCd" label="코드그룹코드" onChange={onChangeSearch} />
            </FieldRow>
          }
          title="그룹 코드 리스트"
          dataList={dataList}
          columns={columns}
          type="single"
          onRowClick={(params) => { 
              const row = params.row as CodeGroupData;
              setValues(row); 
              fnSearchDtl(row); 
          }}
          onCellEditCommit={(params: any) => {
              const updatedList = dataList.map(row => 
                  row.id === params.id ? { ...row, [params.field]: params.value } : row
              );
              setDataList(updatedList);
          }}
          height="100%"
        />
      </Box>

      {/* --- 간격 --- */}
      <Box sx={{ height: 20 }} />

      {/* --- 하단: 코드 리스트 (상세) --- */}
      <PageTitle title="코드 리스트" />
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ComDeGrid
          onClickSelect={onClickSelectDtl}
          searchBarChildren={
            <FieldRow>
              <SchTextField id="codeCd" label="코드" onChange={onChangeSearch} />
            </FieldRow>
          }
          title="코드 상세 리스트"
          dataList={dataDtlList}
          columns={columnsDtl}
          type="single"
          onCellEditCommit={(params: any) => {
              const updatedDtlList = dataDtlList.map(row => 
                  row.id === params.id ? { ...row, [params.field]: params.value } : row
              );
              setDataDtlList(updatedDtlList);
          }}
          height="100%"
        />
      </Box>
    </Box>
  );
}