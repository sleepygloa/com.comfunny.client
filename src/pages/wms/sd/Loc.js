import React, { useEffect, useState, useCallback } from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField.js";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { gvGridDropdownDisLabel, gvGetRowData, gvSetDropdownData, gvSetLevelDropdownData, gvSetLevel2DropdownData, gvGridFieldNumberPreEdit, gvGridFieldNumberFormatter, gvGridFieldNumberParser } from "../../../components/Common.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { useModal } from "../../../context/ModalContext.js";
import LocMultiReg from "./LocMultiRegPop.js";
import { client } from '../../../contraints.js';

export default function LocationManagement() {
  const PRO_URL = '/wms/sd/loc';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState(-1);
  const [dataList, setDataList] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const [locTypeCdCmb, setLocTypeCdCmb] = useState([]);
  const [holdStCdCmb, setHoldStCdCmb] = useState([]);
  const [dcCmb, setDcCmb] = useState([]);
  const [dcAreaCmb, setDcAreaCmb] = useState([]);
  const [dcAreaZoneCmb, setDcAreaZoneCmb] = useState([]);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const initData = {
    id: dataList.length + 1,
    bizCd: '',
    dcCd: "",
    areaCd: "",
    zoneCd: "",
    locCd: "",
    linCd: "",
    rowCd: "",
    levCd: "",
    locTypeCd: "",
    loadGbnCd: "",
    locPrioord: "",
    itemMixLoadYn: "",
    lotMixLoadYn: "",
    horizontal: "",
    vertical: "",
    cbm: "",
    weight: "",
    remark: "",
    useYn: "Y",
  };

  useEffect(() => {
    if (selRowId === -1) {
      if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      if (locTypeCdCmb.length === 0) setLocTypeCdCmb(getCmbOfGlobalData('CMMN_CD', 'LOC_TYPE_CD'));
      if (holdStCdCmb.length === 0) setHoldStCdCmb(getCmbOfGlobalData('CMMN_CD', 'HOLD_ST_CD'));

      if (dcCmb.length === 0) fnSearchDc();
      if (dcAreaCmb.length === 0) fnSearchDcArea();
      if (dcAreaZoneCmb.length === 0) fnSearchDcAreaZone();
    }
  }, [selRowId, dcCmb, useYnCmb, dcAreaCmb, dcAreaZoneCmb]);

  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcList`, null)
      .then(res => setDcCmb(gvSetDropdownData(res.data)))
      .catch(error => console.log('error = ' + error));
  };

  const fnSearchDcArea = async () => {
    await client.post(`${PRO_URL}/selectDcAreaList`, null)
      .then(res => setDcAreaCmb(gvSetLevelDropdownData(res.data)))
      .catch(error => console.log('error = ' + error));
  };

  const fnSearchDcAreaZone = async () => {
    await client.post(`${PRO_URL}/selectDcAreaZoneList`, null)
      .then(res => setDcAreaZoneCmb(gvSetLevel2DropdownData(res.data)))
      .catch(error => console.log('error = ' + error));
  };

  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`${PRO_URL}/selectLocList`, data)
      .then(res => setDataList(res.data))
      .catch(error => console.log('error = ' + error));
  };

  const onClickSelect = fnSearch;

  const onClickAdd = () => {
    setDataList(prevDataList => [...prevDataList, { ...initData, id: prevDataList.length + 1 }]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
      client.post(`${PRO_URL}/saveLoc`, rowData)
        .then(() => {
          alert('저장되었습니다.');
          fnSearch();
        })
        .catch(error => console.log('error = ' + error));
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', () => {
      client.post(`${PRO_URL}/deleteLoc`, rowData)
        .then(() => {
          alert('삭제되었습니다.');
          fnSearch();
        })
        .catch(error => console.log('error = ' + error));
    });
  };

  const onClickMultiRegister = () => {
    openModal('LOG_MULTI_REG', '로케이션 다중 등록', <LocMultiReg />, fnSearch, '1000px', '600px');
  };

  const handleGridCellClick = (e) => {
    setSelRowId(e.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(({ id, field, value }) => {
    setDataList(prevDataList => prevDataList.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        if (['horizontal', 'vertical', 'height'].includes(field)) {
          updatedRow.cbm = updatedRow.horizontal * updatedRow.vertical * updatedRow.height;
        }
        if (field === 'dcCd') updatedRow.areaCd = null;
        if (field === 'areaCd') updatedRow.zoneCd = null;
        return updatedRow;
      }
      return row;
    }));
  }, []);

  const onChangeSearch = (event) => {
    setSchValues({ ...schValues, [event.target.id]: event.target.value });
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fnSearch();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "dcCd", headerName: "물류창고", editable: true, align: "center", type: "singleSelect", valueGetter: (params) => dcCmb.find(v => v.value === params.row.dcCd)?.label || '', valueOptions: dcCmb },
    { field: "areaCd", headerName: "구역", editable: true, align: "center", type: "singleSelect", valueGetter: (params) => dcAreaCmb[params.row.dcCd]?.find(v => v.value === params.value)?.label || '', valueOptions: (params) => dcAreaCmb[params.row.dcCd] || [] },
    { field: "zoneCd", headerName: "지역", editable: true, align: "center", type: "singleSelect", valueGetter: (params) => dcAreaZoneCmb[params.row.dcCd]?.[params.row.areaCd]?.find(v => v.value === params.value)?.label || '', valueOptions: (params) => dcAreaZoneCmb[params.row.dcCd]?.[params.row.areaCd] || [] },
    { field: "locCd", headerName: "로케이션코드", editable: false, align: "left", width: 120 },
    { field: "linCd", headerName: "행", editable: true, align: "left", width: 100 },
    { field: "rowCd", headerName: "열", editable: true, align: "left", width: 100 },
    { field: "levCd", headerName: "단", editable: true, align: "left", width: 100 },
    { field: "locTypeCd", headerName: "로케이션유형", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: locTypeCdCmb },
    { field: "holdStCd", headerName: "보류상태", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: holdStCdCmb },
    { field: "locPrioord", headerName: "로케이션우선순위", editable: true, align: "right", width: 100, preProcessEditCellProps: gvGridFieldNumberPreEdit, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "horizontal", headerName: "가로", editable: true, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "vertical", headerName: "세로", editable: true, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "height", headerName: "높이", editable: true, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "cbm", headerName: "체적", editable: false, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "weight", headerName: "중량", editable: true, align: "left", width: 100 },
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel, valueOptions: useYnCmb },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  return (
    <>
      <PageTitle title="로케이션 관리" />
      <ComDeGrid
        onClickSelect={onClickSelect}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        onClickCustom1={onClickMultiRegister}
        onClickCustomNm1="로케이션다중등록"
        searchBarChildren={
          <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} onKeyDown={onKeyDown} />
        }
        title="Loc List"
        dataList={dataList}
        columns={columns}
        type="single"
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
      />
    </>
  );
}
