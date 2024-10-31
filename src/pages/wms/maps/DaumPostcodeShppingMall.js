import React, { useCallback, useState, useEffect } from 'react';
import { Box, TextField, IconButton, Grid, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DaumPostcodeCommon from "./DaumPostcodeCommon.js";
import { useModal } from "../../../context/ModalContext.js";

function DaumPostcodeShppingMall(props) {
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const key = 'FIND_ADDR'; 

  const [zonecode, setZonecode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [deliveryNm, setDeliveryNm] = useState('');
  const [coordinates, setCoordinates] = useState({ longitude: '', latitude: '' });

  useEffect(() => {

    //Load Kakao Map API
    window.kakao.maps.load(() => {
      //null Check
      if (!window.kakao.maps.services) return;

      //Load Kakao Map API
      var container = document.getElementById('map');
      //if coordinates null then set default options's center
      var lat = coordinates.latitude ? coordinates.latitude : 37.5665;
      var lng = coordinates.longitude ? coordinates.longitude : 126.9780;
      var options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
          draggable: false,
      };
      var map = new window.kakao.maps.Map(container, options);

      //Add Marker
      var marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          map: map
      });
    

      // Geocoder function to update the coordinates state.
      const geocoder = new window.kakao.maps.services.Geocoder();
      const addressToSearch = roadAddress || jibunAddress;
      if (addressToSearch) {
        geocoder.addressSearch(addressToSearch, function(result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const newCoords = { longitude: result[0].x, latitude: result[0].y };
            setCoordinates(newCoords);
            updateModalData('FIND_ADDR', {
              zip: zonecode, 
              roadAddr: roadAddress, 
              jibunAddr: jibunAddress, 
              detailAddr: detailedAddress, 
              deliveryNm: deliveryNm, 
              lat: newCoords.latitude,
              lon: newCoords.longitude,
            });
            if (map && marker) {
              const newPosition = new window.kakao.maps.LatLng(newCoords.latitude, newCoords.longitude);
              marker.setPosition(newPosition);
              map.setCenter(newPosition);
            }
          }
        });
      }
    });

  }, [roadAddress, jibunAddress]); // Reacting to changes in these addresses

  const completeHandler = useCallback((data) => {
    const { zonecode, roadAddress, jibunAddress, autoJibunAddress, autoRoadAddress, buildingName } = data;
    
    setZonecode(zonecode); //우편번호
    setRoadAddress(roadAddress || autoRoadAddress); //도로명주소
    setJibunAddress(jibunAddress || autoJibunAddress); //지번주소
    setDeliveryNm(buildingName); // 배송처명, 건물명

    updateModalData('FIND_ADDR', {
      zip: zonecode, 
      roadAddr: roadAddress, 
      jibunAddr: jibunAddress, 
      detailAddr: detailedAddress, 
      deliveryNm: deliveryNm, 
      ...coordinates
    });
    closeModal('FIND_CMMN_POST');
  }, [updateModalData, closeModal, detailedAddress, deliveryNm, coordinates]);

  const inputChangeHandler = (e) => {
    const { id, value } = e.target;
    if (id === 'deliveryNm') setDeliveryNm(value);
    if (id === 'detailAddr') setDetailedAddress(value);
    updateModalData('FIND_ADDR', { ...getModalData('FIND_ADDR'), [id]: value });
  };

  const handleSubmit = () => {
    const modalInfo = modals[key];
    if (modalInfo.callback && modalInfo.callback instanceof Function) {
        const result = modalInfo.callback(modalInfo.data);
        if (result == false) return;
    }
    closeModal(key);
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{display:'flex', marginBottom:'10px'}}>
              <TextField label="우편번호" variant="outlined" value={zonecode} InputProps={{ readOnly: true }} fullWidth />
              <IconButton onClick={() => openModal('FIND_CMMN_POST', '우편번호 찾기', <DaumPostcodeCommon onComplete={completeHandler} />, null,  '600px', '800px')} aria-label="search address">
                <SearchIcon />
              </IconButton>
            </Box>
            <Box sx={{display:'flex', marginBottom:'10px'}}>
              <TextField label="도로명주소" variant="outlined" value={roadAddress} InputProps={{ readOnly: true }} fullWidth />
            </Box>
            <Box sx={{display:'flex', marginBottom:'10px'}}>
              <TextField label="지번주소" variant="outlined" value={jibunAddress} InputProps={{ readOnly: true }} fullWidth />
            </Box>  
            <Box sx={{display:'flex', marginBottom:'10px'}}>
              <TextField label="상세주소" variant="outlined" value={detailedAddress} onChange={inputChangeHandler} fullWidth id="detailAddr" />
            </Box>  
            <Box sx={{display:'flex', marginBottom:'10px'}}>
              <TextField label="배송처명" variant="outlined" value={deliveryNm} onChange={inputChangeHandler} fullWidth id="deliveryNm" />
            </Box>
            <Box sx={{display:'flex', marginBottom:'10px'}}>
              <TextField label="경도" variant="outlined" value={coordinates.longitude} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="위도" variant="outlined" value={coordinates.latitude} InputProps={{ readOnly: true }} fullWidth />
              <IconButton onClick={() => console.log('Geocoding...')} aria-label="search geocoding">
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <div id='map' style={{ width: '100%', height: '100%' }} center={{lat:37.5665, lng:126.9780}} >
              {/* <MapMarker position={{ lat: 37.5665, lng: 126.9780 }} /> */}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button onClick={() => handleSubmit()}>확인</Button>
          <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}

export default DaumPostcodeShppingMall;
