import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { formatDate } from '../../Common.js'

//날짜
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { parse, isValid, format, parseISO } from 'date-fns';
import moment from 'moment';
import { PartyModeSharp } from '@mui/icons-material';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  textField: {
    marginBottom: 0,
    marginTop: 0,
    height: 30,
  },
  div : {
    display:'inline-flex',
    width:'99.5%',
    height:'30px',
    margin:'0px',
    padding:'0px',
    overflow:'hidden',
  },
  div3 : {
    display:'inline-flex',
    width:'33%',
    height:'30px',
    margin:'0px',
    padding:'0px',
    overflow:'hidden',
  },
  div4 : {
    display:'inline-flex',
    width:'24.5%',
    height:'30px',
    margin:'0px',
    padding:'0px',
    overflow:'hidden',
  },
  textFieldLabel:{
    width:120, 
    verticalAlign:'middle'
  },
  textFieldText:{
    margin:'4px 0px 0px 0px'
  },
  schFieldText:{
    margin:'10px 0px 0px 0px'
  },
  label: {
    width: 120, 
    verticalAlign: 'middle',
    margin: '4px 12px 0px 0px'
  },
  datePicker: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: '4px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    width: '100%',
    height: '30px',
    color: 'black',
    textAlign: 'center',
    paddingRight: '14px',
    // zIndex: 1000
  
    // &:focus {
    //   border: 2px solid colors.$ORANGE;
    // }
  }
}));

/**
 * Div Component
*/
function  DivDefault (props){
  const classes = useStyles(); 
  if(!props.props) return null;

  if(props.props.div == "fullwidth") return (
    <div className={classes.div}>
      {props.children}
    </div>
  )

  if(props.props.div == 3) return (
    <div className={classes.div3}>
      {props.children}
    </div>
  )
  if(props.props.div == 4) return (
    <div className={classes.div4}>
      {props.children}
    </div>
  )
}

//라벨 컴포넌트
function LabelDefault (props){
  const classes = useStyles(); 
  return <div className={classes.textFieldLabel}><p className={classes.textFieldText}>{props.children}</p></div>
}

//날짜형식변환 (-> yyyyMMdd)
const parseDateString = (value) => {
  if(!value) return '';
  const parsedDate = format(value, 'yyyyMMdd');
  return parsedDate;
};
//그리드 날짜 형식 변환(yyyy-MM-dd->yyyyMMdd)
export function gvGridDateFormatterReverse(value){
  //''값이 들어올경우, ''리턴
  if(!value) return '';
  
  //- 제거
  const newYmd = value;
  const newDate = newYmd.replace(/-/g, '');
  return newDate;
}
//그리드 날짜 형식 변환(yyyyMMdd->yyyy-MM-dd)
export function gvGridDateFormatter(params){
  //''값이 들어올경우, ''리턴
  if(!params.value) return '';

  //yyyyMMdd형식을 받아서, yyyy-MM-dd형식으로 변환
  const newYmd = params.value;
  const yyyy = newYmd.substring(0, 4);
  const mm = newYmd.substring(4, 6);
  const dd = newYmd.substring(6, 8);
  const newDate = yyyy + '-' + mm + '-' + dd;
  return newDate;
}

//날짜형식변환 (yyyyMMdd -> GMT)
const parseSetDate = (value) => {
  if(!value) return ''; 

  const yyyy = value.substring(0, 4);
  const mm = value.substring(4, 6);
  const dd = value.substring(6, 8);
  const newDate = yyyy + '-' + mm + '-' + dd;
  const parsedDate = new Date(newDate);
  return parsedDate;
};

//검색필드 컴포넌트
export function SchTextField (props) {
  const classes = useStyles(); 

  return (
    <DivDefault props={props}>
      <LabelDefault >{props.label}</LabelDefault>
      <input
        id={props.id ? props.id : 'noneId'}
        defaultValue=""
        size="small"
        onChange={props.onChange ? (e)=>props.onChange(e.target.value, props.id) : false}
        onKeyDown={props.onKeyDown ? props.onKeyDown : null}
      />
    </DivDefault>
  )
}

//폼 셀렉트 컴포넌트
export function SchSelectField(props){
  const readonly = (props.readonly ? true : false);
  console.log(props)
  return (
    <DivDefault props={props}>
      <InputLabel id={`${props.id}-label`}>{props.name}</InputLabel>
      <Select
        labelId={`${props.id}-label`}
        label={props.name}
        name={props.code}
        value={props.formData[props.id]}
        onChange={props.onChange ? (e)=>props.onChange(e.target.value, props.id) : false}
        // error={!!props.errors[props.id]}
        inputProps={{
          readOnly: readonly,
        }}
      />
    </DivDefault>
  )
}

