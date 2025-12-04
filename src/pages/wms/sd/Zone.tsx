import React, { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { GridColDef, GridRowId } from '@mui/x-data-grid';

// context
import { useCommonData } from "../../../context/CommonDataContext";
import { useModal } from "../../../context/ModalContext";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { client } from '../../../constraints'; 
import {
  gvGridDropdownDisLabel,
  gvGetRowData,
  gvSetDropdownData,
  gvSetLevelDropdownData,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser
} from "../../../components/Common";

// --- 데이터 타입 정의 ---
interface ZoneData {
  id: number;
  bizCd: string;
  dcCd: string;
  areaCd: string;
  zoneCd: string;
  zoneNm: string;
  keepTypeCd: string;
  holdStCd: string;
  stdWidth: number;
  stdLength: number;
  stdLocx: number;
  stdLocy: number;
  stdLocz: number;
  useYn: string;
  remark: string;
  [key: string]: any;
}

export default function Zone() {
  const menuTitle = '존 관리';
  const PRO_URL = '/wms/sd/zone';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState<GridRowId>(-1);
  const [dataList, setDataList] = useState<ZoneData[]>([]);
  
  // 콤보박스
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [keepTypeCdCmb, setKeepTypeCdCmb] = useState<any[]>([]);
  const [holdStCdCmb, setHoldStCdCmb] = useState<any[]>([]);
  const [dcCmb, setDcCmb] = useState<any[]>([]);
  const [dcAreaCmb, setDcAreaCmb] = useState<any>({}); 

  // 초기값
  const initData: ZoneData = {
    id: 0,
    bizCd: '',
    dcCd: "",
    areaCd: "",
    zoneCd: "",
    zoneNm: "",
    keepTypeCd: "1",
    holdStCd: "1",
    stdWidth: 0,
    stdLength: 0,
    stdLocx: 0,
    stdLocy: 0,
    stdLocz: 0,
    remark: "",
    useYn: "Y",
  };

  const [schValues, setSchValues] = useState({ codeCd: "" });
  const [values, setValues] = useState<ZoneData>(initData);

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { 
      field: "dcCd", 
      headerName: "물류창고", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueOptions: dcCmb, 
      valueGetter: (params) => dcCmb.find((v: any) => v.value === params.row.dcCd)?.label || params.value || '',
      width: 120
    },
    { 
      field: "areaCd", 
      headerName: "구역", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueOptions: (params) => dcAreaCmb[params.row.dcCd] || [],
      valueGetter: (params) => {
        const options = dcAreaCmb[params.row.dcCd] || [];
        return options.find((v: any) => v.value === params.row.areaCd)?.label || params.value || '';
      },
      width: 120
    },
    { field: "zoneCd", headerName: "지역코드", editable: true, align: "left", width: 100 },
    { field: "zoneNm", headerName: "지역명", editable: true, align: "left", width: 100 },
    { 
      field: "keepTypeCd", 
      headerName: "보관유형", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueOptions: keepTypeCdCmb, 
      valueFormatter: gvGridDropdownDisLabel,
      width: 100
    },
    { 
      field: "holdStCd", 
      headerName: "보류상태", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueOptions: holdStCdCmb, 
      valueFormatter: gvGridDropdownDisLabel,
      width: 100
    },
    { field: "stdWidth", headerName: "가로", editable: true, align: "right", width: 100, preProcessEditCellProps: gvGridFieldNumberPreEdit as any, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "stdLength", headerName: "세로", editable: true, align: "right", width: 100, preProcessEditCellProps: gvGridFieldNumberPreEdit as any, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "stdLocx", headerName: "기준위치X", editable: true, align: "right", width: 100, preProcessEditCellProps: gvGridFieldNumberPreEdit as any, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "stdLocy", headerName: "기준위치Y", editable: true, align: "right", width: 100, preProcessEditCellProps: gvGridFieldNumberPreEdit as any, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "stdLocz", headerName: "기준위치Z", editable: true, align: "right", width: 100, preProcessEditCellProps: gvGridFieldNumberPreEdit as any, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { 
      field: "useYn", 
      headerName: "사용여부", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueOptions: useYnCmb, 
      valueFormatter: gvGridDropdownDisLabel,
      width: 80
    },
    { field: "remark", headerName: "비고", editable: true, align: "left", width: 300 },
  ];

  useEffect(() => {
    if (selRowId === -1) {
      if (!useYnCmb.length) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      if (!holdStCdCmb.length) setHoldStCdCmb(getCmbOfGlobalData('CMMN_CD', 'HOLD_ST_CD'));
      if (!keepTypeCdCmb.length) setKeepTypeCdCmb(getCmbOfGlobalData('CMMN_CD', 'KEEP_TYPE_CD'));
      if (!dcCmb.length) fnSearchDc();
      if (Object.keys(dcAreaCmb).length === 0) fnSearchDcArea();
    }
  }, [selRowId, useYnCmb, holdStCdCmb, keepTypeCdCmb, dcCmb, dcAreaCmb, getCmbOfGlobalData]);

  const onChangeSearch = (value: string, id?: string) => {
    if(id) setSchValues({ ...schValues, [id]: value });
  };

  const fnSearchDc = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcList`, {});
      setDcCmb(gvSetDropdownData(res.data));
    } catch (error) {
      console.log('error = ', error);
    }
  };

  const fnSearchDcArea = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcAreaList`, {});
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

  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initData, id: newId };
    setDataList((prevData) => [...prevData, newRow]);
  };

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId as number);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', async () => {
      try {
        await client.post(`${PRO_URL}/saveZone`, rowData);
        fnSearch();
      } catch (error) {
        console.log('error = ', error);
      }
    });
  };

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId as number);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', async () => {
      try {
        await client.post(`${PRO_URL}/deleteZone`, rowData);
        fnSearch();
      } catch (error) {
        console.log('error = ', error);
      }
    });
  };

  const handleGridCellClick = (params: any) => {
    setValues(params.row);
    setSelRowId(params.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }: any) => {
      const updatedRows = dataList.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value };

          // 부모 코드 변경 시 자식 코드 초기화 로직
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title={menuTitle} />
      
      <SearchBar
        onClickSelect={onClickSelect}
        onClickAdd={onClickAdd}
        onClickSave={onClickSave}
        onClickDel={onClickDel}
      >
        <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch} />
      </SearchBar>

      <Box sx={{ flex: 1, mt: 2, minHeight: 0 }}>
        <ComDeGrid
          title="Area List"
          dataList={dataList}
          columns={columns}
          onCellClick={handleGridCellClick}
          onCellEditCommit={handleEditCellChangeCommitted}
          type="single"
          height="100%"
        />
      </Box>
    </Box>
  );
}