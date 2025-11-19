import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { gvGetRowDataListOfChk } from "../Common.js";

export const ComDeGrid = (props) => {
  // 선택된 행의 ID 저장
  const [selectedIds, setSelectedIds] = useState([]);

  // 데이터 리스트가 변경될 때마다 선택 초기화
  useEffect(() => {
    setSelectedIds([]); // 체크박스 선택 해제
  }, [props.dataList]);

  // 최신 상태의 선택된 행 데이터를 관리하는 함수
  const handleSelectionChange = useCallback((ids) => {
    const selectedRows = gvGetRowDataListOfChk(props.dataList, ids); // 최신 데이터 계산
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
          onClickSelect={props.onClickSelect || null}
          onClickAdd={props.onClickAdd || null}
          onClickSave={props.onClickSave || null}
          onClickDel={props.onClickDel || null}
          onClickCustom1={props.onClickCustom1 || null}
          onClickCustomNm1={props.onClickCustomNm1 || null}
          onClickCustom2={props.onClickCustom2 || null}
          onClickCustomNm2={props.onClickCustomNm2 || null}
          onClickCustom3={props.onClickCustom3 || null}
          onClickCustomNm3={props.onClickCustomNm3 || null}
          onClickCustom4={props.onClickCustom4 || null}
          onClickCustomNm4={props.onClickCustomNm4 || null}
        >
          {props.searchBarChildren || <></>}
        </SearchBar>
      )}

      <Grid item style={{ height: height, width: '100%' }}>
        {props.type === "single" ? (
          <DataGrid
            title={title}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            footerHeight={footerHeight}
            rows={props.dataList}
            columns={props.columns}
            onRowClick={props.onRowClick || null}
            onCellClick={props.onCellClick || null}
            onCellDoubleClick={props.onCellDoubleClick || null} // 더블클릭 이벤트 추가
            onCellEditCommit={props.onCellEditCommit || null}
            onCellEditStop={props.onCellEditStop || null}
          />
        ) : null}

        {props.type === "multi" ? (
          <DataGrid
            title={title}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            footerHeight={footerHeight}
            rows={props.dataList}
            columns={props.columns}
            onCellClick={props.onCellClick || null}
            onRowClick={props.onRowClick || null}
            onCellEditCommit={props.onCellEditCommit || null}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectedIds}
            onSelectionModelChange={(ids) => handleSelectionChange(ids)} // 체크박스 선택 시 호출
          />
        ) : null}
      </Grid>
    </>
  );
};
