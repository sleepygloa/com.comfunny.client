import React from "react";
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "@mui/system";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { TabProvider } from "./context/TabContext";
import { UserProvider } from "./context/UserContext";
import { ModalsProvider } from "./context/ModalContext"; //다이얼로그
import { CmmnCdProvider } from "./context/CommonDataContext"; //다이얼로그

//APi
import axios from 'axios';

axios.interceptors.response.use(
  function (response) {
  /*
      http status가 200인 경우
      응답 성공 직전 호출됩니다. 
      .then() 으로 이어집니다.
  */
    return response;
  },
  function (error) {
    console.log('axios interceptor error ', error)
  /*
      http status가 200이 아닌 경우
      응답 에러 직전 호출됩니다.
      .catch() 으로 이어집니다.    
  */
    //401은 Access Token or Refresh Token 이 invalid 될때
    //response data의 code값이 
    // 401 : access Token error , 402: refresh Token error
    if(error.response.status === 401){
      console.log('axios interceptor error response status 401')
      if(error.response.data.code === '401'){
        console.log('axios interceptor error response code 401')
        window.location.href= '/'; 
      }
    }

    
    return Promise.reject(error);
  }
);


const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  // <React.StrictMode>
    <LayoutProvider>
       <UserProvider>
{/* //         <TabProvider> */}
           <ThemeProvider theme={Themes.default}>
            <ModalsProvider>
              <CmmnCdProvider>
                <App />
              </CmmnCdProvider>
            </ModalsProvider>
            </ThemeProvider>
{/* //          </TabProvider> */}
        </UserProvider>
      </LayoutProvider>
  // </React.StrictMode>
); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
