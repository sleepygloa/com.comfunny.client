import axios from 'axios';

export const API_URL = process.env.NODE_ENV === 'production' ? 'http://www.comfunnydevelopers.com:8080' : "http://localhost:8080";
export const CLINET_URL = process.env.NODE_ENV === 'production' ? 'http://sleepygloa.github.io' : "http://localhost:3000";
export const KAKAO_API_KEY =  process.env.NODE_ENV === 'production' ? '2aff35e452cab69b072002d4f3b9b99e' : "2aff35e452cab69b072002d4f3b9b99e";
export const blogMenu = [
    { menuCd: 220, label: "메인화면", link: "/", thumbnail:"", blog:""},
    { menuCd: 221, label: "Blog", link: "", thumbnail:"", blog:"",
        children:[
            {menuCd: 222, label: "엑셀파일Json변환", link: "/blog/excel/excelfiletojson", thumbnail:"", blog:"",},
            {menuCd: 223, label: "엑셀데이터 Json변환", link: "/blog/excel/exceldatatojson", thumbnail:"", blog:"",},
            {menuCd: 224, label: "문자배열로 문자열 일괄치환", link: "/blog/excel/strarrchangestr", thumbnail:"", blog:"",}
            ]
    },
    { menuCd: 1000, label: "WMS", link: "/wms", thumbnail:"", blog:"",
        children:[
            {menuCd: 1010, label: "시스템관리", link: "/wms/sys/", thumbnail:"", blog:"",
                children:[
                    {menuCd: 1011, label: "환경설정", link: "/wms/sys/setting", thumbnail:"", blog:"",},
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
                    {menuCd: 1051, label: "입고", link: "/wms/ib/inbound", thumbnail:"", blog:"",},
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
                    {menuCd: 1091, label: "출고", link: "/wms/ob/outbound", thumbnail:"", blog:"",},
                    ]
            },
        ]
    },
]
export const client = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    withCredentials: true,
    headers:{
        'Content-Type' : 'application/json'
    }
})

client.interceptors.request.use(
    // function (config) {
    //     const at = sessionStorage.getItem('access_token');
    //     const rt = sessionStorage.getItem('refresh_token');
    //     if (!at || !rt) {
    //         config.headers["access_token"] = null;
    //         config.headers["refresh_token"] = null;
    //         return config
    //     }
    //     config.headers["access_token"] = "Bearer "+at;
    //     config.headers["refresh_token"] = "Bearer "+rt;
    //     return config
    // }
)

client.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
        if(error.response){
            alert('에러가 발생했습니다.' + error.response.data.message);
            if(error.response.status === 401){
                console.log('error.response.status 401');
                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                // sessionStorage.removeItem('access_token');
                // sessionStorage.removeItem('refresh_token');
                // window.location.href = '/';
            }
            if (error.response.status === 403) {
                try {
                    const originalRequest = error.config;
                    const res = await client.get('login/auth/refreshtoken')
                    if (res) {
                        sessionStorage.removeItem('access_token');
                        sessionStorage.removeItem('refresh_token');
                        sessionStorage.setItem('access_token', res.data.accessToken)
                        sessionStorage.setItem('refresh_token', res.data.refreshToken)
                        originalRequest.headers['access_token'] = res.data.accessToken;
                        originalRequest.headers['refresh_token'] = res.data.refreshToken;

                        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                        // 만료일까지의 시간을 계산합니다.
                        var accessTokenDt = new Date();
                        accessTokenDt.setTime(accessTokenDt.getTime() + (res.data.accessTokenDt*1000));
                        var refreshTokenDt = new Date();
                        refreshTokenDt.setTime(refreshTokenDt.getTime() + (res.data.refreshTokenDt*1000));
                        console.log(accessTokenDt, refreshTokenDt)

                        document.cookie = 'accessToken='+res.data.accessToken+'; expires='+accessTokenDt.toUTCString()+' path=/';
                        document.cookie = 'refreshToken='+res.data.refreshToken+'; expires='+refreshTokenDt.toUTCString()+' path=/';
                        return await client.request(originalRequest);
                        }
                } catch (error){
                      sessionStorage.removeItem('access_token');
                      sessionStorage.removeItem('refresh_token');
                      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                      console.log(error);
                }
                return Promise.reject(error)
            }
        }
      return Promise.reject(error)
    }
)

export default client;