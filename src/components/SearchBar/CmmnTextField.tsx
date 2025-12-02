import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format, isValid } from 'date-fns';
import dayjs from 'dayjs';

// 스타일 정의
const FieldContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '16px',
});

const CompactDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: 'calc(33.33% - 16px)',
  minWidth: '250px',
  margin: 0,
  padding: 0,
});

const Label = styled('p')({
  width: '100px',
  minWidth: '100px',
  margin: 0,
  lineHeight: '32px',
  fontSize: '14px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
});

const CompactTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '32px',
  },
  '& .MuiInputBase-input': {
    padding: '4px 8px',
  },
  width: '100%',
});

const CompactSelect = styled(Select)({
  height: '32px',
  '& .MuiSelect-select': {
    padding: '4px 8px',
  },
  width: '100%',
});

// React DatePicker wrapper styling
const StyledDatePickerWrapper = styled('div')({
    width: '100%',
    '& .react-datepicker-wrapper': {
        width: '100%',
    },
    '& .react-datepicker__input-container': {
        width: '100%',
    },
    '& input': {
        width: '100%',
        height: '32px',
        padding: '4px 8px',
        border: '1px solid #c4c4c4',
        borderRadius: '4px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        '&:focus': {
            outline: '2px solid #1976d2',
            borderColor: '#1976d2',
        }
    }
});


// 유틸리티 함수
const parseDateString = (value: Date | null) => (value ? format(value, 'yyyyMMdd') : '');

// Props 인터페이스 정의
interface CommonFieldProps {
    label: string;
    id?: string;
    onChange?: (value: string, id?: string) => void;
    readonly?: boolean;
}

interface TextFieldProps extends CommonFieldProps {
    value?: string;
}

interface DateFieldProps extends CommonFieldProps {
    selected?: string; // yyyyMMdd format
}

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectFieldProps extends CommonFieldProps {
    value?: string | number;
    options?: SelectOption[];
}


// --- 컴포넌트 구현 ---

// 검색용 텍스트 필드
export function SchTextField({ label, id, onChange }: TextFieldProps) {
  return (
    <CompactDiv>
      <Label>{label}</Label>
      <CompactTextField
        id={id || 'noneId'}
        onChange={(e) => onChange && onChange(e.target.value, id)}
        variant="outlined"
      />
    </CompactDiv>
  );
}

// 검색용 날짜 필드
export function SchDateField({ label, id, selected, onChange }: DateFieldProps) {
  const parsedDate = selected && isValid(parse(selected, 'yyyyMMdd', new Date()))
    ? parse(selected, 'yyyyMMdd', new Date())
    : null;

  const handleDateChange = (date: Date | null) => {
    if (date && isValid(date)) {
      const formattedDate = format(date, 'yyyyMMdd');
      onChange && onChange(formattedDate, id);
    } else if (!date) {
       onChange && onChange('', id);
    }
  };

  return (
    <CompactDiv>
      <Label>{label}</Label>
      <StyledDatePickerWrapper>
        <DatePicker
            selected={parsedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
        />
      </StyledDatePickerWrapper>
    </CompactDiv>
  );
}

// 검색용 선택 필드
export function SchSelectField({ label, id, value, options, onChange, readonly }: SelectFieldProps) {
  return (
    <CompactDiv>
      <InputLabel id={`${id}-label`} style={{ marginRight: '8px', display: 'none' }}>{label}</InputLabel>
      <Label>{label}</Label>
      <CompactSelect
        labelId={`${id}-label`}
        name={id}
        value={value || ''}
        onChange={(e: SelectChangeEvent<unknown>) => onChange && onChange(e.target.value as string, id)}
        inputProps={{ readOnly: readonly }}
        displayEmpty
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

// 폼용 날짜 필드
export function FrmDate({ label, selected, onChange }: { label: string, selected?: string, onChange: (val: string) => void }) {
  const parsedDate = selected && isValid(parse(selected, 'yyyyMMdd', new Date()))
      ? parse(selected, 'yyyyMMdd', new Date())
      : null;

  return (
    <FormControl fullWidth>
      <CompactDiv>
        <Label>{label}</Label>
        <StyledDatePickerWrapper>
            <DatePicker
            selected={parsedDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date: Date | null) => onChange(parseDateString(date))}
            placeholderText="YYYY-MM-DD"
            />
        </StyledDatePickerWrapper>
      </CompactDiv>
    </FormControl>
  );
}

// 폼용 텍스트 필드
export function FrmTextField({ label, id, value, onChange, readonly }: TextFieldProps) {
  return (
    <FormControl fullWidth>
      <CompactDiv>
        <Label>{label}</Label>
        <CompactTextField
          id={id}
          value={value || ''}
          onChange={(e) => onChange && onChange(e.target.value, id)}
          inputProps={{ readOnly: readonly }}
          variant="outlined"
        />
      </CompactDiv>
    </FormControl>
  );
}

// 폼용 선택 필드
export function FrmSelect({ label, id, value, options, onChange, readonly }: SelectFieldProps) {
  return (
    <FormControl fullWidth>
      <CompactDiv>
        <Label>{label}</Label>
        <CompactSelect
          labelId={`${id}-label`}
          name={id}
          value={value || ''}
          onChange={(e: SelectChangeEvent<unknown>) => onChange && onChange(e.target.value as string, id)}
          inputProps={{ readOnly: readonly }}
          displayEmpty
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

// 그리드 유틸리티
const DATE_FORMAT = 'YYYY-MM-DD';

export function GridDateSetField(params: any, field: string) {
  const { value } = params;
  const formattedValue = dayjs(value).isValid() ? dayjs(value).format(DATE_FORMAT) : '';
  return { ...params, row: { ...params.row, [field]: formattedValue } };
}

export function GridDateRenderField({ params }: { params: any }) {
  const formattedDate = params.value && dayjs(params.value).isValid() ? dayjs(params.value).format(DATE_FORMAT) : '';
  return (
    <div style={{ width: '100%', padding: '0 8px' }}>
        {formattedDate}
    </div>
  );
}

export function GridNumberSetField(params: any, field: string) {
  const { value } = params;
  const formattedValue = value && !isNaN(Number(value)) ? Number(value).toLocaleString() : '';
  return { ...params, row: { ...params.row, [field]: formattedValue } };
}

export function FieldRow({ children }: { children: React.ReactNode }) {
  return <FieldContainer>{children}</FieldContainer>;
}