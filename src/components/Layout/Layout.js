import React, {useEffect, useState} from "react";
import classnames from "classnames";
import {Box, IconButton, Link} from '@mui/material'

//icons

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
// import Sb from "../Sidebar/Sb";
import CustomTabs from "../Tabs/CustomTabs";

import client from '../../contraints';

// context
import { useLayoutState } from "../../context/LayoutContext";
import Modals from "../Modal/Modals";
import {gvSeData} from '../Common'

function Layout(props) {
    var classes = useStyles();

  // global
    var layoutState = useLayoutState();

  //MenuList

  //메뉴 데이터 변수
    const [structure, setStructure] = useState([]); //메뉴리스트

  //화면 로드시 1번만 실행
    useEffect(() => {
      setStructure([]);

      //시스템 데이터 조회
      client.get(`/api/sys/index/selectSysData`)
      .then(res => {

        gvSeData.userId = res.data.sUserId;
        gvSeData.bizCd = res.data.sBizCd;
      }).catch(error => {
          console.log(error);
      })

      //메뉴리스트 조회
      client.get(`/api/sys/menu/selectAuthMenu`)
      .then(res => {
          var menuList = res.data;
          console.log('check menuList', menuList);
        // var menuConcat = menuList.concat(templatesStructure);
          setStructure(structure => structure.concat(menuList));
      }).catch(error => {
          console.log(error);
      })
        
    }, []);

    return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          
          {/* <Sb  menuList={structure}/> */}
          {/* <Sidebar /> */}
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <CustomTabs/>

          </div>
          <Modals />
        </>
    </div>
  );
}

export default Layout;
