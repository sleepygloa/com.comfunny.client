import React, { useEffect, useState } from "react";
import { GridColDef, GridRowParams, GridCellParams, GridRowId } from "@mui/x-data-grid";

// Components
import { PageTitle } from "../../../components/SearchBar/SearchBar";
import { SchTextField, FieldRow } from "../../../components/SearchBar/CmmnTextField";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

// Common
import { client } from "../../../constraints"; // 오타 수정 contraints -> constraints
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
  codeCd: string;
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
  const [schValues, setSchValues] = useState<SearchValues>({ codeCd: "" });
  
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
        setSchValues({ ...schValues, [id]: value });
    }
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`/wms/sys/code/selectCodeGrpList`, data)
      .then((res) => {
        const list: CodeGroupData[] = res.data;
        setDataList(list);
        if (list.length > 0) {
          // ID가 1부터 시작한다고 가정하거나 첫 번째 요소의 ID 사용
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
    client.post(`/wms/sys/code/selectCodeList`, rowData)
      .then((res) => setDataDtlList(res.data))
      .catch((error) => console.log('error = ', error));
  };

  return (
    <>
      <PageTitle title="코드그룹 리스트" />
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
        // onCellEditCommit은 v5의 레거시 prop입니다. v6 이상에서는 processRowUpdate를 사용해야 합니다.
        // 현재 구조 유지를 위해 any 타입 사용 혹은 로직 수정 필요
        onCellEditCommit={(params: any) => {
            // params.id는 row id
            const updatedList = dataList.map(row => 
                row.id === params.id ? { ...row, [params.field]: params.value } : row
            );
            setDataList(updatedList);
        }}
      />

      <PageTitle title="코드 리스트" />

      <ComDeGrid
        // onClickSelect는 상단 조회 버튼용이므로 하단 그리드엔 보통 연결하지 않음 (상세조회는 상단 행 클릭으로 트리거)
        // onClickSelect={() => fnSearchDtl(values)} 
        searchBarChildren={
          <FieldRow>
            <SchTextField id="codeCd" label="코드" onChange={onChangeSearch} />
          </FieldRow>
        }
        title="코드 리스트"
        dataList={dataDtlList}
        columns={columnsDtl}
        type="single"
        onRowClick={(params) => {
             // 상세 그리드 행 클릭 시 동작 (필요 시 구현)
             // setValues(params.row as any); 
        }}
        onCellEditCommit={(params: any) => {
            const updatedDtlList = dataDtlList.map(row => 
                row.id === params.id ? { ...row, [params.field]: params.value } : row
            );
            setDataDtlList(updatedDtlList);
        }}
      />
    </>
  );
}