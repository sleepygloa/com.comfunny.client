import React, { useState, useEffect } from 'react';

// components
import {SchTextField, GridDateRenderField, SchDateField, FieldRow} from "../../../components/SearchBar/CmmnTextField.js";
import { ComDeGrid } from "../../../components/Grid/ComDeGrid.js";

//Common
import {client} from '../../../contraints.js';
import { gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvGridLevelDropdownDisLabel, 
  gvSetLevelDropdownData ,
  gvGridLevel2DropdownDisLabel, 
  gvSetLevel2DropdownData ,
  gvGetToday,
  gvGridFieldNumberPreEdit,
  gvGridFieldNumberFormatter,
  gvGridFieldNumberParser , 
  gvGetRowDataListOfChk,
  gvDataGridAddRowAndStatus
} from "../../../components/Common.js";

//CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";
import InboundPlanPop from "./InboundPlanPop.js";

export default function InboundPlan() {
  const {menuTitle} = '입고예정';
  const PRO_URL = '/wms/ib/inboundPlan';
  const {openModal} = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();

  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  const [selDtlRowId, setSelDtlRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  const [dataDtlList, setDataDtlList] = useState([]); //

  //입고전표컬럼
  const columns = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    // { field: "dcCd",              headerName: "물류창고",      editable: false, align:"left", width:120},
    { field: "dcNm",              headerName: "물류창고",      editable: false, align:"left", width:120},
    { field: "ibNo",              headerName: "입고번호",         editable: false, align:"left", width:130},
    // { field: "clientCd",          headerName: "고객사코드",       editable: false, align:"left", width:120},
    { field: "clientNm",          headerName: "고객사",       editable: false, align:"left", width:120},
    // { field: "ibGbnCd",           headerName: "입고구분코드",     editable: false, align:"left", width:120},
    { field: "ibGbnNm",           headerName: "입고구분",     editable: false, align:"left", width:120},
    // { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "ibProgStNm",        headerName: "입고진행상태",   editable: false, align:"left", width:100},
    { field: "ibPlanYmd",         headerName: "입고예정일자",     editable: false, align:"left", width:150,
      // valueSetter: (params) => {return GridDateSetField(params, 'dealEndYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "ibYmd",             headerName: "입고일자",       editable: false, align:"left", width:150,
      // valueSetter: (params) => {return GridDateSetField(params, 'dealEndYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    // { field: "poNo",              headerName: "발주번호",       editable: false, align:"left", width:100},
    // { field: "poYmd",             headerName: "발주일자",       editable: false, align:"left", width:100},
    // { field: "supplierCd",        headerName: "공급처코드",     editable: false, align:"left", width:100},
    { field: "supplierNm",        headerName: "공급처",     editable: false, align:"left", width:100},
    // { field: "carNo",             headerName: "차량번호",       editable: false, align:"left", width:100},
    // { field: "tcObNo",            headerName: "이고출고번호",     editable: false, align:"left", width:100},
    // { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    // { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    // { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    // { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    // { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    // { field: "useYn",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "useYnNm",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];
  //입고전표컬럼
  const columnsDtl = [
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},
    { field: "ibDetailSeq",       headerName: "순번",       editable: false, align:"right", width:60},
    // { field: "ibProgStCd",        headerName: "입고진행상태코드",   editable: false, align:"left", width:100},
    { field: "ibProgStNm",        headerName: "진행상태",   editable: false, align:"left", width:100},
    { field: "itemCd",            headerName: "상품코드",   editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",   editable: false, align:"left", width:300},
    // { field: "itemStCd",          headerName: "상품상태코드",   editable: false, align:"left", width:100},
    { field: "itemStNm",          headerName: "상품상태",   editable: false, align:"left", width:100},
    // { field: "poUomCd",           headerName: "발주단위코드",   editable: false, align:"left", width:100},
    // { field: "poQty",             headerName: "발주수량",   editable: false, align:"left", width:100},
    { field: "pkqty",             headerName: "입수",      editable: false,  align:"center", width:100,},
    { field: "planTotQty",           headerName: "예정(총)",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params),},
    { field: "planBoxQty",           headerName: "예정(박스)",   editable: false, align:"right", width:100},
    { field: "planEaQty",           headerName: "예정(낱개)",   editable: false, align:"right", width:100},
    // { field: "confQty",           headerName: "확정",   editable: false, align:"right", width:60},
    // { field: "apprQty",           headerName: "승인",   editable: false, align:"right", width:60},
    // { field: "examQty",           headerName: "검수",   editable: false, align:"right", width:60},
    // { field: "instQty",           headerName: "지시",   editable: false, align:"right", width:60},
    // { field: "putwQty",           headerName: "적치",   editable: false, align:"right", width:60},

    // { field: "noIbRsnCd",         headerName: "미입고사유코드",   editable: false, align:"left", width:100},
    { field: "ibCost",            headerName: "입고단가",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params),
    },
    { field: "ibVat",             headerName: "입고VAT",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params),
    },
    { field: "ibAmt",             headerName: "입고금액",   editable: false, align:"right", width:100,
      valueFormatter: (params) => gvGridFieldNumberFormatter(params),
    },
    { field: "makeLot",           headerName: "제조LOT",   editable: false, align:"left", width:150},
    { field: "makeYmd",           headerName: "제조일자",   editable: false, align:"left", width:150,
      // valueSetter: (params) => {return GridDateSetField(params, 'dealEndYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: false, align:"left", width:150,
      // valueSetter: (params) => {return GridDateSetField(params, 'dealEndYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "lotId",             headerName: "LOT_ID",   editable: false, align:"left", width:150},
    // { field: "lotAttr1",          headerName: "LOT속성1",   editable: false, align:"left", width:100},
    // { field: "lotAttr2",          headerName: "LOT속성2",   editable: false, align:"left", width:100},
    // { field: "lotAttr3",          headerName: "LOT속성3",   editable: false, align:"left", width:100},
    // { field: "lotAttr4",          headerName: "LOT속성4",   editable: false, align:"left", width:100},
    // { field: "lotAttr5",          headerName: "LOT속성5",   editable: false, align:"left", width:100},

    // { field: "tcObDetailSeq",     headerName: "이고출고상세순번",     editable: false, align:"left", width:100},
    // { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    // { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    // { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    // { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    // { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    // { field: "useYn",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "useYnNm",             headerName: "사용여부",         editable: false, align:"left", width:100},
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];

  //조회조건
  const [schValues, setSchValues] = useState({ 
    ibNo: "", 
    ibPlanYmd : gvGetToday()
  });
  //조회조건
  const onChangeSearch = (event, id) => {
    setSchValues({ ...schValues, [id]: event });
  };
  const onKeyDown = (e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        fnSearch();
        return;
    }
  }
  const initData = {
    id:dataList.length+1,
    useYn: "Y",
  }

  const initDataDtl = {
    id:dataDtlList.length+1,
    useYn: "Y",
  }
  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);
  const [valuesDtl, setValuesDtl] = useState(initDataDtl);

  useEffect(() => {
  }, []);


  //조회
  const fnSearch = () => {
    setDataDtlList([]);

    var data = {
      ibNo : schValues.ibNo,
      ibPlanYmd : schValues.ibPlanYmd,
    };
    client.post(`${PRO_URL}/selectInboundPlanList`, data, {})
      .then(res => {
        var list = res.data;
        setDataList(list);

        if(list.length > -1){
          setSelRowId(1);
          fnSearchDtl(list[0]);
        }

      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //상세조회
  const fnSearchDtl = (rowData) => {
    setSelRowId(rowData.id);
    client.post(`${PRO_URL}/selectInboundPlanDetailList`, rowData, {})
      .then(res => {
        var list = res.data;
        setDataDtlList(list);

        if(list.length > -1){
          setSelDtlRowId(1);
        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }


  //조회 클릭
  function onClickSelect(){
    fnSearch();
  }

  //신규클릭
  //입고예정팝업
  function onClickAdd(){
    openModal('INBOUND_PLAN_POP', '입고예정 팝업', <InboundPlanPop />, handleInboundPlanUpdate, '1200px', '750px');
  }

  //조회 클릭(상세)
  function onClickDtlSelect(){
    fnSearchDtl(values);
  }

  //입고예정팝업 팝업 콜백함수
  const handleInboundPlanUpdate = (props) => {
    fnSearch();
  };

  return (
    <>
      <ComDeGrid
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        searchBarChildren={
          <FieldRow>
            <SchTextField id="ibNo" label="입고번호/명" onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <SchDateField id="ibPlanYmd" label="입고예정일" selected={schValues.ibPlanYmd} onChange={onChangeSearch} />
          </FieldRow>
        }

        title={"Inbound List"} //제목
        dataList={dataList} //dataList
        columns={columns} //컬럼 정의
        height={"250px"}
        //Event
        // selRowId={selRowId} //쎌선택 변수지정
        // setSelRowId={setSelRowId}
        onRowClick={(params)=>{setSelRowId(params.id); fnSearchDtl(params.row)}}
        
        //Multi
        type={"single"}
      />

      <ComDeGrid

        title={"Inbound Detail List"} //제목
        dataList={dataDtlList} //dataList
        columns={columnsDtl} //컬럼 정의
        //Event
        onRowClick={(params)=>{setSelDtlRowId(params.id)}}
        // onCellEditCommit={handleEditCellChangeCommitted} //쎌변경시 데이터변경
        
        type={"single"}
      />
    </>
  );
}
