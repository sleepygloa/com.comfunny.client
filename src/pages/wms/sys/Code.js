import React, { useEffect, useState } from "react";
import { PageTitle } from "../../../components/SearchBar/SearchBar";
import { SchTextField, FieldRow } from "../../../components/SearchBar/CmmnTextField.js";
import { client } from "../../../contraints.js";
import { gvGridDropdownDisLabel } from "../../../components/Common";
import { useModal } from "../../../context/ModalContext.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";

const useYnCmb = [{ value: "Y", label: "사용" }, { value: "N", label: "미사용" }];
const delYnCmb = [{ value: "Y", label: "삭제" }, { value: "N", label: "미삭제" }];

const columns = [
  { field: "id", headerName: "ID", align: "center", width: 60 },
  { field: "codeGrpCd", headerName: "그룹코드", editable: true, align: "center", width: 180 },
  { field: "codeGrpNm", headerName: "그룹코드명", editable: true, align: "left", width: 250 },
  { field: "codeGrpDesc", headerName: "그룹코드설명", editable: true, align: "left", width: 250 },
  { field: "codeGrpTp", headerName: "그룹코드유형", editable: true, align: "center", width: 120 },
  { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueOptions: useYnCmb, valueFormatter: gvGridDropdownDisLabel },
  { field: "inUserId", headerName: "등록자", align: "center", width: 100 },
  { field: "inDt", headerName: "등록일시", align: "center", width: 140 },
  { field: "upUserId", headerName: "수정자", align: "center", width: 100 },
  { field: "upDt", headerName: "수정일시", align: "center", width: 140 },
];

const columnsDtl = [
  { field: "id", headerName: "ID", align: "center", width: 60 },
  { field: "codeCd", headerName: "코드", editable: true, align: "center", width: 180 },
  { field: "codeNm", headerName: "코드명", editable: true, align: "left", width: 250 },
  { field: "codeDesc", headerName: "코드설명", editable: true, align: "left", width: 250 },
  { field: "codeOrder", headerName: "순서", editable: true, align: "center", width: 80 },
  { field: "codeOther1", headerName: "코드기타1", editable: true, align: "center", width: 80 },
  { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueOptions: useYnCmb, valueFormatter: gvGridDropdownDisLabel },
  { field: "delYn", headerName: "삭제여부", editable: true, align: "center", type: "singleSelect", valueOptions: delYnCmb, valueFormatter: gvGridDropdownDisLabel },
  { field: "inUserId", headerName: "등록자", align: "center", width: 100 },
  { field: "inDt", headerName: "등록일시", align: "center", width: 140 },
  { field: "upUserId", headerName: "수정자", align: "center", width: 100 },
  { field: "upDt", headerName: "수정일시", align: "center", width: 140 },
];

export default function Code() {
  const { openModal } = useModal();
  const [selRowId, setSelRowId] = useState(-1);
  const [dataList, setDataList] = useState([]);
  const [dataDtlList, setDataDtlList] = useState([]);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  const [values, setValues] = useState({
    id: "",
    codeGrpCd: "",
    codeGrpNm: "",
    codeGrpDesc: "",
    codeGrpTp: "",
    useYn: "Y",
  });

  useEffect(() => {
    fnSearch();
  }, []);

  const onChangeSearch = (event) => {
    setSchValues({ ...schValues, [event.target.id]: event.target.value });
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`/wms/sys/code/selectCodeGrpList`, data)
      .then((res) => {
        const dataList = res.data;
        setDataList(dataList);
        if (dataList.length > 0) {
          setSelRowId(1);
          fnSearchDtl(dataList[0]);
          setValues(dataList[0]);
        }
      })
      .catch((error) => console.log('error = ', error));
  };

  const fnSearchDtl = (rowData) => {
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
        onRowClick={(e) => { setValues(e.row); fnSearchDtl(e.row); }}
        onCellEditCommit={(params) => {
          dataList[params.id - 1][params.field] = params.value;
        }}
      />

      <PageTitle title="코드 리스트" />

      <ComDeGrid
        onClickSelect={fnSearchDtl}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="codeCd" label="코드" onChange={onChangeSearch} />
          </FieldRow>
        }
        title="코드 리스트"
        dataList={dataDtlList}
        columns={columnsDtl}
        type="single"
        onRowClick={(e) => setValues(e.row)}
        onCellEditCommit={(params) => {
          dataDtlList[params.id - 1][params.field] = params.value;
        }}
      />
    </>
  );
}
