import React, { useState, useEffect, useCallback } from 'react';

// 컴포넌트 import
import { Box, Grid } from '@mui/material';
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";
import { SchTextField, GridDateRenderField, SchDateField, FieldRow } from "../../../components/SearchBar/CmmnTextField.js";


// 공통 함수 import
import { client } from '../../../contraints.js';
import { gvGridDropdownDisLabel, 
  gvGridFieldNumberFormatter, 
  gvGridFieldNumberPreEdit, 
  gvGridFieldNumberParser,
  gvGetRowDataListOfChk,
  gvGetToday
} from "../../../components/Common.js";

// 컨텍스트 및 모달 import
import { useCommonData } from "../../../context/CommonDataContext.js";
import { useModal } from "../../../context/ModalContext.js";

export default function OutboundAllot() {
  const { menuTitle } = '출고할당'; // 메뉴 타이틀 설정
  const PRO_URL = '/wms/ob/outboundAllot'; // API URL
  const { openModal } = useModal(); // 모달 컨텍스트 가져오기
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();

  // 상태 관리
  const [selRowId, setSelRowId] = useState(null); // 선택된 메인 그리드 행 ID
  const [selDtlRowId, setSelDtlRowId] = useState();

  const [dataList, setDataList] = useState([]); // 메인 그리드 데이터
  const [dataDtlList, setDataDtlList] = useState([]); // 상세 그리드 데이터

  const [schValues, setSchValues] = useState({ 
    obNo: "", 
    obPlanYmd: gvGetToday() 
  }); // 검색 조건
  // 선택된 상세 데이터 체크 상태
  const [dtlChkRows, setDtlChkRows] = useState([]);

  // 메인 그리드 컬럼 정의
  const columns = [
    { field: "id",        headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "dcNm",      headerName: "물류창고", editable: false, align: "left", width: 120 },
    { field: "clientNm",  headerName: "회원사", editable: false, align: "left", width: 120 },
    { field: "obNo",      headerName: "출고번호", editable: false, align: "left", width: 150 },
    { field: "obGbnNm",   headerName: "출고구분", editable: false, align: "left", width: 120 },
    { field: "obProgStNm", headerName: "출고진행상태", editable: false, align: "left", width: 100 },
    { field: "obPlanYmd", headerName: "출고예정일자", editable: false, align: "left", width: 150, renderCell: (params) => <GridDateRenderField params={params} /> },
    { field: "obYmd",     headerName: "출고일자", editable: false, align: "left", width: 150, renderCell: (params) => <GridDateRenderField params={params} /> },
    { field: "storeNm",   headerName: "배송처", editable: false, align: "left", width: 250 },
    { field: "useYnNm",   headerName: "사용여부", editable: false, align: "left", width: 100 },
    { field: "remark",    headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  // 상세 그리드 컬럼 정의
  const columnsDtl = [
    { field: "id",          headerName: "ID", editable: false, align: "center", width: 20 },
    { field: "obDetailSeq", headerName: "순번", editable: false, align: "right", width: 60 },
    { field: "obProgStNm",  headerName: "진행상태", editable: false, align: "left", width: 100 },
    { field: "itemCd",      headerName: "상품코드", editable: false, align: "left", width: 100 },
    { field: "itemNm",      headerName: "상품명", editable: false, align: "left", width: 250 },
    { field: "itemStNm",    headerName: "상품상태", editable: false, align: "left", width: 100 },
    { field: "pkqty",       headerName: "입수", editable: false, align: "center", width: 100, 
      valueFormatter: gvGridFieldNumberFormatter 
    },
    { field: "planTotQty",  headerName: "예정(총)", editable: false, align: "right", width: 100, 
      valueFormatter: gvGridFieldNumberFormatter 
    },
    { field: "planBoxQty",  headerName: "예정(박스)", editable: false, align: "right", width: 100, 
      valueFormatter: gvGridFieldNumberFormatter 
    },
    { field: "allotTotQty", headerName: "할당(총)", editable: false, align: "right", width: 100, 
      valueFormatter: gvGridFieldNumberFormatter 
    },
    { field: "allotBoxQty", headerName: "할당(박스)", editable: false, align: "right", width: 100, 
      valueFormatter: gvGridFieldNumberFormatter 
    },
    { field: "obCost",      headerName: "출고단가", editable: false, align: "right", width: 100, 
      valueFormatter: gvGridFieldNumberFormatter
    },
    { field: "obAmt",       headerName: "출고금액", editable: false, align: "right", width: 100, 
      valueFormatter: gvGridFieldNumberFormatter 
    },
    { field: "makeLot",     headerName: "제조LOT", editable: false, align: "left", width: 150 },
    { field: "distExpiryYmd", headerName: "유통기한일자", editable: false, align: "left", width: 150, 
      renderCell: (params) => <GridDateRenderField params={params} /> 
    },
    { field: "useYnNm",     headerName: "사용여부", editable: false, align: "left", width: 100 },
    { field: "remark",      headerName: "비고", editable: false, align: "left", width: 300 },
  ];

  // 검색 조건 변경 핸들러
  const onChangeSearch = (event, id) => {
    setSchValues((prev) => ({ ...prev, [id]: event }));
  };

  // 검색 실행
  const fnSearch = () => {
    const data = { 
      obNo: schValues.obNo, 
      obPlanYmd: schValues.obPlanYmd 
    };
    client.post(`${PRO_URL}/selectOutboundAllotList`, data)
      .then((res) => {
        const list = res.data;
        setDataList(list);
        if (list.length > 0) {
          setSelRowId(list[0].id);
          fnSearchDtl(list[0]);
        }
      })
      .catch((error) => {
        console.error('조회 중 에러:', error);
      });
  };

  // 상세 조회
  const fnSearchDtl = (rowData) => {
    client.post(`${PRO_URL}/selectOutboundAllotDetailList`, rowData)
      .then((res) => {
        setDataDtlList(res.data);
      })
      .catch((error) => {
        console.error('상세 조회 중 에러:', error);
      });
  };

  // 할당 완료
  const onClickAllotCompl = () => {
    openModal('', '', '출고할당을 완료하시겠습니까?', () => {
      const rowData = dataList.find(row => row.id === selRowId);
      client.post(`${PRO_URL}/saveAllotCompt`, rowData)
        .then((res) => {
          if(res.data.stsCd && res.data.stsCd != 200){
            openModal('', 'A', res.data.msgTxt);
            return;
          }

          openModal('', 'I', '출고할당이 완료되었습니다.');
          fnSearch();
        })
        .catch((error) => {
          console.error('할당 완료 중 에러:', error);
        });
    });
  };

  //출고할당취소 클릭(상세)
  function onClickAllotComplCncl(){
    openModal('', '',  '출고할당취소 하시겠습니까?', 
      () => {
        const rowData = dataList.find(row => row.id === selRowId);
        client.post(`${PRO_URL}/saveAllotComptCncl`,rowData, {})
          .then((res) => {
            if(res.data.stsCd && res.data.stsCd != 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '출고할당취소 되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }


  //할당 클릭(상세)
  function onClickItemAllot(){
    openModal('', '',  '할당 하시겠습니까?', 
      () => {
        var data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows)
        client.post(`${PRO_URL}/saveAllotByItem`, {data:data})
          .then((res) => {
            console.log(res.data)
            if(res.data.stsCd && res.data.stsCd != 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '할당 되었습니다.');
            fnSearchDtl(dataList.find(row => row.id === selRowId));
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //할당취소 클릭(상세)
  function onClickItemAllotCncl(){
    openModal('', '',  '할당취소 하시겠습니까?', 
      () => {
        var data = gvGetRowDataListOfChk(dataDtlList, dtlChkRows)
        client.post(`${PRO_URL}/saveAllotCnclByItem`,{data:data})
          .then((res) => {
            console.log(res.data)
            if(res.data.stsCd && res.data.stsCd != 200){
              openModal('', 'A', res.data.msgTxt);
              return;
            }
            openModal('', 'I', '할당취소 되었습니다.');
            fnSearchDtl(dataList.find(row => row.id === selRowId));
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //쎌변경시 데이터 변경
  const handleEditCellChangeCommitted = React.useCallback(

    //가로, 세로, 높이 수정시 체적 계산
    ({ id, field, value }) => {
      if (['allotBoxQty', 'allotEaQty'].includes(field)) {
        const updatedRows = dataDtlList.map((row) => {
          if (row.id === id) {
            const newFieldValues = {
              ...row,
              [field]: Number(value),
            };
            // Calculate new volume
            newFieldValues.allotTotQty = newFieldValues.allotBoxQty * newFieldValues.pkqty + newFieldValues.allotEaQty;
            newFieldValues.allotQty = newFieldValues.allotBoxQty * newFieldValues.pkqty + newFieldValues.allotEaQty;
            return newFieldValues;
          }
          return row;
        });
        setDataDtlList(updatedRows);
      }

      dataDtlList[id-1][field] = value
    },
    [dataDtlList],
  );

  return (
    <>
      {/* 메인 그리드 */}
      <ComDeGrid
        onClickSelect={fnSearch}
        onClickCustom1={onClickAllotCompl}
        onClickCustomNm1="할당완료"
        onClickCustom2={onClickAllotComplCncl}
        onClickCustomNm2={'할당완료취소'}
        searchBarChildren={
          <FieldRow>
            <SchTextField id="obNo" label="출고번호/명" div="4" onChange={onChangeSearch} />
            <SchDateField id="obPlanYmd" label="출고예정일" div="4" selected={schValues.obPlanYmd} onChange={onChangeSearch} />
          </FieldRow>
        }

        height={'250px'}
        title={"Outbound List"} //제목
        dataList={dataList} //dataList
        columns={columns} //컬럼 정의
        //Event
        // selRowId={selRowId} //쎌선택 변수지정
        // setSelRowId={setSelRowId}
        onRowClick={(params)=>{setSelRowId(params.id); fnSearchDtl(params.row)}}
        
        //Multi
        type={"single"}
      />

      {/* 상세 그리드 */}
      <ComDeGrid
        onClickCustom1={onClickItemAllot}
        onClickCustomNm1={'할당'}
        onClickCustom2={onClickItemAllotCncl}
        onClickCustomNm2={'할당취소'}
        
        title={"Outbound Detail List"} //제목
        dataList={dataDtlList} //dataList
        columns={columnsDtl} //컬럼 정의
        //Event
        // onCellClick={handleGridCellClick}
        onRowClick={(params) => setSelDtlRowId(params.id)}
        // onCellEditCommit={handleEditCellChangeCommitted} //쎌변경시 데이터변경
        
        //Multi
        type={"multi"}
        onChangeChks={(chkRows) => setDtlChkRows(chkRows.map(item => item.id))}
      />
    </>
  );
}
