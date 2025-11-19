import React, { useState } from "react";
import axios from 'axios';
import { 
  Box, 
  Modal, 
  Typography, 
  TextField, 
  Button, 
  IconButton,
  Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useLogin } from "../../context/UserContext";
import { API_URL } from "../../contraints";

// 스타일드 컴포넌트
const SignupButton = styled(Button)(({ theme }) => ({
  margin: "20px 0",
  padding: "12px",
  width: "100%",
  fontWeight: "bold",
  fontSize: "16px",
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '400px',
  borderRadius: '8px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function SignupPop({ isOpen }) {
  const { isSignupPopAction } = useLogin();
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: ""
  });
  
  // 유효성 검사 상태
  const [errors, setErrors] = useState({
    userId: false,
    password: false,
    passwordConfirm: false,
    nickname: false
  });

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 기본 유효성 검사 (빈 값)
    setErrors({
      ...errors,
      [name]: value.trim() === ""
    });
    
    // 비밀번호 확인 체크
    if (name === "passwordConfirm" || name === "password") {
      if (name === "passwordConfirm") {
        setErrors({
          ...errors,
          passwordConfirm: formData.password !== value
        });
      } else {
        setErrors({
          ...errors,
          passwordConfirm: formData.passwordConfirm !== "" && formData.passwordConfirm !== value
        });
      }
    }
  };

  // 회원가입 처리
  const handleSignup = () => {
    // 모든 필드가 채워졌는지 확인
    const emptyFields = Object.keys(formData).filter(key => key !== "passwordConfirm" && formData[key].trim() === "");
    
    if (emptyFields.length > 0) {
      setErrors({
        ...errors,
        ...emptyFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      });
      alert('모든 필드를 채워주세요.');
      return;
    }
    
    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      setErrors({
        ...errors,
        passwordConfirm: true
      });
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // API 요청 데이터 준비
    const signupData = {
      userId: formData.userId,
      password: formData.password,
      nickname: formData.nickname
    };

    // 회원가입 API 호출
    axios.post(`${API_URL}/login/saveUser`, signupData, { 
      headers: { "Content-type": "application/json" } 
    })
      .then(() => {
        isSignupPopAction.closePop();
        alert('회원가입에 성공하였습니다.');
      })
      .catch((error) => { 
        console.log(error);
        alert('회원가입에 실패했습니다.');
      });
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => isSignupPopAction.closePop()}
      aria-labelledby="signup-modal-title"
      aria-describedby="signup-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <ModalContent elevation={3}>
          <IconButton
            aria-label="close"
            onClick={() => isSignupPopAction.closePop()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography variant="h5" component="h2" align="center" sx={{ mb: 3 }}>
            회원가입
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
          />
          
          <TextField
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={errors.passwordConfirm}
            helperText={errors.passwordConfirm ? "비밀번호가 일치하지 않습니다" : ""}
            onChange={handleInputChange}
          />
          
          <TextField
            name="nickname"
            label="닉네임"
            variant="outlined"
            fullWidth
            margin="normal"
            error={errors.nickname}
            helperText={errors.nickname ? "닉네임을 입력해주세요" : ""}
            onChange={handleInputChange}
          />
          
          <SignupButton 
            variant="contained" 
            color="primary"
            onClick={handleSignup}
          >
            회원가입
          </SignupButton>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              이미 계정이 있으신가요?{' '}
              <Button 
                color="primary" 
                onClick={() => {
                  isSignupPopAction.closePop();
                }}
                sx={{ 
                  padding: '0 4px', 
                  fontWeight: 'bold',
                  textTransform: 'none' 
                }}
              >
                로그인
              </Button>
            </Typography>
          </Box>
        </ModalContent>
      </Box>
    </Modal>
  );
}