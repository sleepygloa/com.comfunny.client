import React, { useCallback, useState, useEffect } from 'react';
import { Box, TextField, IconButton, Grid, Button, DialogActions, DialogContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// Mock DaumPostcodeCommon for demonstration if not available, or import real one
import DaumPostcodeCommon from "./DaumPostcodeCommon"; 
import { useModal } from "../../../context/ModalContext"; // .js 제거

// window 객체에 kakao가 있음을 명시 (TypeScript용)
declare global {
  interface Window {
    kakao: any;
  }
}

interface DaumPostcodeShppingMallProps {
  onComplete?: (data: any) => void; // 부모 컴포넌트(Store.tsx 등)에서 전달받는 콜백
}

function DaumPostcodeShppingMall(props: DaumPostcodeShppingMallProps) {
  // useModal에서 필요한 함수들 가져오기 (타입 정의는 Context 파일 참조)
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
    // window.kakao가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        if (!window.kakao.maps.services) return;

        const container = document.getElementById('map');
        if (!container) return; // map 컨테이너가 없을 경우 안전장치

        const lat = Number(coordinates.latitude) || 37.5665;
        const lng = Number(coordinates.longitude) || 126.9780;
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
          geocoder.addressSearch(searchAddress, (result: any[], status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const newCoords = { longitude: result[0].x, latitude: result[0].y };
              setCoordinates(newCoords);
              
              // 모달 데이터 업데이트
              if(updateModalData) {
                  updateModalData(modalKey, {
                    zip: zonecode,
                    roadAddr: roadAddress,
                    jibunAddr: jibunAddress,
                    detailAddr: detailedAddress,
                    deliveryNm: deliveryNm,
                    lat: newCoords.latitude,
                    lon: newCoords.longitude,
                  });
              }

              const newPosition = new window.kakao.maps.LatLng(newCoords.latitude, newCoords.longitude);
              marker.setPosition(newPosition);
              map.setCenter(newPosition);
            }
          });
        }
      });
    }
  }, [roadAddress, jibunAddress, coordinates.latitude, coordinates.longitude, zonecode, detailedAddress, deliveryNm, updateModalData]);

  // 주소 선택 시 값 업데이트
  const completeHandler = useCallback((data: any) => {
    const { zonecode, roadAddress, jibunAddress, autoRoadAddress, autoJibunAddress, buildingName } = data;

    setZonecode(zonecode);
    setRoadAddress(roadAddress || autoRoadAddress);
    setJibunAddress(jibunAddress || autoJibunAddress);
    setDeliveryNm(buildingName);

    // 모달 데이터 업데이트 (좌표는 아직 업데이트 전일 수 있으므로 기존 좌표 사용)
    if(updateModalData) {
        updateModalData(modalKey, {
        zip: zonecode,
        roadAddr: roadAddress || autoRoadAddress,
        jibunAddr: jibunAddress || autoJibunAddress,
        detailAddr: detailedAddress,
        deliveryNm: buildingName,
        ...coordinates,
        });
    }

    closeModal('FIND_CMMN_POST');
  }, [updateModalData, closeModal, detailedAddress, coordinates]);

  // 입력 필드 변경 핸들러
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'deliveryNm') setDeliveryNm(value);
    if (id === 'detailAddr') setDetailedAddress(value);
    
    // 현재 모달 데이터 가져와서 업데이트
    if(updateModalData && getModalData) {
        updateModalData(modalKey, { ...getModalData(modalKey), [id]: value });
    }
  };

  // 모달 제출 핸들러 (확인 버튼)
  const handleSubmit = () => {
    // props.onComplete가 있으면 호출 (부모 컴포넌트로 데이터 전달)
    if (props.onComplete) {
        props.onComplete({
            zip: zonecode,
            roadAddr: roadAddress,
            jibunAddr: jibunAddress,
            detailAddr: detailedAddress,
            deliveryNm: deliveryNm,
            lat: coordinates.latitude,
            lon: coordinates.longitude
        });
    }

    // ModalContext의 콜백 처리 (기존 로직 유지)
    if (modals && modals[modalKey]) {
        const modalInfo = modals[modalKey];
        if (modalInfo.callback && typeof modalInfo.callback === 'function') {
            // 현재 상태 데이터를 콜백으로 전달
            const resultData = {
                zip: zonecode,
                roadAddr: roadAddress,
                jibunAddr: jibunAddress,
                detailAddr: detailedAddress,
                deliveryNm: deliveryNm,
                lat: coordinates.latitude,
                lon: coordinates.longitude
            };
            const result = modalInfo.callback(resultData);
            if (result !== undefined && result === false) {
                return;
            }
        }
    }
    
    closeModal(modalKey);
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="우편번호" variant="outlined" value={zonecode} InputProps={{ readOnly: true }} fullWidth size="small" />
              <IconButton 
                onClick={() => openModal('FIND_CMMN_POST', '우편번호 찾기', <DaumPostcodeCommon onComplete={completeHandler} />, undefined, '600px', '800px')} 
                aria-label="search address"
              >
                <SearchIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="도로명주소" variant="outlined" value={roadAddress} InputProps={{ readOnly: true }} fullWidth size="small" />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="지번주소" variant="outlined" value={jibunAddress} InputProps={{ readOnly: true }} fullWidth size="small" />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="상세주소" variant="outlined" value={detailedAddress} onChange={inputChangeHandler} fullWidth id="detailAddr" size="small" />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <TextField label="배송처명" variant="outlined" value={deliveryNm} onChange={inputChangeHandler} fullWidth id="deliveryNm" size="small" />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '10px', gap: 1 }}>
              <TextField label="경도" variant="outlined" value={coordinates.longitude} InputProps={{ readOnly: true }} fullWidth size="small" />
              <TextField label="위도" variant="outlined" value={coordinates.latitude} InputProps={{ readOnly: true }} fullWidth size="small" />
              <IconButton onClick={() => console.log('Geocoding...')} aria-label="search geocoding">
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <div id="map" style={{ width: '100%', height: '300px', border: '1px solid #ddd' }}></div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">확인</Button>
        <Button onClick={() => closeModal(modalKey)} variant="outlined" color="secondary">닫기</Button>
      </DialogActions>
    </>
  );
}

export default DaumPostcodeShppingMall;