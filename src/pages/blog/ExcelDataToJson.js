import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

export function ExcelDataToJson() {
  const [previewData, setPreviewData] = useState([]);
  const [returnJsonData, setReturnJsonData] = useState([]);

  const initData = () => {
    setPreviewData([]);
    setReturnJsonData([]);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    const rows = clipboardData.trim().split('\n').map(row => row.split('\t'));
    setPreviewData(rows);
  };

  const convertToJson = () => {
    if (previewData.length === 0) {
      alert('데이터를 붙여넣기 후 변환하세요.');
      return;
    }

    const headers = previewData[0];
    const jsonData = previewData.slice(1).map(row => {
      let rowData = {};
      row.forEach((cell, index) => {
        rowData[headers[index]] = cell;
      });
      return rowData;
    });
    
    setReturnJsonData(jsonData);

    try {
      navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
      alert('JSON 데이터가 클립보드에 복사되었습니다.');
    } catch (err) {
      alert('복사 실패: ', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <Card sx={{ maxWidth: 800, width: '100%', padding: '16px' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Excel 데이터 붙여넣기 → JSON 변환
          </Typography>
          <Typography variant="body2" color="textSecondary">
            엑셀 데이터를 붙여넣기 후, JSON으로 변환하고 클립보드로 복사할 수 있습니다.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginY: '16px' }}>
            <Button variant="contained" color="primary" onClick={convertToJson}>
              변환 & 복사
            </Button>
            <Button variant="outlined" color="secondary" onClick={initData}>
              초기화
            </Button>
          </Box>

          <TextField
            placeholder="여기에 엑셀 데이터를 붙여넣으세요..."
            onPaste={handlePaste}
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '16px', minHeight: '100px' }}
          />

          {previewData.length > 0 && (
            <TableContainer component={Paper} sx={{ maxHeight: 200, overflowY: 'auto', marginBottom: '16px' }}>
              <Table stickyHeader size="small">
                <TableBody>
                  {previewData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} align="left" sx={{ padding: '4px' }}>
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {returnJsonData.length > 0 && (
            <Box sx={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px', overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                변환된 JSON 데이터:
              </Typography>
              <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto' }}>
                {JSON.stringify(returnJsonData, null, 2)}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
