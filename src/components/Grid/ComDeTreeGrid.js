import React, {useEffect, useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";
import {ArrowDropDown, ArrowRight} from '@mui/icons-material';

export const CustomGrid = (props) =>{
  const [value, setValue] = useState();
  const [selRowId, setSelRowId] = useState();
  const [dataList, setDataList] = useState(props.dataList);
  console.log(dataList);
  //재귀 수정
  function gvMakeTreeList(list, parent){
    var returnList = [];
    if(parent === undefined) parent = "0";

    list.filter(list => list.parent === parent).map((listC)=>{
      returnList.push(listC);
      
      var listCC = list.filter(list => listC.child === list.parent);
      if(listCC.length > 0) {
        listC["open"] = 1; //tree 오픈
        gvMakeTreeList(list, listC.child).map((listCC)=>{returnList.push(listCC)})
      }else{
        listC["open"] = -1; //tree 오픈
      }
    });
    return returnList;
  }

  function gvMakeColumn(columns, dataList){
    var addColumn = []
    
    //
    if(props.tree){

      function treeRenderClick(params) {
        const { id, api, field, value } = params;
        // console.log(id, api, field, value);
        if(value == 0){
          api.setEditCellValue({ id, field, value: 1 });
          // api.commitCellChange({ id, field, props: {value : 1} });
        }else{
          api.setEditCellValue({ id, field, value: 0 });
          // api.commitCellChange({ id, field, props: {value : 0} });
        }
      }

      const treeColumns = [{field: "open", headerName: "", width: 50, editable:false,
        renderCell: (params)=>{
          if(`${params.value}` == 0) return <Button  style={{ fontSize: 30 }} readOnly onClick={()=>{ treeRenderClick(params) }} /> 
          if(`${params.value}` == 1) return <Button  style={{ fontSize: 30 }} readOnly onClick={()=>{ treeRenderClick(params) }} /> 
          return '';
        }
      }];
      addColumn = addColumn.concat(treeColumns);
    }else{
      addColumn = addColumn.concat({ field: "id",  headerName: "ID", align:"center", width:20});
    }

    addColumn = addColumn.concat(columns);
    return addColumn;
  }

  return (
    <DataGrid
      checkboxSelection={props.checkboxSelection}
      title={props.title} //제목
      rows={(props.tree ? gvMakeTreeList(props.dataList) : props.dataList)} //dataList
      columns={gvMakeColumn(props.columns, props.dataList)} //컬럼 정의
      headerHeight={(props.height ? props.height : 30)} //헤더 높이
      rowHeight={(props.height ? props.height : 28)} //행 높이
      footerHeight={(props.height ? props.height : 30)} //푸터 높이
      // hideFooter={true}
      paginationMode={'client'} //page 처리 위치
      onRowClick={props.onRowClick} //로우 클릭이벤트
      selectionModel={selRowId} //쎌선택 변수지정
      onCellEditCommit={React.useCallback((params) => {props.dataList[params.id-1][params.field] = params.value;},[props.dataList])} //쎌변경시 데이터변경
    />
  )

}
