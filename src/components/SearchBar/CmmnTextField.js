import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format, isValid } from 'date-fns';
import dayjs from 'dayjs';

// 필드 전체를 포함하는 컨테이너 스타일 설정
const FieldContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '16px',
});

// 개별 필드 컨테이너로, 한 줄에 3개씩 배치되도록 스타일 설정
const CompactDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: 'calc(33.33% - 16px)',
  minWidth: '250px',
  margin: 0,
  padding: 0,
});

// 필드의 레이블 스타일 설정
const Label = styled('p')({
  width: '100px',
  minWidth: '100px',
  margin: 0,
  // paddingRight: '8px',
  lineHeight: '32px',
  fontSize: '14px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
});

// 텍스트 필드 스타일 설정
const CompactTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '32px',
  },
  '& .MuiInputBase-input': {
    padding: '4px 8px',
  },
  width: '100%',
});

// 날짜 선택기 스타일 설정
const CompactDatePicker = styled(DatePicker)({
  width: '100%',
  height: '32px',
  border: '1px solid gray',
  borderRadius: '4px',
  padding: '4px 8px',
  color: 'black',
  backgroundColor: 'white',
  textAlign: 'center',
});

// 드롭다운 선택 필드 스타일 설정
const CompactSelect = styled(Select)({
  height: '32px',
  '& .MuiSelect-select': {
    padding: '4px 8px',
  },
  width: '100%',
});

// 날짜 문자열을 'yyyyMMdd' 형식으로 변환하는 유틸리티 함수
const parseDateString = (value) => (value ? format(value, 'yyyyMMdd') : '');

// 텍스트 입력 필드 컴포넌트
export function SchTextField({ label, id, onChange }) {
  return (
    <CompactDiv>
      <Label>{label}</Label>
      <CompactTextField
        id={id || 'noneId'}
        onChange={(e) => onChange && onChange(e.target.value, id)}
      />
    </CompactDiv>
  );
}

// 날짜 선택 필드 컴포넌트
export function SchDateField({ label, id, selected, onChange }) {
  // 'yyyyMMdd' 형식에서 유효한 날짜를 파싱
  const parsedDate = selected && isValid(parse(selected, 'yyyyMMdd', new Date()))
    ? parse(selected, 'yyyyMMdd', new Date())
    : null;

  // 날짜 선택 시 호출되는 핸들러
  const handleDateChange = (date) => {
    if (date && isValid(date)) {
      const formattedDate = format(date, 'yyyyMMdd');
      onChange && onChange(formattedDate, id);
    }
  };

  // 사용자 입력을 처리하는 핸들러 ('yyyy-MM-dd' 형식 유효성 확인)
  const handleDateInput = (e) => {
    const input = e.target.value;
    const parsedInputDate = parse(input, 'yyyy-MM-dd', new Date());
    if (isValid(parsedInputDate)) {
      onChange && onChange(format(parsedInputDate, 'yyyyMMdd'), id);
    } else if (input === '') {
      onChange && onChange('', id);
    }
  };

  return (
    <CompactDiv>
      <Label>{label}</Label>
      <CompactDatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        onInput={handleDateInput}
        dateFormat="yyyy-MM-dd"
        customInput={<CompactTextField />}
      />
    </CompactDiv>
  );
}

// 드롭다운 선택 필드 컴포넌트
export function SchSelectField({ label, id, value, options, onChange, readonly }) {
  return (
    <CompactDiv>
      <InputLabel id={`${id}-label`} style={{ marginRight: '8px' }}>{label}</InputLabel>
      <CompactSelect
        labelId={`${id}-label`}
        name={id}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value, id)}
        inputProps={{ readOnly: readonly }}
      >
        {options && options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CompactSelect>
    </CompactDiv>
  );
}

// 날짜 필드 (폼에서 사용하는 컴포넌트)
export function FrmDate({ label, selected, onChange }) {
  return (
    <FormControl fullWidth>
      <CompactDiv>
        <Label>{label}</Label> {/* Label을 CompactDiv 안에 추가 */}
        <DatePicker
          selected={selected && parse(selected, 'yyyyMMdd', new Date())}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => onChange(parseDateString(date))}
          customInput={<CompactTextField  />}
        />
      </CompactDiv>
    </FormControl>
  );
}

// 텍스트 입력 필드 (폼에서 사용하는 컴포넌트)
export function FrmTextField({ label, id, value, onChange, readonly }) {
  return (
    <FormControl fullWidth>
      <CompactDiv>
        <Label>{label}</Label> {/* Label을 CompactDiv 안에 추가 */}
        <CompactTextField
          id={id}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value, id)}
          inputProps={{ readOnly: readonly }}
        />
      </CompactDiv>
    </FormControl>
  );
}


// 선택 필드 (폼에서 사용하는 컴포넌트)
export function FrmSelect({ label, id, value, options, onChange, readonly }) {
  return (
    <FormControl fullWidth>
      <CompactDiv>
        <Label>{label}</Label>
        <CompactSelect
          labelId={`${id}-label`}
          name={id}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value, id)}
          inputProps={{ readOnly: readonly }}
        >
          {options && options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CompactSelect>
      </CompactDiv>
    </FormControl>
  );
}

// 기본 날짜 형식 정의
const DATE_FORMAT = 'YYYY-MM-DD';

// 날짜를 필드에 설정하는 함수, 주로 그리드 컴포넌트에서 사용
export function GridDateSetField(params, field) {
  const { value } = params;
  const formattedValue = dayjs(value).isValid() ? dayjs(value).format(DATE_FORMAT) : '';
  return { ...params, row: { ...params.row, [field]: formattedValue } };
}

// 읽기 전용 날짜 필드 컴포넌트 (그리드에 사용)
export function GridDateRenderField({ params }) {
  const formattedDate = dayjs(params.value).isValid() ? dayjs(params.value).format(DATE_FORMAT) : '';
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      value={formattedDate}
      InputProps={{ readOnly: true }}
    />
  );
}

// 숫자를 설정하는 필드로, 천 단위 구분 등 포맷을 적용 (그리드에 사용)
export function GridNumberSetField(params, field) {
  const { value } = params;
  const formattedValue = value && !isNaN(value) ? Number(value).toLocaleString() : '';
  return { ...params, row: { ...params.row, [field]: formattedValue } };
}

// 필드들을 한 줄에 정렬하는 컨테이너 컴포넌트
export function FieldRow({ children }) {
  return <FieldContainer>{children}</FieldContainer>;
}
