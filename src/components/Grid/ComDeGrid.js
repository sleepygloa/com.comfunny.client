import React, {useEffect, useState, useCallback} from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Grid } from '@mui/material';
import SearchBar from "../SearchBar/SearchBar.js";

import { updateModalData, getModalData } from "../../context/ModalContext.js";
import { gvGetRowDataListOfChk } from "../Common.js";


export const ComDeGrid = (props) =>{

  var chkRows = [];

  const title = (props.title) ? props.title : "Data List";
  const height = (props.height) ? props.height : 500;
  const headerHeight = (props.headerHeight) ? props.headerHeight : 30;
  const rowHeight = (props.rowHeight) ? props.rowHeight : 28;
  const footerHeight = (props.footerHeight) ? props.footerHeight : 30;
  
  //그리드 체크박스 선택
  function handleSelectionChange(ids, func) {
    // if(props.setSelRowId) props.setSelRowId(ids);
    chkRows = gvGetRowDataListOfChk(props.dataList, ids)
    if(func) func(chkRows);
  }

  return (
    <>
    {props.onClickSelect || props.onClickAdd || props.onClickSave || props.onClickDel || props.onClickCustom1 || props.onClickCustom2 || props.onClickCustom3? 
      <SearchBar
        onClickSelect={props.onClickSelect ? props.onClickSelect : null} 
        onClickAdd={props.onClickAdd ? props.onClickAdd : null} 
        onClickSave={props.onClickSave ? props.onClickSave : null}
        onClickDel={props.onClickDel ? props.onClickDel : null}

        onClickCustom1={props.onClickCustom1 ? props.onClickCustom1 : null}
        onClickCustomNm1={props.onClickCustomNm1 ? props.onClickCustomNm1 : null}
        onClickCustom2={props.onClickCustom2 ? props.onClickCustom2 : null}
        onClickCustomNm2={props.onClickCustomNm2 ? props.onClickCustomNm2 : null}
        onClickCustom3={props.onClickCustom3 ? props.onClickCustom3 : null}
        onClickCustomNm3={props.onClickCustomNm3 ? props.onClickCustomNm3 : null}
        >
          {props.searchBarChildren ? props.searchBarChildren : <></>}
      </SearchBar>
      :
      <></>
    }
      <Grid item style={{ height: height, width: '100%' }}>
        {
          props.type == "single" ?
            <DataGrid
            /* Default Value */
              title={title} //제목
              headerHeight={headerHeight} //헤더 높이
              rowHeight={rowHeight} //행 높이
              footerHeight={footerHeight}
    
              rows={props.dataList} //dataList
              columns={props.columns} //컬럼 정의
    
              onRowClick={props.onRowClick ? props.onRowClick : null}
              // onCellClick={props.onCellClick ? props.onCellClick : null}
              // onCellClick={handleGridCellClick}
              // selectionModel={props.selRowId} //쎌선택 변수지정
              onCellEditCommit={props.onCellEditCommit ? props.onCellEditCommit : null} //쎌변경시 데이터변경
              // onCellEditCommit={React.useCallback((params) => {
              //     dataList[params.id-1][params.field] = params.value;
              //   },[dataList] //쎌변경시 데이터변경
              // )}
            />
          : ''
        }

        {
          props.type == "multi" ?
            <DataGrid
            /* Default Value */
              title={title} //제목
              headerHeight={headerHeight} //헤더 높이
              rowHeight={rowHeight} //행 높이
              footerHeight={footerHeight}
    
              rows={props.dataList} //dataList
              columns={props.columns} //컬럼 정의
    
              // onCellClick={handleGridCellClick}
              onCellClick={props.onCellClick ? props.onCellClick : null}
              // selectionModel={props.selRowId} //쎌선택 변수지정
              onRowClick={props.onRowClick ? props.onRowClick : null}
              onCellEditCommit={props.onCellEditCommit ? props.onCellEditCommit : null} //쎌변경시 데이터변경

              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(ids) => {handleSelectionChange(ids, props.onChangeChks); }}
            />
          : ''
        }
      </Grid>
    </>
  )

}


export function gvGetRowData(){

}