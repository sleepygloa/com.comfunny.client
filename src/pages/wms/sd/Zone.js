import React, { useEffect, useState, useCallback } from "react";
import { useCommonData } from "../../../context/CommonDataContext.js";
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { useModal } from "../../../context/ModalContext.js";
import { client } from '../../../contraints.js';
import {
  gvGridDropdownDisLabel,
  gvGetRowData,
  gvSetDropdownData,
  gvSetLevelDropdownData,
} from "../../../components/Common.js";

export default function Biz() {
  const menuTitle = '지역 관리';
  const PRO_URL = '/wms/sd/zone';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState(-1);
  const [dataList, setDataList] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const [keepTypeCdCmb, setKeepTypeCdCmb] = useState([]);
  const [holdStCdCmb, setHoldStCdCmb] = useState([]);
  const [dcCmb, setDcCmb] = useState([]);
  const [dcAreaCmb, setDcAreaCmb] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "dcCd", headerName: "물류창고", editable: true, align: "center", type: "singleSelect", valueOptions: dcCmb, 
      valueGetter: ({ row }) => dcCmb.find(v => v.value === row.dcCd)?.label || '' 
    },
    { field: "areaCd", headerName: "구역", editable: true, align: "center", type: "singleSelect", 
      valueOptions: ({ row }) => dcAreaCmb[row.dcCd] || [], 
      valueGetter: ({ row }) => dcAreaCmb[row.dcCd]?.find(v => v.value === row.areaCd)?.label || ''
    },
    { field: "zoneCd", headerName: "지역코드", editable: true, align: "left", width: 100 },
    { field: "zoneNm", headerName: "지역명", editable: true, align: "left", width: 100 },
    { field: "keepTypeCd", headerName: "보관유형", editable: true, align: "center", type: "singleSelect", valueOptions: keepTypeCdCmb, 
      valueFormatter: gvGridDropdownDisLabel 
    },
    { field: "holdStCd", headerName: "보류상태", editable: true, align: "center", type: "singleSelect", valueOptions: holdStCdCmb, 
      valueFormatter: gvGridDropdownDisLabel 
    },
    { field: "stdWidth", headerName: "가로", editable: true, align: "center", width: 100 },
    { field: "stdLength", headerName: "세로", editable: true, align: "center", width: 100 },
    { field: "stdLocx", headerName: "기준위치X", editable: true, align: "center", width: 100 },
    { field: "stdLocy", headerName: "기준위치Y", editable: true, align: "center", width: 100 },
    { field: "stdLocz", headerName: "기준위치Z", editable: true, align: "center", width: 100 },
    { field: "useYn", headerName: "사용여부", editable: true, align: "center", type: "singleSelect", valueOptions: useYnCmb, 
      valueFormatter: gvGridDropdownDisLabel 
    },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  const initData = {
    id: dataList.length + 1,
    bizCd: '',
    dcCd: "",
    areaCd: "",
    zoneCd: "",
    zoneNm: "",
    keepTypeCd: "1",
    holdStCd: "1",
    remark: "",
    useYn: "Y",
  };

  const [values, setValues] = useState(initData);
  const [schValues, setSchValues] = useState({ codeCd: "" });

  const onChangeSearch = (event) => setSchValues({ ...schValues, [event.target.id]: event.target.value });

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fnSearch();
    }
  };

  useEffect(() => {
    if (selRowId === -1) {
      if (!useYnCmb.length) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      if (!holdStCdCmb.length) setHoldStCdCmb(getCmbOfGlobalData('CMMN_CD', 'HOLD_ST_CD'));
      if (!keepTypeCdCmb.length) setKeepTypeCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TYPE_CD'));
      if (!dcCmb.length) fnSearchDc();
      if (!dcAreaCmb.length) fnSearchDcArea();
    }
  }, [selRowId, useYnCmb, holdStCdCmb, keepTypeCdCmb, dcCmb, dcAreaCmb]);

  const fnSearchDc = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcList`);
      setDcCmb(gvSetDropdownData(res.data));
    } catch (error) {
      console.log('error = ', error);
    }
  };

  const fnSearchDcArea = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcAreaList`);
      setDcAreaCmb(gvSetLevelDropdownData(res.data));
    } catch (error) {
      console.log('error = ', error);
    }
  };

  const fnSearch = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectZoneList`, { codeCd: schValues.codeCd });
      setDataList(res.data);
    } catch (error) {
      console.log('error = ', error);
    }
  };

  const onClickSelect = () => fnSearch();

  const onClickAdd = () => setDataList((prevData) => [...prevData, initData]);

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', async () => {
      try {
        await client.post(`${PRO_URL}/saveZone`, rowData);
        alert('저장되었습니다.');
        fnSearch();
      } catch (error) {
        console.log('error = ', error);
      }
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', async () => {
      try {
        await client.post(`${PRO_URL}/deleteZone`, rowData);
        alert('삭제되었습니다.');
        fnSearch();
      } catch (error) {
        console.log('error = ', error);
      }
    });
  };

  const handleGridCellClick = (e) => {
    setValues(e.row);
    setSelRowId(e.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
      const updatedRows = dataList.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value };

          if (field === 'dcCd') {
            updatedRow.areaCd = '';
            updatedRow.zoneCd = '';
          } else if (field === 'areaCd') {
            updatedRow.zoneCd = '';
          }
          return updatedRow;
        }
        return row;
      });
      setDataList(updatedRows);
    },
    [dataList]
  );

  return (
    <>
      <PageTitle title="존 관리" />
      <ComDeGrid
        onClickSelect={onClickSelect}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        searchBarChildren={
          <SchTextField id="codeCd" label="코드/명" div="3" onChange={onChangeSearch} onKeyDown={onKeyDown} />
        }
        title="Area List"
        dataList={dataList}
        columns={columns}
        onCellClick={handleGridCellClick}
        onCellEditCommit={handleEditCellChangeCommitted}
        type="single"
      />
    </>
  );
}
