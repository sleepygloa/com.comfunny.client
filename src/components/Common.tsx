import React from "react";
import { TextField } from "@mui/material";

// 값이 undefined, null, '' 인지 체크
export function isEmpty(value: any): boolean {
    return value === undefined || value === null || value === '';
}

export function isNotEmpty(value: any): boolean {
    return !isEmpty(value);
}

// 날짜 변환 YYYYMMDD -> YYYY-MM-DD
export function gvDateToYYYY_MM_DD(date: string): string {    
    return isEmpty(date) ? '' : `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
}

// 날짜 변환 YYYY-MM-DD -> YYYYMMDD
export function gvDateToYYYYMMDD(date: string): string {
    return isEmpty(date) ? '' : date.replace(/-/g, '');
}

// 오늘 날짜 구하기
export function gvGetToday(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 날짜 포맷 변환
export function formatDate(date: string | Date | number): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 그리드 선택한 행의 데이터 조회
export function gvGetRowData(data: any[], id: number | string): any {
    if (isEmpty(id) || id === -1) {
        alert('선택된 데이터가 없습니다.');
        return false;
    }

    for (const item of data) {
        if (item.id === id) {
            if (isNotEmpty(item.TelNo)) item.TelNo = gvGridFieldFormatPhoneNumber(item.TelNo);
            if (isNotEmpty(item.FaxNo)) item.FaxNo = gvGridFieldFormatFaxNumber(item.FaxNo);
            return item;
        }
    }
    return null;
}

// 그리드의 체크한 행의 데이터리스트 조회
export function gvGetRowDataListOfChk(data: any[], ids: (number | string)[]): any[] {
    return data.filter(item => {
        return ids.includes(item.id);
    });
}

// 그리드의 행 추가 및 신규 상태 추가
export function gvDataGridAddRowAndStatus(dataList: any[], data: any[], addData: any): any[] {
    const newDataList = [...dataList];
    data.forEach((item, index) => {
        const newRow = {
            ...item,
            ...addData,
            "modFlag": "I",
            "id": dataList.length + index + 1
        };
        newDataList.push(newRow);
    });
    return newDataList;
}

// 그리드 드랍다운 label 보이기
export const gvGridDropdownDisLabel = ({ value, field, api }: { value: any, field: string, api: any }): string => {
    if (!api || typeof api.getColumn !== 'function') return value;

    const colDef = api.getColumn(field);
    const option = colDef.valueOptions
        ? colDef.valueOptions.find((params: any) => value === params.value)
        : {};
    return option && option.label ? option.label : '';
};


// 핸드폰 번호 포맷
export const gvGridFieldFormatPhoneNumber = (value: string): string => {
    if (!value) return '';
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

// 팩스 번호 포맷
export const gvGridFieldFormatFaxNumber = (value: string): string => {
    if (!value) return '';
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumber.startsWith('02') && phoneNumberLength > 2) {
        if (phoneNumberLength <= 5) return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2)}`;
        if (phoneNumberLength <= 9) return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5)}`;
        if (phoneNumberLength <= 10) return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
    } else if (phoneNumberLength > 3) {
        if (phoneNumberLength <= 6) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        if (phoneNumberLength <= 10) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        if (phoneNumberLength <= 11) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
    }
    return phoneNumber;
};

// 숫자 포맷
export const gvGridFieldNumberFormatter = (prop: { value: any }): string => {
    return isEmpty(prop.value) ? '' : Number(prop.value).toLocaleString();
};

// 이메일 포맷 검증 및 입력 처리 컴포넌트
interface EmailInputProps {
    api: any;
    value: string;
    id: number | string;
    field: string;
}

export const gvGridFieldEmailInput: React.FC<EmailInputProps> = ({ api, value, id, field }) => {
    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        api.setEditCellValue({ id, field, value: value }, event);
    };

    const onBlurHandle = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value === '') return;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(value)) {
            alert('이메일 형식이 아닙니다.');
            api.setEditCellValue({ id, field, value: '' }, event);
        }
    };

    const onKeyDownHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            (event.target as HTMLInputElement).blur();
        }
    };

    return (
        <TextField
            fullWidth
            value={value}
            onChange={onChangeHandle}
            onBlur={onBlurHandle}
            onKeyDown={onKeyDownHandle}
        />
    );
};

// 숫자 필드 편집 전 처리 함수
// [수정] params 타입을 any로 변경하여 GridPreProcessEditCellProps와의 타입 불일치 해결
export function gvGridFieldNumberPreEdit(params: any): any {
    // DataGrid 버전에 따라 params 구조가 다를 수 있음 (params.props 또는 params 자체에 value 존재)
    const props = params.props || params; 
    let value = props.value;
  
    // 기본값이 undefined 또는 null일 경우 0으로 설정
    if (value === undefined || value === null) {
      value = 0;
    } else {
      // 만약 문자열에 쉼표가 포함된 경우 제거하고 숫자로 변환
      value = parseFloat(value.toString().replace(/,/g, ''));
    }
  
    // 변환된 value를 포함한 props 반환
    return { ...props, value };
}
  
// 숫자 필드의 문자열을 파싱하여 숫자 형식으로 변환하는 함수
export function gvGridFieldNumberParser(value: any): number {
    if (!value) return 0;
    const parsedValue = parseFloat(value.toString().replace(/,/g, ''));
    return isNaN(parsedValue) ? 0 : parsedValue;
}
  
// gvSetDropdownData: 콤보박스에서 사용할 수 있도록 데이터를 변환합니다.
export const gvSetDropdownData = (data: any[]): { value: any, label: string }[] => {
    return data.map(item => ({
        value: item.code,
        label: item.name,
    }));
};

// gvSetLevelDropdownData: 1단계 레벨 구조로 데이터를 변환
export const gvSetLevelDropdownData = (data: any[]): Record<string, { value: any, label: string }[]> => {
    const result: Record<string, { value: any, label: string }[]> = {};
    data.forEach(item => {
        const parentCode = item.parentCode || item.ref1; // parentCode 또는 ref1 사용
        if (!result[parentCode]) {
            result[parentCode] = [];
        }
        result[parentCode].push({
            value: item.code,
            label: item.name,
        });
    });
    return result;
};

// gvSetLevel2DropdownData: 2단계 레벨 구조로 데이터를 변환
export const gvSetLevel2DropdownData = (data: any[]): Record<string, Record<string, { value: any, label: string }[]>> => {
    const result: Record<string, Record<string, { value: any, label: string }[]>> = {};
    data.forEach(item => {
        const parent = item.parentCode || item.ref1;
        const subParent = item.subParentCode || item.ref2;

        if (!result[parent]) {
            result[parent] = {};
        }
        if (!result[parent][subParent]) {
            result[parent][subParent] = [];
        }
        result[parent][subParent].push({
            value: item.code,
            label: item.name,
        });
    });
    return result;
};