import axios from 'axios';

// 콜백 함수 타입 정의
type RefreshTokenCallback = (success: boolean) => void;

// refreshToken 갱신
export const refreshToken = function(callback?: RefreshTokenCallback | null): void {
    axios.post("/auth/refreshToken", {
        headers: {
            "Content-Type": 'application/json',
        }
    })
    .then(res => {
        console.log("res.data.accessToken : " + res.data);
        
        // axios 헤더 설정에 대한 타입 안전성 확보
        if (axios.defaults.headers.common) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data;
        }

        if (callback) {
            callback(true);
        }

        // 60초 후 재귀 호출 (토큰 주기적 갱신)
        setTimeout(function() {
            refreshToken(null);
        }, (60 * 1000));
    })
    .catch(ex => {
        console.log("app silent requset fail : " + ex);
        if (callback) {
            callback(false);
        }
    })
    .finally(() => {
        console.log("refresh token request end");
        // setLoading(true); // 주석 처리된 코드는 그대로 유지
    });
};