import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';
import { useModal } from "../../../context/ModalContext.js";

const themeObj = {
  bgColor: '#FFFFFF', //바탕 배경색
  pageBgColor: '#FFFFFF', //페이지 배경색
  postcodeTextColor: '#C05850', //우편번호 글자색
  emphTextColor: '#222222', //강조 글자색
};

export default function DaumPostcodeCommon(props){
  const { modals, closeModal } = useModal();
  const key = 'FIND_CMMN_POST'

  return (
    <>
      <DialogContent>
        <DaumPostcode
          theme={themeObj}
          onComplete={props.onComplete}
          onClose={props.onClose}
        />
      </DialogContent>
      <DialogActions>
          {/* <Button onClick={() => handleSubmit(key)}>확인</Button> */}
          <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
};
