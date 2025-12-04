import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  DialogContent,
  DialogActions,
  Button,
  SelectChangeEvent,
} from '@mui/material';

// Common imports
import { client } from '../../../constraints'; // constraints 오타 수정 확인
import { useModal } from "../../../context/ModalContext";
import {
  gvSetDropdownData,
  gvSetLevelDropdownData,
  gvSetLevel2DropdownData,
} from "../../../components/Common";

// Field labels
const fieldLabels: Record<string, string> = {
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

// FormData 타입 정의
interface LocMultiRegFormData {
  dcCd: string;
  areaCd: string;
  zoneCd: string;
  linCdFrom: string;
  linCdTo: string;
  rowCdFrom: string;
  rowCdTo: string;
  levCdFrom: string;
  levCdTo: string;
  [key: string]: string; // 인덱스 시그니처 추가 (동적 접근용)
}

function LocMultiReg() {
  const key = 'LOG_MULTI_REG';
  const PRO_URL = '/wms/sd/loc';
  const { openModal, closeModal } = useModal();
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LocMultiRegFormData>({
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

  const [dcCmb, setDcCmb] = useState<any[]>([]);
  const [dcAreaCmb, setDcAreaCmb] = useState<any>({});
  const [dcAreaZoneCmb, setDcAreaZoneCmb] = useState<any>({});

  // Select 및 TextField 변경 핸들러 통합
  const handleChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  };

  useEffect(() => {
    fnSearchDc();
    fnSearchDcArea();
    fnSearchDcAreaZone();
  }, []);

  const fnSearchDc = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcList`, {});
      setDcCmb(gvSetDropdownData(res.data));
    } catch (error) {
      console.error('Error fetching DC list:', error);
    }
  };

  const fnSearchDcArea = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcAreaList`, {});
      setDcAreaCmb(gvSetLevelDropdownData(res.data));
    } catch (error) {
      console.error('Error fetching DC area list:', error);
    }
  };

  const fnSearchDcAreaZone = async () => {
    try {
      const res = await client.post(`${PRO_URL}/selectDcAreaZoneList`, {});
      setDcAreaZoneCmb(gvSetLevel2DropdownData(res.data));
    } catch (error) {
      console.error('Error fetching DC area zone list:', error);
    }
  };

  const validateInput = (id: string, value: string) => {
    if (id === 'dcCd' || id === 'areaCd' || id === 'zoneCd') return '';
    
    // 숫자 2자리 형식 검사 (01, 02 ...)
    if (!/^(0[1-9]|[1-9]\d)$/.test(value) && value !== '') {
      return "형식에 맞게 입력하세요 (예: 01, 02 ...)";
    }

    const baseId = id.replace('From', '').replace('To', '');
    const fromId = `${baseId}From`;
    const toId = `${baseId}To`;

    let fromValue = formData[fromId];
    let toValue = formData[toId];

    if (id.includes('From')) fromValue = value;
    if (id.includes('To')) toValue = value;

    if (fromValue && toValue && fromValue > toValue) {
      return `${fieldLabels[baseId]}의 From 값은 To 값보다 작거나 같아야 합니다.`;
    }

    return '';
  };

  const handleSubmit = () => {
    const requiredFields = ['dcCd', 'areaCd', 'zoneCd', 'linCdFrom', 'linCdTo', 'rowCdFrom', 'rowCdTo', 'levCdFrom', 'levCdTo'];
    
    // 필수값 체크
    const emptyField = requiredFields.find(field => !formData[field]);
    if (emptyField) {
      openModal('', 'I', `${fieldLabels[emptyField]}을(를) 입력해주세요.`);
      return;
    }

    // 유효성 에러 체크
    const hasErrors = Object.values(errors).some(err => err !== '');
    if (hasErrors) {
       openModal('', 'I', '입력값을 확인해주세요.');
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
            <FormControl fullWidth margin="normal" size="small">
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
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="areaCd-label">구역코드</InputLabel>
              <Select
                labelId="areaCd-label"
                name="areaCd"
                value={formData.areaCd}
                label="구역코드"
                onChange={handleChange}
                disabled={!formData.dcCd}
              >
                {(dcAreaCmb[formData.dcCd] || []).map((item: any) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="zoneCd-label">지역코드</InputLabel>
              <Select
                labelId="zoneCd-label"
                name="zoneCd"
                value={formData.zoneCd}
                label="지역코드"
                onChange={handleChange}
                disabled={!formData.areaCd}
              >
                {(dcAreaZoneCmb[formData.dcCd]?.[formData.areaCd] || []).map((item: any) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {['linCd', 'rowCd', 'levCd'].map((cd) => (
                <React.Fragment key={cd}>
                    <Grid item xs={6}>
                    <TextField
                        label={`${fieldLabels[`${cd}From`]}`}
                        variant="outlined"
                        size="small"
                        value={formData[`${cd}From`]}
                        onChange={handleChange}
                        fullWidth
                        name={`${cd}From`}
                        error={!!errors[`${cd}From`]}
                        helperText={errors[`${cd}From`]}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        label={`${fieldLabels[`${cd}To`]}`}
                        variant="outlined"
                        size="small"
                        value={formData[`${cd}To`]}
                        onChange={handleChange}
                        fullWidth
                        name={`${cd}To`}
                        error={!!errors[`${cd}To`]}
                        helperText={errors[`${cd}To`]}
                    />
                    </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">확인</Button>
        <Button onClick={() => closeModal(key)} variant="outlined" color="secondary">닫기</Button>
      </DialogActions>
    </>
  );
}

export default LocMultiReg;