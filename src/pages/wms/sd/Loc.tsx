import React, { useEffect, useState, useCallback } from "react";
import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";
import { useCommonData } from "../../../context/CommonDataContext";
import { 
  gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvSetLevelDropdownData, 
  gvSetLevel2DropdownData, 
  gvGridFieldNumberPreEdit, 
  gvGridFieldNumberFormatter, 
  gvGridFieldNumberParser 
} from "../../../components/Common";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid";
import { useModal } from "../../../context/ModalContext";
import { client } from '../../../constraints';

// [참고] LocMultiRegPop 컴포넌트가 실제로 존재해야 합니다. 
// 만약 없다면 임시로 주석 처리하거나 더미 컴포넌트를 만들어주세요.
// import LocMultiReg from "./LocMultiRegPop"; 

// --- 데이터 타입 정의 ---
interface LocData {
  id: number;
  bizCd: string;
  dcCd: string;
  areaCd: string;
  zoneCd: string;
  locCd: string;
  linCd: string;
  rowCd: string;
  levCd: string;
  locTypeCd: string;
  loadGbnCd: string;
  holdStCd?: string;
  locPrioord: number | string;
  itemMixLoadYn: string;
  lotMixLoadYn: string;
  horizontal: number;
  vertical: number;
  height: number;
  cbm: number;
  weight: number;
  remark: string;
  useYn: string;
  // [에러 해결] 동적 필드 접근을 위한 인덱스 시그니처
  [key: string]: string | number | undefined;
}

