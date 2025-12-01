import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Grid, Paper, Chip } from '@mui/material';
import { ChangeCircle, CleaningServices } from '@mui/icons-material';
import * as Diff from 'diff';

export default function TextDiffChecker() {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  const [diffResult, setDiffResult] = useState<Diff.Change[]>([]);
  const [hasDiff, setHasDiff] = useState(false);

  const handleCompare = () => {
    if (!oldText && !newText) return;

    // 문자열 단위 비교 (단어 단위: diffWords, 글자 단위: diffChars, 줄 단위: diffLines)
    // 여기서는 줄 단위 비교를 기본으로 하되, 필요에 따라 변경 가능
    const diff = Diff.diffLines(oldText, newText);
    setDiffResult(diff);
    setHasDiff(true);
  };

  const handleClear = () => {
    setOldText('');
    setNewText('');
    setDiffResult([]);
    setHasDiff(false);
  };

  const DividerWithChip = ({ label }: { label: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
        <Box sx={{ flex: 1, borderBottom: '1px solid #e0e0e0' }} />
        <Typography variant="button" sx={{ mx: 2, color: 'text.secondary' }}>
            {label}
        </Typography>
        <Box sx={{ flex: 1, borderBottom: '1px solid #e0e0e0' }} />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card sx={{ maxWidth: 1200, width: '100%', padding: '20px', boxShadow: 3, borderRadius: '16px' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
            🔍 Text Diff Checker (텍스트 비교)
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
                Original Text (원본)
              </Typography>
              <TextField
                multiline
                rows={10}
                fullWidth
                placeholder="비교할 원본 텍스트를 입력하세요..."
                value={oldText}
                onChange={(e) => setOldText(e.target.value)}
                variant="outlined"
                sx={{ bgcolor: '#fff' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="secondary">
                Changed Text (수정본)
              </Typography>
              <TextField
                multiline
                rows={10}
                fullWidth
                placeholder="수정된 텍스트를 입력하세요..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                variant="outlined"
                sx={{ bgcolor: '#fff' }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<ChangeCircle />}
              onClick={handleCompare}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
            >
              비교하기
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              startIcon={<CleaningServices />}
              onClick={handleClear}
              color="error"
            >
              초기화
            </Button>
          </Box>

          {hasDiff && (
            <Box>
              <DividerWithChip label="비교 결과 (Result)" />
              
              <Paper elevation={0} sx={{ 
                p: 3, 
                bgcolor: '#1e1e1e', 
                color: '#d4d4d4', 
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: 1.6,
                overflowX: 'auto',
                minHeight: '200px',
                whiteSpace: 'pre-wrap'
              }}>
                {diffResult.map((part, index) => {
                  // 색상 스타일 결정
                  let style = {};
                  
                  if (part.added) {
                    style = { backgroundColor: '#1e3a1e', color: '#4ade80' }; // 추가됨 (초록)
                  } else if (part.removed) {
                    style = { backgroundColor: '#4b1e1e', color: '#f87171', textDecoration: 'line-through', opacity: 0.7 }; // 삭제됨 (빨강)
                  } else {
                    style = { color: '#a3a3a3' }; // 변경 없음 (회색)
                  }

                  return (
                    <span key={index} style={style}>
                      {part.value}
                    </span>
                  );
                })}
              </Paper>
              
              <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Chip label="Added (추가됨)" size="small" sx={{ bgcolor: '#1e3a1e', color: '#4ade80', border: '1px solid #4ade80' }} />
                <Chip label="Removed (삭제됨)" size="small" sx={{ bgcolor: '#4b1e1e', color: '#f87171', border: '1px solid #f87171' }} />
                <Chip label="Unchanged (변경없음)" size="small" sx={{ bgcolor: '#1e1e1e', color: '#a3a3a3', border: '1px solid #555' }} />
              </Box>
            </Box>
          )}

        </CardContent>
      </Card>
    </Box>
  );
}