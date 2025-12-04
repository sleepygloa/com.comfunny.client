import React, { useEffect, useState, useCallback } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material"; // Box 추가

// Components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SchTextField } from "../../../components/SearchBar/CmmnTextField";

// Common
import { client } from '../../../constraints'; 
import { gvGridDropdownDisLabel, gvGetRowData } from "../../../components/Common";
import { useModal } from "../../../context/ModalContext";

// --- 인터페이스 정의 ---

interface SchedulerData {
  id: number;
  scheSeq?: number;
  scheNm: string;
  scheDesc: string;
  scheClassPath: string;
  scheSec: string;
  scheMin: string;
  scheHour: string;
  scheDay: string;
  scheMonth: string;
  scheYear: string;
  useYn: string;
  bizCd?: string;
  [key: string]: any;
}

// 콤보박스 데이터
const useYnCmb = [{ value: "Y", label: "사용" }, { value: "N", label: "미사용" }];

export default function Scheduler() {
  const menuTitle = '스케쥴 리스트';
  const { openModal } = useModal();

  // 상태 관리
  const [selRowId, setSelRowId] = useState<GridRowId>(-1);
  const [dataList, setDataList] = useState<SchedulerData[]>([]);
  const [schValues, setSchValues] = useState({ codeCd: "" });
  
  // 선택된 행 데이터
  const [values, setValues] = useState<SchedulerData>({
    id: 0,
    scheNm: "",
    scheDesc: "",
    scheClassPath: "",
    scheSec: "",
    scheMin: "",
    scheHour: "",
    scheDay: "",
    scheMonth: "",
    scheYear: "",
    useYn: "Y",
  });

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", align: "center", width: 20 },
    { field: "scheSeq", headerName: "순번", editable: true, align: "center", width: 50 },
    { field: "scheNm", headerName: "스케쥴명", editable: true, align: "left", width: 300 },
    { field: "scheDesc", headerName: "스케쥴설명", editable: true, align: "left", width: 300 },
    { field: "scheClassPath", headerName: "스케쥴클래스파일경로", editable: true, align: "left", width: 300 },
    { field: "scheSec", headerName: "초", editable: true, align: "left", width: 50 },
    { field: "scheMin", headerName: "분", editable: true, align: "left", width: 100 },
    { field: "scheHour", headerName: "시", editable: true, align: "left", width: 50 },
    { field: "scheDay", headerName: "일", editable: true, align: "left", width: 50 },
    { field: "scheMonth", headerName: "월", editable: true, align: "left", width: 50 },
    { field: "scheYear", headerName: "연", editable: true, align: "left", width: 50 },
    { 
      field: "useYn", headerName: "사용여부", editable: true, 
      align: "center",
      type: "singleSelect",
      valueOptions: useYnCmb,
      valueFormatter: gvGridDropdownDisLabel,
    },
  ];

  // 초기 조회
  useEffect(() => {
    fnSearch();
  }, []);

  // 조회 조건 변경
  const onChangeSearch = (value: any, id?: string) => {
    if (id) {
        setSchValues({ ...schValues, [id]: value });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fnSearch();
    }
  };

  // 조회 함수
  const fnSearch = () => {
    const data = { codeCd: schValues.codeCd };
    client.post(`/wms/sys/scheduler/selectSchedulerList`, data)
      .then(res => {
        setDataList(res.data);
      }).catch(error => { 
        console.log('error = ' + error); 
      })
  }

  // 버튼 이벤트 핸들러
  const onClickSelect = () => {
    fnSearch();
  }

  const onClickAdd = () => {
    const newId = dataList.length > 0 ? Math.max(...dataList.map(d => d.id)) + 1 : 1;
    const newItem: SchedulerData = {
      id: newId,
      bizCd: 'COMFUNNY_DEVELOPERS',
      scheNm: "",
      scheDesc: "",
      scheClassPath: "",
      scheSec: "",
      scheMin: "",
      scheHour: "",
      scheDay: "",
      scheMonth: "",
      scheYear: "",
      useYn: "Y",
    };
    setDataList(prev => [...prev, newItem]);
  }

  const onClickSave = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '저장 하시겠습니까?', () => {
        client.post(`/wms/sys/scheduler/saveScheduler`, rowData)
          .then(res => {
            // alert('저장되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = ' + error); 
          })
    });
  }

  const onClickDel = () => {
    const rowData = gvGetRowData(dataList, selRowId);
    if (!rowData) return;

    openModal('', '', '삭제 하시겠습니까?', () => {
        client.post(`/wms/sys/scheduler/deleteScheduler`, rowData)
          .then(res => {
            // alert('삭제되었습니다.')
            fnSearch();
          }).catch(error => { 
            console.log('error = ' + error); 
          })
    });
  }

  // 셀 수정 커밋 핸들러
  const handleCellEditCommit = useCallback((params: any) => {
    setDataList((prevList) => prevList.map((row) => {
      if (row.id === params.id) {
        return { ...row, [params.field]: params.value };
      }
      return row;
    }));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <PageTitle title={menuTitle} />
      
      <SearchBar
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave} 
        onClickDel={onClickDel}
      >
        <SchTextField 
          id="codeCd" 
          label='코드/명'
          onChange={onChangeSearch} 
        />    
      </SearchBar>
      
      {/* DataGrid 영역 */}
      <Box sx={{ flex: 1, mt: 2, minHeight: 0, width: '100%' }}>
        <DataGrid
          rows={dataList}
          columns={columns}
          headerHeight={30}
          rowHeight={28}
          onRowClick={(params) => {
              setSelRowId(params.id);
              setValues(params.row as SchedulerData);
          }}
          selectionModel={selRowId !== -1 ? [selRowId] : []}
          onCellEditCommit={handleCellEditCommit}
        />
      </Box>
    </Box>
  );
}