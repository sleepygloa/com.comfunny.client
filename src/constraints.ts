import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// 주의: 일반 TS/JS 파일에서는 React Hook(useOpenModal 등)을 사용할 수 없습니다.
// import { useOpenModal } from './context/ModalContext'; 

// Vite 환경 변수 문법으로 수정 (process.env -> import.meta.env)
export const API_URL = import.meta.env.MODE === 'production' ? '/api' : "http://localhost:8080/api";
export const KAKAO_API_KEY = import.meta.env.MODE === 'production' ? '2aff35e452cab69b072002d4f3b9b99e' : "2aff35e452cab69b072002d4f3b9b99e";

// 블로그 메뉴 데이터 (사용자 제공 코드 복원)
export const blogMenu = [
    { menuCd: 221, label: "MyWork", link: "", thumbnail:"", blog:"",
        children:[
            {menuCd: 222, label: "ExcelFile To Json", link: "/blog/excel/excelfiletojson", thumbnail:"", blog:"",},
            {menuCd: 223, label: "ExcelData To Json", link: "/blog/excel/exceldatatojson", thumbnail:"", blog:"",},
            {menuCd: 224, label: "문자배열 TO 문자열 치환", link: "/blog/excel/strarrchangestr", thumbnail:"", blog:"",},
            {menuCd: 224, label: "유튜브영상 다운로드", link: "/blog/youtubeDownloader", thumbnail:"", blog:"",}
            ]
    },
    { menuCd: 1000, label: "WMS", link: "/wms", thumbnail:"", blog:"",
        children:[
            {menuCd: 1010, label: "시스템관리", link: "/wms/sys/", thumbnail:"", blog:"",
                children:[
                    {menuCd: 1012, label: "코드관리", link: "/wms/sys/code", thumbnail:"", blog:"",},
                    {menuCd: 1013, label: "스케쥴관리", link: "/wms/sys/scheduler", thumbnail:"", blog:"",},
                    ]
            },
            {menuCd: 1020, label: "기준정보", link: "/wms/sd/", thumbnail:"", blog:"",
                children:[
                    {menuCd: 1021, label: "사업자", link: "/wms/sd/biz", thumbnail:"", blog:"",},
                    {menuCd: 1022, label: "고객사", link: "/wms/sd/client", thumbnail:"", blog:"",},
                    {menuCd: 1023, label: "물류창고", link: "/wms/sd/dc", thumbnail:"", blog:"",},
                    {menuCd: 1024, label: "구역", link: "/wms/sd/area", thumbnail:"", blog:"",},
                    {menuCd: 1025, label: "지역", link: "/wms/sd/zone", thumbnail:"", blog:"",},
                    {menuCd: 1026, label: "로케이션", link: "/wms/sd/loc", thumbnail:"", blog:"",},
                    {menuCd: 1027, label: "배송처", link: "/wms/sd/store", thumbnail:"", blog:"",},
                    {menuCd: 1028, label: "공급처", link: "/wms/sd/supplier", thumbnail:"", blog:"",},
                    {menuCd: 1029, label: "상품", link: "/wms/sd/item", thumbnail:"", blog:"",},
                    {menuCd: 1030, label: "상품분류", link: "/wms/sd/itemClass", thumbnail:"", blog:"",},
                    {menuCd: 1031, label: "상품단위", link: "/wms/sd/itemUom", thumbnail:"", blog:"",},
                    {menuCd: 1032, label: "3D Loc", link: "/wms/vr/3dLoc", thumbnail:"", blog:"",},
                    ]
            },
            {menuCd: 1050, label: "입고관리", link: "/wms/ib/", thumbnail:"", blog:"",
                children:[
                    {menuCd: 1051, label: "입고현황", link: "/wms/ib/inboundInq", thumbnail:"", blog:"",},
                    {menuCd: 1052, label: "입고예정", link: "/wms/ib/inboundPlan", thumbnail:"", blog:"",},
                    {menuCd: 1053, label: "입고검수", link: "/wms/ib/inboundExam", thumbnail:"", blog:"",},
                    {menuCd: 1054, label: "입고적치", link: "/wms/ib/inboundPutw", thumbnail:"", blog:"",},
                    ]
            },
            {menuCd: 1070, label: "재고관리", link: "/wms/st/", thumbnail:"", blog:"",
                children:[
                    {menuCd: 1071, label: "재고이동", link: "/wms/st/stockMove", thumbnail:"", blog:"",},
                    {menuCd: 1080, label: "제품별 재고현황", link: "/wms/st/stockInqueryByItem", thumbnail:"", blog:"",},
                    {menuCd: 1081, label: "로케이션별 재고현황", link: "/wms/st/stockInqueryByLoc", thumbnail:"", blog:"",},
                    ]
            },
            {menuCd: 1090, label: "출고관리", link: "/wms/st/", thumbnail:"", blog:"",
                children:[
                    {menuCd: 1092, label: "출고예정", link: "/wms/ob/outboundPlan", thumbnail:"", blog:"",},
                    {menuCd: 1093, label: "출고지시", link: "/wms/ob/outboundAllot", thumbnail:"", blog:"",},
                    {menuCd: 1094, label: "출고피킹", link: "/wms/ob/outboundPicking", thumbnail:"", blog:"",},
                    ]
            },
        ]
    },
];

