//필수입력
export function formatRequired(value) {
    var helperText = '필수항목 입니다.';

    //값이없다면 값 리턴
    if (!value) return {value : value, helperText : helperText};
    //글자수
    // const length = value.length;

    helperText = ''
    return {value : value, helperText : helperText}
}

//자리수체크(min ~ max)
export function formatMinMaxLength(value, min, max) {
    var helperText = '';

    //값이없다면 값 리턴
    if (!value) return {value : value, helperText : helperText}

    //글자수
    const length = value.length;

    //min 이하일때 표시처리
    helperText = `글자수 ${min}자 이상 입력해주세요.`
    if (length < min) return {value : value, helperText : helperText}

    //max 이하일때 표시처리
    helperText = `글자수 ${max}자 이하로 입력해주세요.`
    if (max < length) return {value : `${value.slice(0, max)}`, helperText : helperText}
    
    helperText = ''
    return {value : value, helperText : helperText}
}

//전화번호, 핸드폰번호 
//val1 : DB 저장형식, val2 : 디스플레이형식
export function formatPhoneNumber(value) {
    var helperText = '';

    //값이없다면 값 리턴
    if (!value) return {val1 : null, val2 : null, helperText : helperText};

    //숫자만 입력되도록 처리
    const num = value.replace(/[^\d]/g, '');

    //글자수
    const numLength = num.length;

    //4자 이하일때 표시처리
    helperText = ''
    if (numLength < 4) return {val1 : num, val2 : num, helperText : helperText};

    //7자 이하일때, 표시처리
    if (numLength <= 7) {
        return {
        val1 :  `${num.slice(0, 3)}${num.slice(3)}`,
        val2 : `${num.slice(0, 3)}-${num.slice(3)}`,
        helperText : helperText
        }
    }


    //11자 미만일때, 지역 전화번호 표시 031-123-3456
    if (numLength < 11) {
        return {
            val1 : `${num.slice(0, 3)}${num.slice(3,6)}${num.slice(6, 10)}`, 
            val2 : `${num.slice(0, 3)}-${num.slice(3,6)}-${num.slice(6, 10)}`,
            helperText : helperText
            }
    }

    //11자 이상입력시 제한 및 010-1234-4321 처리
    helperText = ''
    return {
        val1 : `${num.slice(0, 3)}${num.slice(3,7)}${num.slice(7, 11)}`, 
        val2 : `${num.slice(0, 3)}-${num.slice(3,7)}-${num.slice(7, 11)}`, 
        helperText : helperText
    };
}

//팩스번호 
export function formatTelNumber(value) {
    //값이없다면 값 리턴
    if (!value) return {val1: null, val2 : null};
  
    //숫자만 입력되도록 처리
    const num = value.replace(/[^\d]/g, '');
  
    //글자수
    const numLength = num.length;
  
    //4자 이하일때 표시처리
    if (numLength < 4) return {val1 : num, val2 : num};
  
    //7자 이하일때, 표시처리
    if (numLength <= 7) {
      return {
        val1 :  `${num.slice(0, 3)}${num.slice(3)}`,
        val2 : `${num.slice(0, 3)}-${num.slice(3)}`,
        }
    }


    return {
        val1 : `${num.slice(0, 3)}${num.slice(3,6)}${num.slice(6, 10)}`, 
        val2 : `${num.slice(0, 3)}-${num.slice(3,6)}-${num.slice(6, 10)}`
        }
}
  

//사업자번호 
export function formatBizNumber(value) {
    //값이없다면 값 리턴
    if (!value) return (value, value);
  
    //숫자만 입력되도록 처리
    const num = value.replace(/[^\d]/g, '');
  
    //글자수
    const numLength = num.length;
  
    //4자 이하일때 표시처리
    if (numLength < 4) return {val1 : num, val2 : num};
  
    //7자 이하일때, 표시처리
    if (numLength <= 6) {
      return {
        val1 :  `${num.slice(0, 3)}${num.slice(3)}`,
        val2 : `${num.slice(0, 3)}-${num.slice(3)}`,
        }
    }

    
    return {
        val1 : `${num.slice(0, 3)}${num.slice(3,6)}${num.slice(6, 11)}`, 
        val2 : `${num.slice(0, 3)}-${num.slice(3,6)}-${num.slice(6, 11)}`
        }
}
  