//그리드 텍스트 컴포넌트(set)
//자리수제한
export function GridTextSetField (params, id, maxLength) {
  
  // 사용자 입력을 숫자로 변환하여 저장
  if (params.value) {
    const input = params.value;
    const num = parseInt(input, 10);

    //자리수 제한
    if (input.length > maxLength) {
      alert(`${maxLength}자리 이하로 입력해주세요.`);
      params.row[id] = '';
      return params.row;
    }

    if (!isNaN(input)) {
      params.row[id] = input;
      return params.row;
    }
  }

  params.row[id] = '';
  return params.row;
}
//그리드 숫자 컴포넌트(set)
//숫자, 자리수제한
export function GridNumberSetField (params, id, maxLength) {
  
  // 사용자 입력을 숫자로 변환하여 저장
  if (params.value) {
    const input = params.value;
    const num = parseInt(input, 10);

    //자리수 제한
    if (input.length > maxLength) {
      alert(`${maxLength}자리 이하로 입력해주세요.`);
      params.row[id] = '';
      return params.row;
    }

    if (!isNaN(num)) {
      params.row[id] = num;
      return params.row;
    }
  }

  params.row[id] = '';
  return params.row;
}

//그리드 날짜 컴포넌트(set)
export function GridDateSetField (params, id) {
  
  // 사용자 입력을 `yyyy-MM-dd`에서 `yyyyMMdd`로 변환하여 저장
  if (params.value) {
    const input = params.value;
    // yyyyMMdd 혹은 yyyy-MM-dd 형식을 Date 객체로 변환
    const date = parse(input, 'yyyyMMdd', new Date());
    if (isValid(date)) {
      params.row[id] = input;
      return params.row;
    }

    const dateWithDashes = parse(input, 'yyyy-MM-dd', new Date());
    if (isValid(dateWithDashes)) {
      const parsedDate = parse(input, 'yyyy-MM-dd', new Date());
      const f = format(parsedDate, 'yyyyMMdd');
      params.row[id] = f;
      return params.row;
    };
  }

  params.row[id] = '';
  return params.row;
}


//그리드 날짜 컴포넌트 (render)
export function GridDateRenderField ({params}) {
  const convertToDateObject = (input) => {
    if (!input) return null;
    try {
      // yyyyMMdd 혹은 yyyy-MM-dd 형식을 Date 객체로 변환
      const date = parse(input, 'yyyyMMdd', new Date());
      if (isValid(date)) return date;
      const dateWithDashes = parse(input, 'yyyy-MM-dd', new Date());
      if (isValid(dateWithDashes)) {
        const dateWithDashes2 = parse(gvGridDateFormatterReverse(input), 'yyyyMMdd', new Date());
        return dateWithDashes2
      };
    } catch (error) {
      console.error("Parsing error: ", error);
    }
    return null;
  };

  const [date, setDate] = useState(convertToDateObject(params.value));

  const handleDateChange = (selectedDate) => {
    if (selectedDate && isValid(selectedDate)) {
      const formattedDate = format(selectedDate, 'yyyyMMdd');
      setDate(selectedDate);
      // onChange(formattedDate);
      //선택한 데이터를 Textfield에 표시
      params.row[params.field] = formattedDate;
    } else {
      alert('Please enter a valid date in the format yyyyMMdd or yyyy-MM-dd.');
      setDate(null); // 유효하지 않은 입력 처리
    }
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      customInput={<TextField fullWidth />}
    />
  );
}

