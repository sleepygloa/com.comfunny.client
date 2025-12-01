import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Divider, Alert, Snackbar } from '@mui/material';
import * as XLSX from 'xlsx';

export function ExcelFileToJson() {
  const [returnJsonData, setReturnJsonData] = useState<any[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  
  // 알림 상태
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      
      // 첫 번째 시트 가져오기
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // 시트 데이터를 JSON으로 변환
      const json = XLSX.utils.sheet_to_json(worksheet);

      setReturnJsonData(json);
      setIsCopied(false); // 파일 업로드 시 복사 상태 초기화
      setToastMsg(`'${file.name}' 파일 변환 성공! (${json.length}건)`);
      setToastOpen(true);
    } catch (error) {
      console.error("파일 처리 중 오류 발생:", error);
      setToastMsg("파일을 읽는 중 오류가 발생했습니다.");
      setToastOpen(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(returnJsonData, null, 2));
      setIsCopied(true);
      setToastMsg("JSON 데이터가 클립보드에 복사되었습니다.");
      setToastOpen(true);
    } catch (error) {
      console.error("복사 중 오류 발생:", error);
      setIsCopied(false);
      setToastMsg("복사에 실패했습니다.");
      setToastOpen(true);
    }
  };

  const initData = () => {
    setReturnJsonData([]);
    setIsCopied(false);
    // input file 초기화를 위해 id를 사용하여 reset 할 수도 있지만,
    // React에서는 key를 변경하거나 ref를 사용하는 방식을 권장합니다.
    // 여기서는 간단히 상태만 초기화합니다.
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card sx={{ maxWidth: 800, width: '100%', padding: '20px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
            📂 Excel File to JSON Converter
          </Typography>
          <Typography variant="body2" color="textSecondary">
            엑셀 파일(.xlsx, .xls)을 업로드하면 자동으로 JSON 데이터로 변환해줍니다.
          </Typography>
          <Divider sx={{ marginY: '20px' }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              onChange={handleFileChange}
              // input props를 통해 accept 속성 추가 (엑셀 파일만 허용)
              inputProps={{ accept: ".xlsx, .xls" }}
              InputLabelProps={{ shrink: true }}
              sx={{ flexGrow: 1 }}
            />
            <Button 
                variant="outlined" 
                color="secondary" 
                onClick={initData}
                sx={{ whiteSpace: 'nowrap', height: '56px' }}
            >
              초기화
            </Button>
          </Box>

          {returnJsonData.length > 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Button
                    variant="contained"
                    color={isCopied ? "success" : "primary"}
                    onClick={handleCopy}
                    sx={{ fontWeight: 'bold' }}
                >
                    {isCopied ? "✔ 복사 완료!" : "JSON 복사하기"}
                </Button>
              </Box>
              
              <Box sx={{ 
                  padding: '16px', 
                  backgroundColor: '#282c34', 
                  borderRadius: '8px', 
                  color: '#abb2bf',
                  maxHeight: '400px', 
                  overflowY: 'auto',
                  border: '1px solid #e0e0e0'
                }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#61dafb', borderBottom: '1px solid #444', pb: 1, mb: 1 }}>
                  ▼ 변환 결과 ({returnJsonData.length} rows)
                </Typography>
                <pre style={{ margin: 0, fontSize: '13px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(returnJsonData, null, 2)}
                </pre>
              </Box>
            </>
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
        <Alert onClose={() => setToastOpen(false)} severity={isCopied ? "success" : "info"} sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ExcelFileToJson;