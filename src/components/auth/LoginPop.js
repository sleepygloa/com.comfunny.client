import React, { useState, useContext } from "react";
import axios from 'axios';
import { 
  Box, 
  Modal, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Divider,
  IconButton,
  Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { UserDispatchContext, useLogin } from "../../context/UserContext";
import { API_URL } from "../../contraints";
import SingupPop from "./SignupPop";

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

const ModalContent = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '400px',
  borderRadius: '8px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function LoginPop({ isOpen }) {
  const dispatch = useContext(UserDispatchContext);
  const { isSignupPopAction, isSignupPop, isLoginPopAction } = useLogin();
  
  // 폼 상태 관리
  const [isUser, setIsUser] = useState({
    userId: "",
    password: "",
  });

  // 입력 핸들러
  const loginUserHandler = (e) => {
    setIsUser({ ...isUser, [e.target.name]: e.target.value });
  };

  // 회원가입 팝업 열기
  const signupPopupHandler = () => {
    isSignupPopAction.openPop();
  };

  // 로그인 처리
  const loginClickHandler = () => {
    if (!isUser.userId || !isUser.password) {
      alert('아이디와 비밀번호를 입력해주세요');
      return;
    }

    axios.post(`${API_URL}/login/login`, isUser)
      .then(res => {
        const accessTokenDt = new Date();
        accessTokenDt.setTime(accessTokenDt.getTime() + (res.data.accessTokenDt * 1000));
        const refreshTokenDt = new Date();
        refreshTokenDt.setTime(refreshTokenDt.getTime() + (res.data.refreshTokenDt * 1000));

        document.cookie = `accessToken=${res.data.accessToken}; expires=${accessTokenDt.toUTCString()}; path=/;`;
        document.cookie = `refreshToken=${res.data.refreshToken}; expires=${refreshTokenDt.toUTCString()}; path=/;`;
        
        dispatch({ type: 'LOGIN_SUCCESS' });
        window.location.href = '/';
      })
      .catch(error => {
        console.log('로그인 실패:', error);
        alert('로그인에 실패했습니다.');
      });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => isLoginPopAction.closePop()}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
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
              onClick={() => isLoginPopAction.closePop()}
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
              Comfunny Developers
            </Typography>
            
            <TextField
              name="userId"
              label="아이디"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={loginUserHandler}
            />
            
            <TextField
              name="password"
              label="비밀번호"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={loginUserHandler}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', my: 1 }}>
              <FormControlLabel 
                control={<Checkbox />} 
                label="로그인 유지하기" 
              />
              <Button color="primary" size="small">
                아이디/비밀번호 찾기
              </Button>
            </Box>
            
            <LoginButton 
              variant="contained" 
              color="primary"
              onClick={loginClickHandler}
            >
              로그인
            </LoginButton>
            
            <Divider sx={{ width: '100%', my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                또는
              </Typography>
            </Divider>
            
            <Box sx={{ width: '100%', mt: 1 }}>
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
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                회원이 아니신가요?{' '}
                <Button 
                  color="primary" 
                  onClick={signupPopupHandler}
                  sx={{ 
                    padding: '0 4px', 
                    fontWeight: 'bold',
                    textTransform: 'none' 
                  }}
                >
                  회원가입
                </Button>
              </Typography>
            </Box>
          </ModalContent>
        </Box>
      </Modal>

      {isSignupPop && <SingupPop isOpen={isSignupPop} />}
    </>
  );
}