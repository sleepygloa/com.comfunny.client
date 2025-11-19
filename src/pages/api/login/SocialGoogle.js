import React from 'react';
import qs from 'qs';
import useStyles from "./styles.js";

export default function SocialGoogle({ onSocial }){
  //Google Login 
  function loginGoogleClickHandler(){
    //Google Login
    const CLIENT_ID = "1";
    const AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";

    //Google Login QueryString
    const queryStr = qs.stringify({
      client_id: CLIENT_ID,
      redirect_uri: window.location.href,
      response_type: "token",
      scope: "https://www.googleapis.com/auth/contacts.readonly",
    });
    const loginUrl = AUTHORIZE_URI + "?" + queryStr;
    window.location.assign(loginUrl);
    return null;
  }; 
  const onSuccess = async(response) => {
    console.log(response);
  }

  const onFailure = (error) => {
      console.log(error);
  }

    return(
        <div className={classes.google}>
            <img
            className={classes.googleLogo}
            src="/Images/SignIn/kakao.png"
            />
            <div className={classes.googleText} onClick={()=>{loginGoogleClickHandler()}}
            >구글 계정으로 신규가입</div>
        </div>
        // <div 
        // onClick={handleGoogleLogin}
        // >
        //     구글 계정으로 신규가입
            // {/* <GoogleLogin
            //     clientId={CLIENT_ID}
            //     responseType={"id_token"}
            //     onSuccess={onSuccess}
            //     onFailure={onFailure}
            //     redirectUri={CLINET_URL}
            //     buttonText='구글 계정으로 신규가입'
            //     /> */}
        // </div>
    )
}