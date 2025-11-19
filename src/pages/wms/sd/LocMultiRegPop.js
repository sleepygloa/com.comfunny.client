import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

// Common imports
import { client } from '../../../contraints.js';
import { useModal } from "../../../context/ModalContext.js";
import {
  gvSetDropdownData,
  gvSetLevelDropdownData,
  gvSetLevel2DropdownData,
} from "../../../components/Common.js";

// Field labels
const fieldLabels = {
  dcCd: '물류센터',
  areaCd: '구역코드',
  zoneCd: '지역코드',
  linCdFrom: '행(From)',
  linCdTo: '행(To)',
  rowCdFrom: '열(From)',
  rowCdTo: '열(To)',
  levCdFrom: '단(From)',
  levCdTo: '단(To)'
};

function LocMultiReg() {
  const key = 'LOG_MULTI_REG';
  const PRO_URL = '/wms/sd/loc';
  const { openModal, closeModal, updateModalData, getModalData } = useModal();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    dcCd: '',
    areaCd: '',
    zoneCd: '',
    linCdFrom: '',
    linCdTo: '',
    rowCdFrom: '',
    rowCdTo: '',
    levCdFrom: '',
    levCdTo: ''
  });

  const [dcCmb, setDcCmb] = useState([]);
  const [dcAreaCmb, setDcAreaCmb] = useState([]);
  const [dcAreaZoneCmb, setDcAreaZoneCmb] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'dcCd' && { areaCd: '', zoneCd: '' }),
      ...(name === 'areaCd' && { zoneCd: '' })
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));

    updateModalData(key, { ...getModalData(key), [name]: value });
  };

  useEffect(() => {
    fnSearchDc();
    fnSearchDcArea();
    fnSearchDcAreaZone();
  }, []);

  const fnSearchDc = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcList`);
      setDcCmb(gvSetDropdownData(res.data));
    } catch (error) {
      console.error('Error fetching DC list:', error);
    }
  };

  const fnSearchDcArea = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcAreaList`);
      setDcAreaCmb(gvSetLevelDropdownData(res.data));
    } catch (error) {
      console.error('Error fetching DC area list:', error);
    }
  };

  const fnSearchDcAreaZone = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcAreaZoneList`);
      setDcAreaZoneCmb(gvSetLevel2DropdownData(res.data));
    } catch (error) {
      console.error('Error fetching DC area zone list:', error);
    }
  };

  const validateInput = (id, value) => {
    if (id === 'dcCd' || id === 'areaCd' || id === 'zoneCd') return '';
    if (!/^(0[1-9]|[1-9]\d)$/.test(value)) {
      return "형식에 맞게 입력하세요 (예: 01, 02, ...)";
    }

    const baseId = id.replace('From', '').replace('To', '');
    const fromId = `${baseId}From`;
    const toId = `${baseId}To`;

    const fromValue = id.includes('From') ? value : formData[fromId];
    const toValue = id.includes('To') ? value : formData[toId];

    if (fromValue && toValue && fromValue > toValue) {
      return `${fieldLabels[id]}의 From 값은 To 값보다 작거나 같아야 합니다.`;
    }

    return '';
  };

  const handleSubmit = () => {
    const requiredFields = ['dcCd', 'areaCd', 'zoneCd', 'linCdFrom', 'linCdTo', 'rowCdFrom', 'rowCdTo', 'levCdFrom', 'levCdTo'];
    const hasErrors = requiredFields.some((field) => !formData[field]);

    if (hasErrors) {
      requiredFields.forEach((field) => {
        if (!formData[field]) openModal('', 'I', `${fieldLabels[field]}을 입력해주세요.`);
      });
      return;
    }

    openModal('', '', '저장 하시겠습니까?', async () => {
      try {
        await client.post(`${PRO_URL}/saveLocMultiReg`, formData);
        openModal('', 'I', '저장 되었습니다.');
        closeModal(key);
      } catch (error) {
        console.error('Error saving location multi-reg:', error);
      }
    });
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="dcCd-label">물류센터</InputLabel>
              <Select
                labelId="dcCd-label"
                name="dcCd"
                value={formData.dcCd}
                label="물류센터"
                onChange={handleChange}
              >
                {dcCmb.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="areaCd-label">구역코드</InputLabel>
              <Select
                labelId="areaCd-label"
                name="areaCd"
                value={formData.areaCd}
                label="구역코드"
                onChange={handleChange}
                disabled={!formData.dcCd}
              >
                {(dcAreaCmb[formData.dcCd] || []).map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="zoneCd-label">지역코드</InputLabel>
              <Select
                labelId="zoneCd-label"
                name="zoneCd"
                value={formData.zoneCd}
                label="지역코드"
                onChange={handleChange}
                disabled={!formData.areaCd}
              >
                {(dcAreaZoneCmb[formData.dcCd]?.[formData.areaCd] || []).map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              {['linCd', 'rowCd', 'levCd'].map((cd) => (
                <Grid item xs={6} key={cd}>
                  <TextField
                    label={`${fieldLabels[`${cd}From`]}`}
                    variant="outlined"
                    value={formData[`${cd}From`]}
                    onChange={handleChange}
                    fullWidth
                    name={`${cd}From`}
                    error={!!errors[`${cd}From`]}
                    helperText={errors[`${cd}From`]}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}

export default LocMultiReg;
