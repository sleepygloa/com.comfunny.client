import React, { useEffect, useState, useCallback } from "react";
import { DataGrid, GridColDef, GridRowId, GridCallbackDetails, GridRowParams, GridCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { SearchBar } from "../SearchBar/SearchBar"; // .js 확장자 제거
import { gvGetRowDataListOfChk } from "../Common"; // .js 확장자 제거

// Props 인터페이스 정의
interface ComDeGridProps {
  dataList: any[];
  columns: GridColDef[];
  onChangeChks?: (selectedRows: any[]) => void;
  title?: string;
  height?: number | string;
  headerHeight?: number;
  rowHeight?: number;
  footerHeight?: number;
  type?: "single" | "multi";
  
  // SearchBar 관련 Props
  onClickSelect?: () => void;
  onClickAdd?: () => void;
  onClickSave?: () => void;
  onClickDel?: () => void;
  onClickCustom1?: () => void;
  onClickCustomNm1?: string;
  onClickCustom2?: () => void;
  onClickCustomNm2?: string;
  onClickCustom3?: () => void;
  onClickCustomNm3?: string;
  onClickCustom4?: () => void;
  onClickCustomNm4?: string;
  searchBarChildren?: React.ReactNode;

  // DataGrid 이벤트 핸들러
  onRowClick?: (params: GridRowParams) => void;
  onCellClick?: (params: GridCellParams) => void;
  onCellDoubleClick?: (params: GridCellParams) => void;
  onCellEditCommit?: (params: any) => void; // DataGrid 버전에 따라 타입이 다를 수 있음 (GridCellEditCommitParams 등)
  onCellEditStop?: (params: any) => void;
}

export const ComDeGrid: React.FC<ComDeGridProps> = (props) => {
  // 선택된 행의 ID 저장
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);

  // 데이터 리스트가 변경될 때마다 선택 초기화
  useEffect(() => {
    setSelectedIds([]); // 체크박스 선택 해제
  }, [props.dataList]);

  // 최신 상태의 선택된 행 데이터를 관리하는 함수
  const handleSelectionChange = useCallback((ids: GridRowSelectionModel) => {
    // ids는 GridRowId[] 타입 (number | string)[]
    const selectedRows = gvGetRowDataListOfChk(props.dataList, ids as (string | number)[]); // 최신 데이터 계산
    setSelectedIds(ids); // 선택된 ID 업데이트
    // props.onChangeChks가 최신 상태를 참조할 수 있도록 처리
    if (props.onChangeChks) {
      props.onChangeChks(selectedRows); // 선택된 행 데이터가 있을 경우 콜백 함수 호출
    }
  }, [props.dataList, props.onChangeChks]);

  // 기본 그리드 설정값 정의
  const title = props.title || "Data List"; // 그리드 제목
  const height = props.height || 500; // 그리드 높이
  const headerHeight = props.headerHeight || 30; // 헤더 높이
  const rowHeight = props.rowHeight || 28; // 행 높이
  const footerHeight = props.footerHeight || 30; // 푸터 높이
  
  return (
    <>
      {/* SearchBar가 필요한 경우 표시 */}
      {(props.onClickSelect || props.onClickAdd || props.onClickSave || props.onClickDel || props.onClickCustom1 || props.onClickCustom2 || props.onClickCustom3) && (
        <SearchBar
          onClickSelect={props.onClickSelect}
          onClickAdd={props.onClickAdd}
          onClickSave={props.onClickSave}
          onClickDel={props.onClickDel}
          onClickCustom1={props.onClickCustom1}
          onClickCustomNm1={props.onClickCustomNm1}
          onClickCustom2={props.onClickCustom2}
          onClickCustomNm2={props.onClickCustomNm2}
          onClickCustom3={props.onClickCustom3}
          onClickCustomNm3={props.onClickCustomNm3}
          onClickCustom4={props.onClickCustom4}
          onClickCustomNm4={props.onClickCustomNm4}
        >
          {props.searchBarChildren || <></>}
        </SearchBar>
      )}

      <Grid item style={{ height: height, width: '100%' }}>
        {props.type === "single" ? (
          <DataGrid
            // title prop은 DataGrid 표준 prop이 아닐 수 있음 (버전에 따라 다름). 필요 시 커스텀 헤더 사용 고려
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            footerHeight={footerHeight}
            rows={props.dataList}
            columns={props.columns}
            onRowClick={props.onRowClick}
            onCellClick={props.onCellClick}
            onCellDoubleClick={props.onCellDoubleClick} // 더블클릭 이벤트 추가
            // onCellEditCommit은 v5 이하에서 사용됨. v6 이상에서는 processRowUpdate 사용 권장
            // 호환성을 위해 any로 처리하거나 버전에 맞춰 수정 필요
            {...((props.onCellEditCommit ? { onCellEditCommit: props.onCellEditCommit } : {}) as any)}
            {...((props.onCellEditStop ? { onCellEditStop: props.onCellEditStop } : {}) as any)}
          />
        ) : null}

        {props.type === "multi" ? (
          <DataGrid
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            footerHeight={footerHeight}
            rows={props.dataList}
            columns={props.columns}
            onCellClick={props.onCellClick}
            onRowClick={props.onRowClick}
            {...((props.onCellEditCommit ? { onCellEditCommit: props.onCellEditCommit } : {}) as any)}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={selectedIds} // v6 이상은 rowSelectionModel, v5는 selectionModel
            onRowSelectionModelChange={(ids) => handleSelectionChange(ids)} // 체크박스 선택 시 호출
          />
        ) : null}
      </Grid>
    </>
  );
};