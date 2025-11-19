import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Divider } from '@mui/material';
import * as XLSX from 'xlsx';

export function ExcelFileToJson() {
  const [returnJsonData, setReturnJsonData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);

    setReturnJsonData(json);
    setIsCopied(false); // 파일 업로드 시 복사 상태 초기화
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(returnJsonData, null, 2));
      setIsCopied(true); // 복사 성공 시 알림 표시
    } catch (error) {
      console.error("복사 중 오류 발생:", error);
      setIsCopied(false);
    }
  };

  const initData = () => {
    setReturnJsonData([]);
    setIsCopied(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card sx={{ maxWidth: 600, width: '100%', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Excel 파일을 JSON으로 변환
          </Typography>
          <Typography variant="body2" color="textSecondary">
            엑셀 파일을 업로드하여 JSON 데이터로 변환하고, 복사할 수 있습니다.
          </Typography>
          <Divider sx={{ marginY: '16px' }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginY: '20px' }}>
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              onChange={handleFileChange}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="outlined" color="secondary" onClick={initData}>
              초기화
            </Button>
          </Box>

          {returnJsonData.length > 0 && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCopy}
                sx={{ marginBottom: '10px' }}
              >
                {isCopied ? "복사 완료!" : "JSON 복사"}
              </Button>
              <Box sx={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <Typography variant="h6" gutterBottom>
                  변환된 JSON 데이터:
                </Typography>
                <Typography variant="body2" component="pre">
                  {JSON.stringify(returnJsonData, null, 2)}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
