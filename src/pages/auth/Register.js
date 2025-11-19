import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Grid,
  Divider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { API_URL } from "../../contraints";

// 스타일드 컴포넌트
const RegisterButton = styled(Button)(({ theme }) => ({
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

export default function RegisterPage() {
  const navigate = useNavigate();
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    email: ""
  });
  
  // 유효성 검사 상태
  const [errors, setErrors] = useState({
    userId: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
    email: false
  });
  
  // 유효성 검사 메시지
  const [errorMessages, setErrorMessages] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    email: ""
  });

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 기본 유효성 검사
    validateField(name, value);
  };
  
  // 필드별 유효성 검사
  const validateField = (name, value) => {
    let isError = false;
    let message = "";
    
    switch (name) {
      case "userId":
        if (value.trim() === "") {
          isError = true;
          message = "아이디를 입력해주세요";
        } else if (value.length < 4) {
          isError = true;
          message = "아이디는 최소 4자 이상이어야 합니다";
        }
        break;
        
      case "password":
        if (value.trim() === "") {
          isError = true;
          message = "비밀번호를 입력해주세요";
        } else if (value.length < 6) {
          isError = true;
          message = "비밀번호는 최소 6자 이상이어야 합니다";
        }
        
        // 비밀번호 확인 검증 업데이트
        if (formData.passwordConfirm && formData.passwordConfirm !== value) {
          setErrors(prev => ({...prev, passwordConfirm: true}));
          setErrorMessages(prev => ({...prev, passwordConfirm: "비밀번호가 일치하지 않습니다"}));
        } else if (formData.passwordConfirm) {
          setErrors(prev => ({...prev, passwordConfirm: false}));
          setErrorMessages(prev => ({...prev, passwordConfirm: ""}));
        }
        break;
        
      case "passwordConfirm":
        if (value.trim() === "") {
          isError = true;
          message = "비밀번호 확인을 입력해주세요";
        } else if (value !== formData.password) {
          isError = true;
          message = "비밀번호가 일치하지 않습니다";
        }
        break;
        
      case "nickname":
        if (value.trim() === "") {
          isError = true;
          message = "닉네임을 입력해주세요";
        }
        break;
        
      case "email":
        if (value.trim() === "") {
          isError = true;
          message = "이메일을 입력해주세요";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          isError = true;
          message = "유효한 이메일 형식이 아닙니다";
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({...prev, [name]: isError}));
    setErrorMessages(prev => ({...prev, [name]: message}));
    
    return !isError;
  };

  // 전체 폼 유효성 검사
  const validateForm = () => {
    let isValid = true;
    
    // 모든 필드 검증
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  // 회원가입 처리
  const handleRegister = () => {
    if (!validateForm()) {
      alert('입력 정보를 확인해주세요.');
      return;
    }
    
    // API 요청 데이터 준비
    const registerData = {
      userId: formData.userId,
      password: formData.password,
      nickname: formData.nickname,
      email: formData.email
    };

    // 회원가입 API 호출
    axios.post(`${API_URL}/login/saveUser`, registerData, { 
      headers: { "Content-type": "application/json" } 
    })
      .then(() => {
        alert('회원가입에 성공하였습니다.');
        navigate('/login');
      })
      .catch((error) => { 
        console.log(error);
        
        if (error.response && error.response.data && error.response.data.message) {
          alert(`회원가입 실패: ${error.response.data.message}`);
        } else {
          alert('회원가입에 실패했습니다.');
        }
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
            회원가입
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="userId"
                label="아이디"
                variant="outlined"
                fullWidth
                error={errors.userId}
                helperText={errorMessages.userId}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="password"
                label="비밀번호"
                type="password"
                variant="outlined"
                fullWidth
                error={errors.password}
                helperText={errorMessages.password}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                variant="outlined"
                fullWidth
                error={errors.passwordConfirm}
                helperText={errorMessages.passwordConfirm}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="nickname"
                label="닉네임"
                variant="outlined"
                fullWidth
                error={errors.nickname}
                helperText={errorMessages.nickname}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="email"
                label="이메일"
                type="email"
                variant="outlined"
                fullWidth
                error={errors.email}
                helperText={errorMessages.email}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          
          <RegisterButton 
            variant="contained" 
            color="primary"
            onClick={handleRegister}
          >
            회원가입
          </RegisterButton>
          
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
              카카오 계정으로 가입
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
              구글 계정으로 가입
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
              네이버 계정으로 가입
            </SocialButton>
          </Box>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body1">
              이미 계정이 있으신가요?{' '}
              <Button 
                color="primary" 
                component={Link}
                to="/login"
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                로그인
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}