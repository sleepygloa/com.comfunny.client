import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Divider, TextareaAutosize } from '@mui/material';

export function StrArrChangeStr() {
  const [templateString, setTemplateString] = useState(''); // 첫 번째 입력 문자열
  const [replacementString, setReplacementString] = useState(''); // 두 번째 입력 문자열 (','로 구분된 값)
  const [result, setResult] = useState(''); // 결과 문자열

  const handleReplace = () => {
    const replacements = replacementString.split(','); // 두 번째 입력 문자열을 배열로 변환
    let resultString = templateString; // 치환을 시작할 문자열 복사

    replacements.forEach((replacement) => {
      // '?'를 찾아 배열의 현재 요소로 치환
      resultString = resultString.replace('?', replacement.trim());
    });

    setResult(resultString); // 결과 문자열 상태 업데이트
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card sx={{ maxWidth: 800, width: '100%', padding: '16px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            문자열 치환 도구
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            문자열에서 '?'를 원하는 값으로 순차적으로 치환할 수 있습니다.
          </Typography>
          
          <Button 
            onClick={handleReplace} 
            variant="contained" 
            color="primary" 
            sx={{ marginY: '16px' }}
          >
            치환 시작
          </Button>

          <Divider sx={{ marginY: '16px' }} />

          <Typography variant="subtitle1" gutterBottom>
            변경할 문자 배열
          </Typography>
          <TextareaAutosize
            minRows={4}
            placeholder="'첫번째값, 두번째값, 세번째값' 형식으로 입력"
            value={replacementString}
            onChange={(e) => setReplacementString(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              borderColor: '#ccc',
            }}
          />

          <Divider sx={{ marginY: '16px' }} />

          <Typography variant="subtitle1" gutterBottom>
            치환할 문자열
          </Typography>
          <TextareaAutosize
            minRows={8} 
            placeholder="치환될 문자열 입력..."
            value={templateString}
            onChange={(e) => setTemplateString(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              borderColor: '#ccc',
            }}
          />

          <Divider sx={{ marginY: '16px' }} />

          <Typography variant="subtitle1" gutterBottom>
            결과 문자열
          </Typography>
          <TextareaAutosize
            minRows={8}
            value={result}
            readOnly
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              borderColor: '#ccc',
              backgroundColor: '#f5f5f5',
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
