import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

// Tailwind CSS를 적용하기 위해 index.css를 import합니다.
// './index.css'는 'src/main.tsx'와 같은 'src' 폴더에 있는 'index.css'를 찾습니다.
import './index.css'; 

// Context Providers (상대 경로로 수정)
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { ModalsProvider } from "./context/ModalContext";
import { CmmnCdProvider } from "./context/CommonDataContext";

// 2개의 메인 컴포넌트 import (상대 경로로 수정)
// (WMS 포탈)
import WmsPortalApp from "./components/App"; 
// (회사 홈페이지)
import CompanyHomepage from "./pages/CompanyHomepage";

// API Configuration
import axios from 'axios';

// Theme configuration (Material-UI 테마)
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 500 },
    h2: { fontWeight: 500 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)'},
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 600, backgroundColor: '#f5f5f5' },
      },
    },
  },
});

// Axios interceptors configuration
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('axios interceptor error ', error);
    if (error.response && error.response.status === 401) {
      console.log('axios interceptor error response status 401');
      if (error.response.data.code === '401') {
        console.log('axios interceptor error response code 401');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * WMS 포탈 앱과 필요한 모든 (MUI 테마, Context) 프로바이더를 래핑하는 컴포넌트입니다.
 */
const WmsPortalWithProviders = () => (
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalsProvider>
          <CmmnCdProvider>
            <WmsPortalApp />
          </CmmnCdProvider>
        </ModalsProvider>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>
);

// Render App with Router
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* URL: '/' -> 회사 홈페이지를 렌더링합니다. (MUI 테마 X, Tailwind CSS O) */}
        <Route path="/" element={<CompanyHomepage />} />
        
        {/* URL: '/portal/*' -> WMS 포탈(모든 프로바이더 포함)을 렌더링합니다. (MUI 테마 O, Tailwind CSS O) */}
        <Route path="/portal/*" element={<WmsPortalWithProviders />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);