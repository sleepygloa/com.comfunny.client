import React, { useState } from 'react';
import { blogMenu } from "../../contraints";

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
    height: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    transition: 'transform 0.3s ease',
    zIndex: 1000,
    overflowY: 'auto', // 세로 스크롤 활성화
    overflowX: 'hidden', // 가로 스크롤 방지
  },
  closeButton: {
    background: 'none',
    color: '#fff',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0, // 기본 마진 제거
  },
  menuItem: {
    margin: '10px 0',
    cursor: 'pointer',
  },
  submenuList: {
    listStyleType: 'none',
    paddingLeft: '20px',
    marginTop: '5px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleButton: {
    background: 'none',
    color: '#fff',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '0 5px',
  },
};

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [expandedMenu, setExpandedMenu] = useState({}); // 각 메뉴의 열림 상태를 관리

  // 메뉴 토글 핸들러
  const handleToggle = (menuCd, hasChildren, event) => {
    if (hasChildren) {
      event.preventDefault(); // 기본 동작(링크 이동) 막기
      setExpandedMenu((prev) => ({
        ...prev,
        [menuCd]: !prev[menuCd], // 현재 메뉴의 상태를 반전
      }));
    }
  };

  // 재귀적으로 메뉴 항목을 렌더링하는 함수
  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => (
      <li key={item.menuCd} style={styles.menuItem}>
        <a
          href={item.link || '#'}
          style={styles.link}
          onClick={(event) => handleToggle(item.menuCd, item.children && item.children.length > 0, event)}
        >
          {item.label}
          {item.children && item.children.length > 0 && (
            <span>{expandedMenu[item.menuCd] ? '▲' : '▼'}</span>
          )}
        </a>
        {/* 하위 메뉴가 있을 경우 토글 상태에 따라 렌더링 */}
        {item.children && item.children.length > 0 && expandedMenu[item.menuCd] && (
          <ul style={styles.submenuList}>{renderMenuItems(item.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div
      style={{
        ...styles.sidebar,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      <button onClick={toggleSidebar} style={styles.closeButton}>✖</button>
      <h2>메뉴</h2>
      <ul style={styles.menuList}>
        {renderMenuItems(blogMenu)}
      </ul>
    </div>
  );
}
