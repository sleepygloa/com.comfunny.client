import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { DialogActions, DialogContent, Button } from '@mui/material';
import { useModal } from "../../../context/ModalContext"; // .js 제거

// 테마 객체
const themeObj = {
  bgColor: '#FFFFFF', //바탕 배경색
  pageBgColor: '#FFFFFF', //페이지 배경색
  postcodeTextColor: '#C05850', //우편번호 글자색
  emphTextColor: '#222222', //강조 글자색
};

// Props 인터페이스
interface DaumPostcodeCommonProps {
  onComplete?: (data: any) => void;
  onClose?: () => void;
}

export default function DaumPostcodeCommon(props: DaumPostcodeCommonProps) {
  const { closeModal } = useModal();
  const key = 'FIND_CMMN_POST';

  return (
    <>
      <DialogContent>
        <DaumPostcode
          theme={themeObj}
          onComplete={props.onComplete}
          onClose={props.onClose}
          style={{ width: '100%', height: '400px' }} // 높이 지정 필요할 수 있음
        />
      </DialogContent>
      <DialogActions>
          <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
};