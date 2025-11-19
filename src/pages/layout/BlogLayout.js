import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // Outlet을 통해 중첩된 라우트 렌더링

// page
import Header from "../../components/Header/Header";
import { useLogin } from "../../context/UserContext";
import LoginPop from "../../pages/login/LoginPop";
import Modals from "../../components/Modal/Modals";
import Sidebar from "../../components/Sidebar/Sidebar";

// Data
import { KAKAO_API_KEY } from "../../contraints";

export default function BlogLayout() {
  const { isLoginPop } = useLogin();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  useEffect(() => {
    const scriptId = "kakao-maps-sdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_API_KEY}&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      return () => {
        if (script) document.head.removeChild(script);
      };
    }
  }, [isLoginPop]);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpened} toggleSidebar={toggleSidebar} />
      <LoginPop isOpen={isLoginPop} />
      <Modals />

      {/* 중첩된 라우트를 위한 Outlet */}
      <main style={{ padding: "20px", marginTop: "60px" }}>
        <Outlet />
      </main>
    </div>
  );
}
