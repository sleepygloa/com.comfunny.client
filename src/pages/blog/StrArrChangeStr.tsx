import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Divider, TextField, Alert, Snackbar } from '@mui/material';

export function StrArrChangeStr() {
  const [templateString, setTemplateString] = useState(''); // 첫 번째 입력 문자열 (템플릿)
  const [replacementString, setReplacementString] = useState(''); // 두 번째 입력 문자열 (','로 구분된 값)
  const [result, setResult] = useState(''); // 결과 문자열
  
  // 알림 상태
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const handleReplace = () => {
    if (!templateString) {
      showToast('치환할 템플릿 문자열을 입력해주세요.', 'warning');
      return;
    }
    if (!replacementString) {
      showToast('변경할 값들을 입력해주세요.', 'warning');
      return;
    }

    // 1. 콤마(,)로 구분된 문자열을 배열로 변환 (공백 제거 포함)
    const replacements = replacementString.split(',').map(s => s.trim());
    
    // 2. 치환 로직
    let resultString = templateString;
    let replaceCount = 0;

    // 문자열에 포함된 '?'의 개수 확인 (선택 사항)
    const questionMarkCount = (templateString.match(/\?/g) || []).length;

    if (questionMarkCount === 0) {
        showToast("템플릿 문자열에 '?' 기호가 없습니다.", 'error');
        return;
    }

    // replacements 배열의 요소만큼 반복하며 ?를 치환
    replacements.forEach((replacement) => {
      if (resultString.includes('?')) {
        resultString = resultString.replace('?', replacement);
        replaceCount++;
      }
    });

    setResult(resultString);
    showToast(`총 ${replaceCount}개의 '?'가 치환되었습니다.`, 'success');
  };

  const showToast = (msg: string, severity: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToastMsg(msg);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleCopyResult = async () => {
      if (!result) return;
      try {
          await navigator.clipboard.writeText(result);
          showToast('결과가 클립보드에 복사되었습니다.', 'success');
      } catch (err) {
          showToast('복사에 실패했습니다.', 'error');
      }
  };

  const initData = () => {
    setTemplateString('');
    setReplacementString('');
    setResult('');
    showToast('입력값이 초기화되었습니다.', 'info');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card sx={{ maxWidth: 800, width: '100%', padding: '20px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
            🔤 String Replacement Tool
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            템플릿 문자열에 있는 <code>?</code> 기호를 입력한 값들로 순서대로 치환합니다.<br/>
            SQL 파라미터 바인딩이나 반복적인 텍스트 생성에 유용합니다.
          </Typography>
          
          <Divider sx={{ marginY: '24px' }} />

          {/* 입력 영역 1: 치환할 값들 */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            1. 변경할 값 입력 (콤마 <code>,</code> 로 구분)
          </Typography>
          <TextField
            multiline
            minRows={3}
            placeholder="예: 홍길동, 2024-01-01, 서울시 강남구"
            value={replacementString}
            onChange={(e) => setReplacementString(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '24px', backgroundColor: '#f9fafb' }}
          />

          {/* 입력 영역 2: 템플릿 문자열 */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            2. 템플릿 문자열 (<code>?</code> 포함)
          </Typography>
          <TextField
            multiline
            minRows={5}
            placeholder="예: INSERT INTO USERS (NAME, DATE, ADDRESS) VALUES ('?', '?', '?');"
            value={templateString}
            onChange={(e) => setTemplateString(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '24px', backgroundColor: '#f9fafb' }}
          />

          {/* 버튼 그룹 */}
          <Box sx={{ display: 'flex', gap: 2, marginBottom: '24px' }}>
            <Button 
              onClick={handleReplace} 
              variant="contained" 
              color="primary" 
              size="large"
              fullWidth
              sx={{ fontWeight: 'bold' }}
            >
              치환 실행
            </Button>
            <Button 
              onClick={initData} 
              variant="outlined" 
              color="secondary"
              size="large"
            >
              초기화
            </Button>
          </Box>

          <Divider sx={{ marginY: '24px' }} />

          {/* 결과 영역 */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            3. 결과 확인
          </Typography>
          <TextField
            multiline
            minRows={6}
            value={result}
            fullWidth
            variant="outlined"
            placeholder="결과가 여기에 표시됩니다."
            InputProps={{
              readOnly: true,
            }}
            sx={{ 
                backgroundColor: '#f0fdf4', // 연한 초록색 배경으로 결과 강조
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#86efac' },
                }
            }}
          />
           {result && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button onClick={handleCopyResult} size="small" color="success">
                      결과 복사하기
                  </Button>
              </Box>
          )}

        </CardContent>
      </Card>
      
      {/* 알림 메시지 (Toast) */}
      <Snackbar 
        open={toastOpen} 
        autoHideDuration={3000} 
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default StrArrChangeStr;