export const client = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    withCredentials: true,
    headers:{
        'Content-Type' : 'application/json'
    }
});

// Request Interceptor
client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 필요시 요청 헤더에 토큰 추가 로직
        return config;
    }, 
    (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
client.interceptors.response.use(
    function (response: AxiosResponse) {
        return response
    },
    async function (error: AxiosError) {
        if(error.response){
            // 401 Unauthorized: 토큰 만료 등으로 인한 로그아웃 처리
            if(error.response.status === 401){
                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                // sessionStorage.removeItem('access_token');
                // sessionStorage.removeItem('refresh_token');
                // window.location.href = '/';
            }
            // 403 Forbidden: 토큰 재발급 시도
            if (error.response.status === 403) {
                try {
                    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
                    
                    // 무한 루프 방지 (옵션)
                    if (originalRequest._retry) {
                        return Promise.reject(error);
                    }
                    originalRequest._retry = true;

                    // 재발급 요청
                    const res = await client.get('login/auth/refreshtoken')
                    if (res) {
                        sessionStorage.removeItem('access_token');
                        sessionStorage.removeItem('refresh_token');
                        sessionStorage.setItem('access_token', res.data.accessToken)
                        sessionStorage.setItem('refresh_token', res.data.refreshToken)
                        
                        // 헤더에 새로운 토큰 설정
                        if(originalRequest.headers) {
                            originalRequest.headers['access_token'] = res.data.accessToken;
                            originalRequest.headers['refresh_token'] = res.data.refreshToken;
                        }

                        // 쿠키 갱신
                        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                        var accessTokenDt = new Date();
                        accessTokenDt.setTime(accessTokenDt.getTime() + (res.data.accessTokenDt*1000));
                        var refreshTokenDt = new Date();
                        refreshTokenDt.setTime(refreshTokenDt.getTime() + (res.data.refreshTokenDt*1000));
                        
                        document.cookie = 'accessToken='+res.data.accessToken+'; expires='+accessTokenDt.toUTCString()+' path=/';
                        document.cookie = 'refreshToken='+res.data.refreshToken+'; expires='+refreshTokenDt.toUTCString()+' path=/';
                        
                        // 실패했던 요청 재시도
                        return await client.request(originalRequest);
                    }
                } catch (err){
                    // 재발급 실패 시 로그아웃 처리
                    sessionStorage.removeItem('access_token');
                    sessionStorage.removeItem('refresh_token');
                    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    console.log(err);
                }
                return Promise.reject(error)
            }
        }
      return Promise.reject(error)
    }
)

export default client;