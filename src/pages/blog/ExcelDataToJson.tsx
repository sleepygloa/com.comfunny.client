import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper,
  Alert,
  Snackbar
} from '@mui/material';

export const ExcelDataToJson: React.FC = () => {
  // 타입 정의: 엑셀 데이터는 문자열의 2차원 배열
  const [previewData, setPreviewData] = useState<string[][]>([]);
  // 변환된 JSON 데이터는 객체 배열
  const [returnJsonData, setReturnJsonData] = useState<Record<string, any>[]>([]);
  
  // 알림 상태
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const initData = () => {
    setPreviewData([]);
    setReturnJsonData([]);
  };

  // 붙여넣기 핸들러
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    
    if (!clipboardData) return;

    // 엑셀은 보통 탭(\t)으로 셀을, 엔터(\n)로 행을 구분합니다.
    const rows = clipboardData.trim().split('\n').map(row => row.split('\t'));
    setPreviewData(rows);
  };

  // JSON 변환 핸들러
  const convertToJson = async () => {
    if (previewData.length === 0) {
      setToastMsg('데이터를 먼저 붙여넣어 주세요.');
      setToastOpen(true);
      return;
    }

    // 첫 번째 행을 헤더(Key)로 사용
    const headers = previewData[0];
    
    // 두 번째 행부터 데이터(Value)로 변환
    const jsonData = previewData.slice(1).map(row => {
      let rowData: Record<string, any> = {};
      row.forEach((cell, index) => {
        // 헤더가 있는 경우에만 매핑
        if (headers[index]) {
          rowData[headers[index].trim()] = cell.trim();
        }
      });
      return rowData;
    });
    
    setReturnJsonData(jsonData);

    // 클립보드 복사
    try {
      const jsonString = JSON.stringify(jsonData, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setToastMsg('JSON 데이터가 클립보드에 복사되었습니다!');
      setToastOpen(true);
    } catch (err) {
      console.error('복사 실패:', err);
      setToastMsg('복사에 실패했습니다.');
      setToastOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card sx={{ maxWidth: 1000, width: '100%', padding: '20px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
            📊 Excel to JSON Converter
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            엑셀에서 복사한 데이터를 아래 입력창에 붙여넣으면 JSON으로 변환됩니다.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={convertToJson}
                sx={{ fontWeight: 'bold' }}
            >
              변환 및 복사
            </Button>
            <Button 
                variant="outlined" 
                color="secondary" 
                onClick={initData}
            >
              초기화
            </Button>
          </Box>

          <TextField
            label="Excel 데이터 붙여넣기 (Ctrl+V)"
            placeholder="여기에 엑셀 데이터를 붙여넣으세요..."
            onPaste={handlePaste}
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={previewData.map(row => row.join('\t')).join('\n')}
            onChange={(e) => {
                // 수동 입력도 처리하려면 로직이 필요하지만, 여기서는 붙여넣기 위주로 처리
                if(e.target.value === '') initData();
            }}
            sx={{ 
                marginBottom: '24px', 
                backgroundColor: '#f9fafb' 
            }}
          />

          {/* 미리보기 테이블 (데이터가 있을 때만 표시) */}
          {previewData.length > 0 && (
            <>
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    데이터 미리보기 ({previewData.length - 1}건)
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto', marginBottom: '24px', border: '1px solid #eee' }}>
                <Table stickyHeader size="small">
                    <TableBody>
                    {previewData.map((row, rowIndex) => (
                        <TableRow key={rowIndex} sx={{ backgroundColor: rowIndex === 0 ? '#e3f2fd' : 'inherit' }}>
                        {row.map((cell, cellIndex) => (
                            <TableCell 
                                key={cellIndex} 
                                align="left" 
                                sx={{ 
                                    fontWeight: rowIndex === 0 ? 'bold' : 'normal',
                                    borderRight: '1px solid #f0f0f0'
                                }}
                            >
                            {cell}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </>
          )}

          {/* JSON 결과 출력 영역 */}
          {returnJsonData.length > 0 && (
            <Box sx={{ mt: 4, padding: '20px', backgroundColor: '#282c34', borderRadius: '8px', color: '#abb2bf' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#61dafb' }}>
                JSON Result
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '400px', overflowY: 'auto', fontSize: '14px', fontFamily: 'monospace' }}>
                {JSON.stringify(returnJsonData, null, 2)}
              </pre>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* 알림 메시지 */}
      <Snackbar 
        open={toastOpen} 
        autoHideDuration={3000} 
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ExcelDataToJson;