//검색필드 날짜 컴포넌트
export function SchDateField (props) {
  const classes = useStyles(); 
  var propId = props.id ? props.id : 'noneId';

  return (
    <DivDefault props={props}>
      <LabelDefault >{props.label}</LabelDefault>
      <DatePicker
        id={props.id ? props.id : 'noneId'}
        name={props.id ? props.id : 'noneId'}
        selected={parseSetDate(props.selected)}
        className={classes.datePicker}
        dateFormat='yyyy-MM-dd' // 날짜 형태
        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
        maxDate={new Date('2099-12-31')} // maxDate 이후 날짜 선택 불가
        onChange={props.onChange ? (e)=>props.onChange(parseDateString(e), props.id) : false}
        onKeyDown={props.onKeyDown || (()=>{})}
      />
    </DivDefault>
  )
}
//폼 입력 컴포넌트
export function FrmTextField(props){
  const readonly = (props.readonly ? true : false);
  const maxLength = (props.maxLength ? props.maxLength : 200);

  const patternMap = {
    'DEFAULT' : '[A-Za-z0-9]*', // 글자와 숫자만 허용
    'NUMBER' : '[0-9]*', // 숫자만 허용
    'PERSONAL_NO' : '\\d{6}-[1-4]\\d{6}', // 주민등록번호 형식 허용 (YYYYMMDD-XXXXXX)
    'BIZ_NO' : '\\d{3}-\\d{2}-\\d{5}', // 사업자번호 형식 (XXX-XX-XXXXX)
    'PHONE_NUMBER' : '\\d{2,3}-\\d{3,4}-\\d{4}', // 전화번호 형식 허용 (XX-XXX-XXXX or XXX-XXXX-XXXX)
    'POST_NO' : '\\d{5}', // 5자리 우편번호만 허용
  }

  const pattern = (props.pattern ? patternMap[props.pattern] : patternMap["DEFAULT"])


  return (
    <TextField
    label={props.name}
    value={props.formData[props.id]}
    name={props.name}
    onChange={props.onChange ? (e)=>props.onChange(e.target.value, props.id) : false}
    error={!!props.errors[props.id]}
    helperText={props.errors[props.id] || ''}
    fullWidth
    inputProps={{
      pattern: pattern,
      readOnly: readonly,
      maxLength: maxLength
    }}
  />
  )
}

//폼 셀렉트 컴포넌트
export function FrmSelect(props){
  const readonly = (props.readonly ? true : false);
  return (
    <FormControl fullWidth>
    <InputLabel id={`${props.id}-label`}>{props.name}</InputLabel>
    <Select
      labelId={`${props.id}-label`}
      label={props.name}
      name={props.code}
      value={props.formData[props.id]}
      onChange={props.onChange ? (e)=>props.onChange(e.target.value, props.id) : false}
      error={!!props.errors[props.id]}
      inputProps={{
        readOnly: readonly,
      }}
    >
      {props.list && props.list.map((option) => (
        <MenuItem key={option.value+option.label} value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}
// 날짜 선택 컴포넌트
export function FrmDate(props) {
  const classes = useStyles();

  return (
    <>
    <FormControl fullWidth >
      {/* <style>
          {`
            .react-datepicker-wrapper {
              width: 100%;
            }
          `}
        </style> */}
      {/* <InputLabel id={`${props.id}-label`}>{props.name}</InputLabel> */}
      <DatePicker
        className={classes.datePicker}
        name={props.name}
        // placeholderText={props.name}
        // labelId={`${props.id}-label`}
        // label={props.name}
        selected={parseSetDate(props.selected)}
        dateFormat='yyyy-MM-dd' // 날짜 형태
        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
        maxDate={new Date('2099-12-31')} // maxDate 이후 날짜 선택 불가
        onChange={props.onChange ? (e)=>props.onChange(parseDateString(e), props.id) : false}
        customInput={<TextField label={props.name} style={{width:'100%'}}  fullWidth/>}
      />
    </FormControl>
    </>
  )
}

// //셀렉트 컴포넌트
// export function SelectDefault (props) {
//   const classes = useStyles(); 
//   return (
//     <DivDefault props={props}>
//       {props.labeling ? <LabelDefault >{props.label}</LabelDefault> : ''}

//       <Select
//         //필수확인
//           required={props.required}
//         //아이디
//           id={props.id}
//         //Form 이름
//           name={props.id}
//         //값
//           value={props.value||''}
//         //..
//           label={props.label}
//         //가로 100%여부.
//           fullWidth
//         //값변경이벤트, 함수연결
//           onChange={props.onChagneHandle}
//         //라벨링 유무에 따른, 컴포넌트 좌 또는 위 라벨링표시여부
        
//           // ={{ shrink : (props.labeling ? false : true) }}
//         //에러CSS
//           error={props.required && !props.value ? true : false }
//         //에러시 표시할안내문구.
//           //helperText={props.required && !props.value ? `${props.label}은(는))필수입력입니다.` : '' }
//         //미사용처리여부
//           disabled={props.disabled}
//         >
//         {/* 전달받은 data(code, name) 으로 콤보박스구성 */}
//           {props.data && props.data.map((list, idx)=>{
//             return <MenuItem key={idx} value={list.CODE}>{list.NAME}</MenuItem>
//           })}
//         </Select>
//     </DivDefault>
//   )
// }
