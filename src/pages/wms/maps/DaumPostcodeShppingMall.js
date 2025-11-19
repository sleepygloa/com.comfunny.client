import React, { useCallback, useState, useEffect } from 'react';
import { Box, TextField, IconButton, Grid, Button, DialogActions, DialogContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DaumPostcodeCommon from "./DaumPostcodeCommon.js";
import { useModal } from "../../../context/ModalContext.js";

function DaumPostcodeShppingMall(props) {
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const modalKey = 'FIND_ADDR';

  // 주소 관련 상태 관리
  const [zonecode, setZonecode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [deliveryNm, setDeliveryNm] = useState('');
  const [coordinates, setCoordinates] = useState({ longitude: '', latitude: '' });

  // 카카오 지도 로드 및 초기 설정
  useEffect(() => {
    window.kakao.maps.load(() => {
      if (!window.kakao.maps.services) return;

      const container = document.getElementById('map');
      const lat = coordinates.latitude || 37.5665;
      const lng = coordinates.longitude || 126.9780;
      const mapOptions = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
        draggable: false,
      };
      
      const map = new window.kakao.maps.Map(container, mapOptions);
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map: map,
      });

      const geocoder = new window.kakao.maps.services.Geocoder();
      const searchAddress = roadAddress || jibunAddress;
      if (searchAddress) {
        geocoder.addressSearch(searchAddress, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const newCoords = { longitude: result[0].x, latitude: result[0].y };
            setCoordinates(newCoords);
            updateModalData(modalKey, {
              zip: zonecode,
              roadAddr: roadAddress,
              jibunAddr: jibunAddress,
              detailAddr: detailedAddress,
              deliveryNm: deliveryNm,
              lat: newCoords.latitude,
              lon: newCoords.longitude,
            });

            const newPosition = new window.kakao.maps.LatLng(newCoords.latitude, newCoords.longitude);
            marker.setPosition(newPosition);
            map.setCenter(newPosition);
          }
        });
      }
    });
  }, [roadAddress, jibunAddress]);

  // 주소 선택 시 값 업데이트
  const completeHandler = useCallback((data) => {
    const { zonecode, roadAddress, jibunAddress, autoRoadAddress, autoJibunAddress, buildingName } = data;

    setZonecode(zonecode);
    setRoadAddress(roadAddress || autoRoadAddress);
    setJibunAddress(jibunAddress || autoJibunAddress);
    setDeliveryNm(buildingName);

    updateModalData(modalKey, {
      zip: zonecode,
      roadAddr: roadAddress,
      jibunAddr: jibunAddress,
      detailAddr: detailedAddress,
      deliveryNm: deliveryNm,
      ...coordinates,
    });

    closeModal('FIND_CMMN_POST');
  }, [updateModalData, closeModal, detailedAddress, deliveryNm, coordinates]);

  // 입력 필드 변경 핸들러
  const inputChangeHandler = (e) => {
    const { id, value } = e.target;
    if (id === 'deliveryNm') setDeliveryNm(value);
    if (id === 'detailAddr') setDetailedAddress(value);
    updateModalData(modalKey, { ...getModalData(modalKey), [id]: value });
  };

  // 모달 제출 핸들러
  const handleSubmit = () => {
    const modalInfo = modals[modalKey];
    if (modalInfo.callback && typeof modalInfo.callback === 'function') {
      const result = modalInfo.callback(modalInfo.data);
      if (result === false) return;
    }
    closeModal(modalKey);
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="우편번호" variant="outlined" value={zonecode} InputProps={{ readOnly: true }} fullWidth />
              <IconButton onClick={() => openModal('FIND_CMMN_POST', '우편번호 찾기', <DaumPostcodeCommon onComplete={completeHandler} />, null, '600px', '800px')} aria-label="search address">
                <SearchIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="도로명주소" variant="outlined" value={roadAddress} InputProps={{ readOnly: true }} fullWidth />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="지번주소" variant="outlined" value={jibunAddress} InputProps={{ readOnly: true }} fullWidth />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="상세주소" variant="outlined" value={detailedAddress} onChange={inputChangeHandler} fullWidth id="detailAddr" />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="배송처명" variant="outlined" value={deliveryNm} onChange={inputChangeHandler} fullWidth id="deliveryNm" />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="경도" variant="outlined" value={coordinates.longitude} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="위도" variant="outlined" value={coordinates.latitude} InputProps={{ readOnly: true }} fullWidth />
              <IconButton onClick={() => console.log('Geocoding...')} aria-label="search geocoding">
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>확인</Button>
        <Button onClick={() => closeModal(modalKey)}>닫기</Button>
      </DialogActions>
    </>
  );
}

export default DaumPostcodeShppingMall;
