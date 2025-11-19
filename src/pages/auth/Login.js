import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
  Grid
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { UserDispatchContext } from "../../context/UserContext";
import { API_URL } from "../../contraints";

// 스타일드 컴포넌트
const LoginButton = styled(Button)(({ theme }) => ({
  margin: "20px 0",
  padding: "12px",
  width: "100%",
  fontWeight: "bold",
  fontSize: "16px",
}));

const SocialButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  fontWeight: "bold",
  justifyContent: "center",
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useContext(UserDispatchContext);
  
  // 로그인 상태 관리
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });
  
  // 오류 상태 관리
  const [errors, setErrors] = useState({
    userId: false,
    password: false,
  });

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    
    // 기본 유효성 검사 (빈 값)
    setErrors({
      ...errors,
      [name]: value.trim() === ""
    });
  };

  // 로그인 처리
  const handleLogin = () => {
    // 필드 검증
    if (!loginData.userId || !loginData.password) {
      setErrors({
        userId: !loginData.userId,
        password: !loginData.password
      });
      alert('아이디와 비밀번호를 입력해주세요');
      return;
    }

    // 로그인 API 호출
    axios.post(`${API_URL}/login/login`, loginData)
      .then(res => {
        const accessTokenDt = new Date();
        accessTokenDt.setTime(accessTokenDt.getTime() + (res.data.accessTokenDt * 1000));
        const refreshTokenDt = new Date();
        refreshTokenDt.setTime(refreshTokenDt.getTime() + (res.data.refreshTokenDt * 1000));

        document.cookie = `accessToken=${res.data.accessToken}; expires=${accessTokenDt.toUTCString()}; path=/;`;
        document.cookie = `refreshToken=${res.data.refreshToken}; expires=${refreshTokenDt.toUTCString()}; path=/;`;
        
        dispatch({ type: 'LOGIN_SUCCESS' });
        navigate('/');
      })
      .catch(error => {
        console.log('로그인 실패:', error);
        alert('로그인에 실패했습니다.');
      });
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ fontWeight: 'bold', mb: 3 }}
          >
            Comfunny Developers
          </Typography>
          
          <TextField
            name="userId"
            label="아이디"
            variant="outlined"
            fullWidth
            margin="normal"
            error={errors.userId}
            helperText={errors.userId ? "아이디를 입력해주세요" : ""}
            onChange={handleInputChange}
          />
          
          <TextField
            name="password"
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={errors.password}
            helperText={errors.password ? "비밀번호를 입력해주세요" : ""}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
            <FormControlLabel 
              control={<Checkbox />} 
              label="로그인 유지하기" 
            />
            <Button 
              color="primary" 
              size="small"
              onClick={() => navigate('/find-account')}
            >
              아이디/비밀번호 찾기
            </Button>
          </Box>
          
          <LoginButton 
            variant="contained" 
            color="primary"
            onClick={handleLogin}
          >
            로그인
          </LoginButton>
          
          <Divider sx={{ width: '100%', my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              또는
            </Typography>
          </Divider>
          
          <Box sx={{ width: '100%' }}>
            <SocialButton 
              variant="contained"
              onClick={() => window.location.assign(`${API_URL}/oauth2/authorization/kakao`)}
              sx={{ 
                backgroundColor: '#FEE500', 
                color: '#000',
                '&:hover': { 
                  backgroundColor: '#E6CF00', 
                } 
              }}
            >
              카카오 계정으로 로그인
            </SocialButton>
            
            <SocialButton 
              variant="contained"
              onClick={() => window.location.assign(`${API_URL}/oauth2/authorization/google`)}
              sx={{ 
                backgroundColor: '#DB4437', 
                color: '#fff',
                '&:hover': { 
                  backgroundColor: '#C13C30', 
                } 
              }}
            >
              구글 계정으로 로그인
            </SocialButton>
            
            <SocialButton 
              variant="contained"
              onClick={() => window.location.assign(`${API_URL}/oauth2/authorization/naver`)}
              sx={{ 
                backgroundColor: '#1EC800', 
                color: '#fff',
                '&:hover': { 
                  backgroundColor: '#19B200', 
                } 
              }}
            >
              네이버 계정으로 로그인
            </SocialButton>
          </Box>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body1">
              회원이 아니신가요?{' '}
              <Button 
                color="primary" 
                component={Link}
                to="/register"
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                회원가입
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}