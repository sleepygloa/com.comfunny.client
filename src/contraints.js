import axios from 'axios';

export const API_URL = process.env.NODE_ENV === 'production' ? 'http://www.comfunnydevelopers.com:8090' : "http://localhost:8090";
export const CLINET_URL = process.env.NODE_ENV === 'production' ? 'http://sleepygloa.github.io' : "http://localhost:3000";
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
                    ]
            },
        ]
    },
]
export const client = axios.create({
    baseURL: API_URL,
    timeout: 30000,
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