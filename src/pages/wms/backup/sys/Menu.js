import React, {useEffect, useState} from "react";
// import { makeStyles } from "@mui/styles";
import {client} from '../../contraints';

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBar from "../../components/SearchBar/SearchBar";
import {SchTextField, TextFieldDefault} from "../../components/SearchBar/Components/TextFieldDefault"
import {LabelTitle} from "../../components/SearchBar/Components/LabelDefault"
import { Grid } from "@mui/material";
import { gvGetRowData, gvMakeTreeList} from "../../components/Common";

//tree
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles } from '@mui/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web'; // web.cjs is required for IE 11 support


import MyModal from "../../components/Modal/MyModal.js";
import useModal from "../../components/Modal/useModal";
import Radio from "@mui/material/Radio";

 
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
}))

export default function Menu(props) {
  const menuTitle = props.menuNm;
  const classes = useStyles();

  const {openModal} = useModal();

  //메뉴 데이터 변수
  const [menuList, setMenuList] = useState([]); //메뉴리스트

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);  
  const [selProRowId, setProSelRowId] = useState(-1);  

  //Search Data
  const [schValues, setSchValues] = useState({ 
    menuNm: "", 
  });

  //트리구조 펼침함수
  const [expanded, setExpanded] = useState([]);


  let radioChecked = [1];
  const proColumns = [
    {   field: "radiobutton",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <Radio checked={radioChecked[0] === params.id} value={params.id} />
    )},
    { field: "id",        headerName: "ID",        align:"center", width:20},
    { field: "proCd",     headerName: "프로그램코드", align:"center", width:120},
    { field: "proNm",     headerName: "프로그램명",   width:200},
    { field: "url",       headerName: "URL",       width:300},
  ];
  
  //data COLUMN 과 동일시 시켜야함
  //데이터 핸들링하는 rowData Column들.
  const initData = { 
    id : 0,

    //자신메뉴코드
    menuCd: "", 
    children: "",

    //부모메뉴코드
    topParentMenu: "",
    parent: "",
    upMenuCd: "",
    lv : 1,

    url: "",
    menuId:"",

    //메뉴명
    menuNm: "",
    label: "", 
    value: "",
    name: "",

    icon: "",
    ordr : 0,
    useYn : ""
  }
  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);

  //화면 로드시 1번만 실행
  //화면로딩시 조회
  useEffect(() => {
    fnSearch();

  }, []);

  //조회클릭
  const fnSearch = () => {
    //메뉴리스트 조회
    client.post(
      `/api/sys/menu/selectMenuList`,
      schValues,
      {}
      )
      .then(res => {
        fnLoadTreeData(res.data.list);
        setMenuList(res.data.list);

        //셀 포커스
        if(selRowId > -1){
          setValues(gvGetRowData(res.data.list, selRowId));
        }else{
          setValues(initData);
        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //트리구조 화면세팅
  function fnLoadTreeData(list){
      //펼침조건 지정
      var expandedArr = ['0'];
      for(var i = 0; i < list.size(); i++){
        expandedArr.push(list[i].id);
      }
      setExpanded(expandedArr);
  }

  //조회 클릭
  function onClickSelect(){
    fnSearch();
  }

  //신규클릭
  function onClickAdd(){
    //추가 유효성 확인
    if(selRowId === -1){
      //선택된행 없다면
      //DESC : 최상위메뉴로 만들어져야하는데, 버그가있음
      return;
    }

    //새 rowdata 저장
    var addData = {
      id : (menuList.length + 1).toString(),
      menuCd : "",
      child: "",
      upMenuCd : "",
      lv : 1,

      children :null,

      menuId :"",
      value : "추가메뉴",
      label : "추가메뉴",
      name : "추가메뉴",
      menuNm : "추가메뉴",
  
      url : "",
      icon : "",
      ordr : 9999,
      useYn : "Y"
    };

    //선택된행 rowdata 가져오기.
    var rowData = gvGetRowData(menuList, selRowId);
    var upMenuCd = (rowData ? rowData.menuCd : "0");
    addData.topParentMenu = upMenuCd;
    addData.parent = upMenuCd;
    addData.upMenuCd = upMenuCd;
    //rowData == undefined 최상위메뉴
    if(!rowData){
      //맨 마지막에 추가
      setMenuList(menuList => menuList.concat(addData));
    //rowData != undefined 일반메뉴
    }else{
      if(!rowData && rowData.lv >= 4) {
        alert("하위메뉴를 추가 할 수 없습니다. 4단계까지만 추가가능합니다.");
        return;
      }
      addData.lv = rowData.lv + 1;

      //선택된 행 다음에 추가
      setMenuList(menuList => menuList.concat(addData));
    }

    //트리 리로딩
    fnLoadTreeData(menuList);
  }

  //저장클릭
  function onClickSave(){
    console.log('저장 클릭')
    openModal(MyModal, {
      title:"",
      content:"저장하시겠습니까?",
      onSubmit: () => {
        console.log('저장',values)
        //메뉴리스트 저장
        client.post(
          `/api/sys/menu/saveMenu`,
          values
          )
          .then(res => {
            alert('저장되었습니다.');
            fnSearch();
            // fnLoadTreeData(res.data.list);
            // setValues(initData);
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }

  //삭제클릭
  function onClickDel(){
    console.log('삭제 클릭')
    openModal(MyModal, {
      title:"",
      content:"삭제하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/menu/deleteMenu`,
          values,
          {
          }
          )
          .then(res => {
            alert('삭제되었습니다.')
            fnSearch();
            // fnLoadTreeData(res.data.list);
            // setValues(initData);
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }


  //키보드 입력 이벤트
  //조회조건
  const onChangeSearch = (event) => {
    setSchValues({ ...values, [event.target.id]: event.target.value });
  };
  //row Data
  const onChagneHandle = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };


  //그리드 행 선택 이벤트
  function gridSelected(e, nodeIds){
    //선택된 행 저장
    setSelRowId(nodeIds);

    //데이터셋 세팅
    if(nodeIds <= 0){
      setValues({});
    }else{
        setValues(gvGetRowData(menuList, nodeIds));
    }
  }
  const [selectionModel, setSelectionModel] = React.useState(radioChecked);
  radioChecked = selectionModel;

  return (
    <>
      <PageTitle title={menuTitle} 
      />
      <SearchBar
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}
      >
          <SchTextField id="schMenuNm" label='메뉴' onChange={onChangeSearch} value={schValues.menuNm} />
      </SearchBar>
      
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ height: 500, width: '100%', overflowY: 'auto'  }}>
          <TreeView
            className={classes.root}
            // defaultExpanded={expanded}
            expanded={expanded}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            // defaultEndIcon={<CloseSquare />}
            onNodeSelect={gridSelected}
          >
            {renderTree(fnRecursive(menuList))}
          </TreeView>
        </Grid>
        <Grid item xs={8} >
          <Grid style={{ height: '50%', width: '100%', display:'flex', flexWrap:'wrap', alignContent:'baseline'}}>
            <LabelTitle text="메뉴정보" h="formTitle" />
            <TextFieldDefault required={true} id="upMenuCd" labeling label='부모메뉴코드'  value={values.upMenuCd} />
            <TextFieldDefault required={true} id="menuCd" labeling label='메뉴코드'  value={values.menuCd} />
            <TextFieldDefault required={true} id="menuId" labeling label='메뉴id' onChagneHandle={onChagneHandle} value={values.menuId} />
            <TextFieldDefault required={true} id="menuNm" labeling label='메뉴명' onChagneHandle={onChagneHandle} value={values.menuNm}  />
            <TextFieldDefault required={true} id="url" labeling label='URL' onChagneHandle={onChagneHandle} value={values.url} />
            <TextFieldDefault required={true} id="ordr" labeling label='순서' onChagneHandle={onChagneHandle} value={values.ordr} />
            <TextFieldDefault required={true} id="useYn" labeling label='사용여부' onChagneHandle={onChagneHandle} value={values.useYn} />
          </Grid>
          {/* <Grid item xs={12} style={{ height: '50%', width: '100%' }}>
            <DataGrid 
              title={"Program List"}
              rows={proList}
              columns={proColumns}
              headerHeight={40}
              rowHeight={28}

              selectionModel={selectionModel}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
                console.log('12',newSelectionModel)
              }}
              // onCellDoubleClick={fnGridDbClick}
            />
          </Grid> */}
        </Grid>
      </Grid>
      
      
      {/* <BizDetailPop isOpen={isOpen} setIsOpen={setIsOpen} id={id} flag={modalStatusFlag} /> */}
    </>
    
  );
}


//#########################################

//Tree Rendering Function
const renderTree = (nodes) => {
  if (!Array.isArray(nodes.children) || !nodes.children.length) {
    // children does not exist, isn't an array, or is an array with length 0
    return <TreeItem key={nodes.id} nodeId={(""+nodes.id).toString()} label={nodes.name} />;
  }

  // children is legit, return the recursed version
  return (
    <TreeItem key={nodes.id} nodeId={(""+nodes.id).toString()} label={nodes.label}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );
};

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

// function CloseSquare(props) {
//   return (
//     <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
//       {/* tslint:disable-next-line: max-line-length */}
//       <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
//     </SvgIcon>
//   );
// }

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

// const StyledTreeItem = withStyles((theme) => ({
//   iconContainer: {
//     '& .close': {
//       opacity: 0.3,
//     },
//   },
//   group: {
//     marginLeft: 7,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
//   },
// }))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

//메뉴관리에서 사용하는 함수
//데이터테이블 To 트리 구조,
//treeview에서는 최상위구조, id : 0 의 자식들로 구성해야한다.
  function fnRecursive(list){
    return {
                id : 0
              , label : '최상위메뉴'
              , children : gvMakeTreeList(list, '0')
              // , children : list
            }
  }