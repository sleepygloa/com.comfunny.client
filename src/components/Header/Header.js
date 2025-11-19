import React, { useEffect, useState } from "react";
import { API_URL, client } from "../../contraints";
import { useLogin } from "../../context/UserContext";

export default function Header({ toggleSidebar }) {
  const { isLoginPopAction } = useLogin();

  // 조회조건
  const [userInfo, setUserInfo] = useState({
    nickname: null,
    userId: null,
  });

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // 쿠키가 있을 때 유저 정보 가져오기
    const ck = document.cookie;
    let at = '';
    ck.split(';').forEach(function(item) {
      const temp = item.split('=');
      const temp0 = temp[0].trim();
      if (temp0 === 'accessToken') {
        at = temp[1];
      }
    });
    if (at !== '') {
      client.get(`${API_URL}/login/getUserInfo`)
        .then(res => {
          setUserInfo({ ...userInfo, nickname: res.data.nickname, userId: res.data.userId });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const handleProfileChange = () => {
    // 프로필 변경 페이지로 이동
    window.location.href = "/profile";
  };

  const handleLogout = () => {
    // 쿠키 지우고 로그인 페이지로 리디렉션
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
      {/* 사이드바 토글 버튼 */}
      <button 
        onClick={toggleSidebar} 
        style={{ 
          fontSize: '20px',
          marginRight: '10px',
          cursor: 'pointer',
          backgroundColor: '#282c34',
          color: 'white',
          border: '1px solid #444',
          borderRadius: '4px',
          padding: '5px 10px',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#3b3b3b'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#282c34'}
      >
        ☰
      </button>

      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Comfunny Developers</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {userInfo.nickname ? (
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <span style={{ marginRight: '10px' }} onClick={() => setShowMenu(!showMenu)}>{userInfo.nickname}</span>
            <img src="/path/to/user/icon.png" alt="User Icon" style={{ width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <div style={{ position: 'absolute', top: '40px', right: '0', backgroundColor: 'white', color: 'black', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                <ul style={{ listStyle: 'none', margin: '0', padding: '10px' }}>
                  <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleProfileChange}>정보변경</li>
                  <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleLogout}>로그아웃</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={isLoginPopAction.openPop}>
            <span style={{ marginRight: '10px' }}>Guest</span>
            <img src="/path/to/user/icon.png" alt="User Icon" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
          </div>
        )}
      </div>
    </header>
  );
}