export default function LocationManagement() {
  const PRO_URL = '/wms/sd/loc';
  const { openModal } = useModal();
  const { getCmbOfGlobalData } = useCommonData();

  const [selRowId, setSelRowId] = useState<number>(-1);
  const [dataList, setDataList] = useState<LocData[]>([]);
  
  // 콤보박스 데이터
  const [useYnCmb, setUseYnCmb] = useState<any[]>([]);
  const [locTypeCdCmb, setLocTypeCdCmb] = useState<any[]>([]);
  const [holdStCdCmb, setHoldStCdCmb] = useState<any[]>([]);
  const [dcCmb, setDcCmb] = useState<any[]>([]);
  const [dcAreaCmb, setDcAreaCmb] = useState<Record<string, { value: any; label: string; }[]>>({});
  const [dcAreaZoneCmb, setDcAreaZoneCmb] = useState<Record<string, Record<string, { value: any; label: string; }[]>>>({});
  
  const [schValues, setSchValues] = useState({ codeCd: "" });

  // 초기 데이터 값
  const initData: LocData = {
    id: 0,
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
    holdStCd: "", 
    locPrioord: "",
    itemMixLoadYn: "",
    lotMixLoadYn: "",
    horizontal: 0,
    vertical: 0,
    height: 0,
    cbm: 0,
    weight: 0,
    remark: "",
    useYn: "Y",
  };

  useEffect(() => {
    if (selRowId === -1) {
      if (useYnCmb.length === 0) setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      if (locTypeCdCmb.length === 0) setLocTypeCdCmb(getCmbOfGlobalData('CMMN_CD', 'LOC_TYPE_CD'));
      if (holdStCdCmb.length === 0) setHoldStCdCmb(getCmbOfGlobalData('CMMN_CD', 'HOLD_ST_CD'));

      if (dcCmb.length === 0) fnSearchDc();
      if (Object.keys(dcAreaCmb).length === 0) fnSearchDcArea();
      if (Object.keys(dcAreaZoneCmb).length === 0) fnSearchDcAreaZone();
    }
  }, [selRowId, dcCmb, useYnCmb, dcAreaCmb, dcAreaZoneCmb, getCmbOfGlobalData]);

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
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newRow = { ...initData, id: newId };
    setDataList(prevDataList => [...prevDataList, newRow]);
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
    // LocMultiReg 팝업 컴포넌트가 필요합니다.
    // openModal('LOG_MULTI_REG', '로케이션 다중 등록', <LocMultiReg />, fnSearch, '1000px', '600px');
    alert("준비 중입니다.");
  };

  const handleGridCellClick = (e: any) => {
    setSelRowId(e.row.id);
  };

  const handleEditCellChangeCommitted = useCallback(({ id, field, value }: any) => {
    setDataList(prevDataList => prevDataList.map(row => {
      if (row.id === id) {
        const numValue = Number(value);
        // LocData에 인덱스 시그니처가 있으므로 [field] 접근이 안전합니다.
        const updatedRow = { ...row, [field]: value };
        
        // CBM 자동 계산
        if (['horizontal', 'vertical', 'height'].includes(field)) {
             const h = field === 'horizontal' ? numValue : (row.horizontal || 0);
             const v = field === 'vertical' ? numValue : (row.vertical || 0);
             const he = field === 'height' ? numValue : (row.height || 0);
             const cbm = (h * v * he) / 1000000000;
             updatedRow.cbm = Number(cbm.toFixed(9));
             (updatedRow as any)[field] = numValue; // 숫자형으로 업데이트 보장
        }

        // 계층형 콤보박스 초기화 로직
        if (field === 'dcCd') updatedRow.areaCd = '';
        if (field === 'areaCd') updatedRow.zoneCd = '';
        
        return updatedRow;
      }
      return row;
    }));
  }, []);

  const onChangeSearch = (event: any) => {
    setSchValues({ ...schValues, [event.target.id]: event.target.value });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { 
      field: "dcCd", 
      headerName: "물류창고", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueGetter: (params) => {
        return dcCmb.find((v: any) => v.value === params.row.dcCd)?.label || params.value || '';
      },
      valueOptions: dcCmb 
    },
    { 
      field: "areaCd", 
      headerName: "구역", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueGetter: (params) => {
         const areas = dcAreaCmb[params.row.dcCd];
         return areas?.find((v: any) => v.value === params.value)?.label || params.value || '';
      },
      valueOptions: (params) => dcAreaCmb[params.row.dcCd] || [] 
    },
    { 
      field: "zoneCd", 
      headerName: "지역", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueGetter: (params) => {
          const zones = dcAreaZoneCmb[params.row.dcCd]?.[params.row.areaCd];
          return zones?.find((v: any) => v.value === params.value)?.label || params.value || '';
      },
      valueOptions: (params) => dcAreaZoneCmb[params.row.dcCd]?.[params.row.areaCd] || [] 
    },
    { field: "locCd", headerName: "로케이션코드", editable: false, align: "left", width: 120 },
    { field: "linCd", headerName: "행", editable: true, align: "left", width: 100 },
    { field: "rowCd", headerName: "열", editable: true, align: "left", width: 100 },
    { field: "levCd", headerName: "단", editable: true, align: "left", width: 100 },
    { 
      field: "locTypeCd", 
      headerName: "로케이션유형", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: locTypeCdCmb 
    },
    { 
      field: "holdStCd", 
      headerName: "보류상태", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: holdStCdCmb 
    },
    { 
      field: "locPrioord", 
      headerName: "로케이션우선순위", 
      editable: true, 
      align: "right", 
      width: 100, 
      // [에러 해결] 타입 호환성 문제를 위해 as any 사용
      preProcessEditCellProps: gvGridFieldNumberPreEdit as any, 
      valueFormatter: gvGridFieldNumberFormatter, 
      valueParser: gvGridFieldNumberParser 
    },
    { field: "horizontal", headerName: "가로", editable: true, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "vertical", headerName: "세로", editable: true, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "height", headerName: "높이", editable: true, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "cbm", headerName: "체적", editable: false, align: "left", width: 100, valueFormatter: gvGridFieldNumberFormatter, valueParser: gvGridFieldNumberParser },
    { field: "weight", headerName: "중량", editable: true, align: "left", width: 100 },
    { 
      field: "useYn", 
      headerName: "사용여부", 
      editable: true, 
      align: "center", 
      type: "singleSelect", 
      valueFormatter: gvGridDropdownDisLabel, 
      valueOptions: useYnCmb 
    },
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
          <SchTextField id="codeCd" label="코드/명" onChange={onChangeSearch}  />
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