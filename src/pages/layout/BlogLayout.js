import React, {useEffect, useState} from "react";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { useUserLoginPop } from "../../context/UserContext";
import { open, close } from "../../context/ModalContext";

// styles
import useStyles from "./styles";

//Data
import {blogMenu, KAKAO_API_KEY} from "../../contraints";

import Header from "../../components/Header/Header";
import Sb from "../../components/Sidebar/Sb";
import LoginPop from "../login/LoginPop";
import Modals from "../../components/Modal/Modals"


export default function BlogLayout({props}) {
  var classes = useStyles();
  var { isSidebarOpened } = useLayoutState();
  var isLoginPop = useUserLoginPop();

  useEffect(() => {

    // 카카오맵 스크립트 로드
    const scriptId = 'kakao-maps-sdk';
    // 스크립트가 이미 존재하는지 확인
    if (document.getElementById(scriptId)) {
        // 컴포넌트가 언마운트될 때 스크립트 정리
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            document.head.removeChild(existingScript);
        }
        // 이미 존재하면 즉시 resolve
        return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_API_KEY}&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

  }, []);

  return (
    <div className={classes.contents}>
      <Header history={props.history} />
      <Sb menuList={blogMenu}/>
      <div className={isSidebarOpened ? classes.contentsArea : classes.contentsAreaLeftSide}>
        {props}
      </div>
      <LoginPop isOpen={isLoginPop} />
      <Modals />
    </div>
  );
}


