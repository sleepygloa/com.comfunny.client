import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  modal: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.6)',   ///배경에 픽스를 주고 투명도를 준다.
  }, 
  loginModal: {
      width: '480px',
      height: '621px',
      backgroundColor: 'white',
      position: 'relative',
      boxSizing: 'border-box',
      margin: '50px auto',
      padding: '20px',
      background: '#fff',      //로그인 배경이다 
  },
  close: {
    float: 'right',
    fontSize: '25px',
  },
  modalContents: {
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    padding: '0 20px 32px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  signinIcon: {
    width: '150px',
    margin: '0 auto',
  },
  loginId: {
    marginTop: '30px',
    borderRadius: '2px',
    width: '100%',
    height: '40px',
    border: '1px solid #e5e5e5',
    padding: '9px 12px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  // input:placeholder: {
  //   color: '#999999'
  // }
  loginPw: {
    marginTop: '15px',
    borderRadius: '2px',
    width: '100%',
    height: '40px',
    border: '1px solid #e5e5e5',
    padding: '9px 12px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  loginMid: {
    display: 'flex',
    justifyContent: 'å',
    alignItems: 'center',
  },
  autoLogin: {
    fontSize: '12px',
    color: '#8d8d8d',
    lineHeight: '3',
  },
  loginBtn: {
    height: '40px',
    fontSize: '14px',
    padding: '13px 30px',
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    lineHeight: '1px',
    marginTop: '20px',
    marginBottom: '12px',
    borderRadius: '3px',
    borderStyle: 'none',
  },
  socialBox: {
    marginBottom: '30px'
  },
  kakao: {
    backgroundColor: '#feec34',
    borderColor: '#feec34',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    marginBottom: '10px',
    borderRadius: '3px',
  },
  kakaoLogo: {
    width: '24px',
    height: '25px',
  },
  kakaoText: {
    width: '300px',
    fontSize: '15px',
    textAlign: 'center',
    display: 'inline-block',
    boxSizing: 'border-box',
  },
  google: {
    backgroundColor: '#f3f3f3',
    borderColor: '#f3f3f3',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    marginBottom: '10px',
    borderRadius: '3px',
  },
  googleLogo: {
    width: '24px',
    height: '25px',
  },
  googleText: {
    width: '300px',
    fontSize: '15px',
    textAlign: 'center',
    display: 'inline-block',
    boxSizing: 'border-box',
  },
  facebook: {
    backgroundColor: '#21538a',
    borderColor: '#21538a',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    color: '#fff',
    borderRadius: '3px',
  },
  facebookText: {
    paddingTop: '12px',
    width: '310px',
    color: '#fff',
    fontSize: '15px',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  facebookLogo: {
    paddingTop: '7px',
    width: '24px',
    height: '25px',
  },
  loginEnd: {
    textAlign: 'center',
    fontSize: '11px',
  },
  loginLine: {
    color: '#bcbcbc',
    fontSize: '11px',
    marginBottom: '20px',
  },
  loginLineA:{
    color: 'black',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  noUser: {
    textDecoration: 'underline',
  }
}));
