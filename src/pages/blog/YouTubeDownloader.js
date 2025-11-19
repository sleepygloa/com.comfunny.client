import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  CardMedia
} from '@mui/material';
import {
  YouTube as YouTubeIcon,
  CloudDownload as CloudDownloadIcon,
  Link as LinkIcon,
  ContentCopy as ContentCopyIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ErrorOutline as ErrorOutlineIcon,
  YouTube,
  Image as ImageIcon
} from '@mui/icons-material';

export default function YouTubeDownloader() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState({
    title: '',
    author: '',
    thumbnailUrl: '',
    duration: '',
    format: 'mp4',
  });
  const [copied, setCopied] = useState(false);

  const steps = ['영상 정보 추출', '포맷 다운로드', 'Firebase 업로드', '다운로드 링크 확인'];

  // 영상 정보 추출 가정 함수
  // YouTube 동영상 ID 추출 함수
  const extractVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // 영상 정보 추출 가정 함수
  const handleExtractInfo = () => {
    if (!videoUrl) {
      setError('YouTube URL을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    // 실제 구현에서는 API 호출을 하겠지만, 여기서는 가정
    setTimeout(() => {
      try {
        // URL 유효성 검사 (간단한 체크)
        if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
          throw new Error('유효한 YouTube URL이 아닙니다.');
        }

        // Video ID 추출
        const videoId = extractVideoId(videoUrl);
        
        if (!videoId) {
          throw new Error('유효한 YouTube 동영상 ID를 찾을 수 없습니다.');
        }

        // 썸네일 URL 생성
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        // 가상의 성공 데이터
        setVideoInfo({
          title: 'Comfunny Developers Tutorial',
          author: 'Comfunny Official',
          thumbnailUrl: thumbnailUrl,
          duration: '10:25',
          format: 'mp4',
        });

        setLoading(false);
        setActiveStep(1);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }, 1500);
  };

  // 다운로드 처리 가정 함수
  const handleDownload = () => {
    setLoading(true);
    setError(null);

    // 실제 구현에서는 API 호출을 하겠지만, 여기서는 가정
    setTimeout(() => {
      try {
        // 가상의 성공 데이터
        setDownloadUrl('https://storage.googleapis.com/comfunnydevelopers.firebasestorage.app/youtube_downloads/e6b5689c-c6a5-47fc-8dc3-3ddc7383214?7%EC%9A%94d%EC%A0%95%EB%B3%B4f%EC%B6%9C%EB%A0%A5%EA%B8%B0%EB%8A%A5...');
        setLoading(false);
        setCompleted(true);
        setActiveStep(3);
      } catch (err) {
        setLoading(false);
        setError('다운로드 처리 중 오류가 발생했습니다.');
      }
    }, 2000);
  };

  // URL 복사 함수
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  

  // 썸네일 영역 렌더링 함수
  const renderThumbnail = () => {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          p: 2,
        }}
      >
        {videoInfo.thumbnailUrl ? (
          <Box
            component="img"
            src={videoInfo.thumbnailUrl}
            alt={videoInfo.title}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
            onError={(e) => {
              // 이미지 로드 실패 시 대체 이미지 표시
              e.target.onerror = null;
              e.target.src = '';  // 대체 이미지가 있다면 여기에 경로 지정
              // 대체 UI 표시
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `
                <div style="
                  width: 100%;
                  height: 180px;
                  display: flex;
                  flexDirection: column;
                  alignItems: center;
                  justifyContent: center;
                  backgroundColor: #e0e0e0;
                  borderRadius: 8px;
                  color: #666;
                  text-align: center;
                  padding: 20px;
                ">
                  <svg style="width: 64px; height: 64px; color: #f44336; margin-bottom: 10px;" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
                  </svg>
                  <div>${videoInfo.title}</div>
                </div>
              `;
            }}
          />
        ) : (
          // 썸네일 URL이 없을 때 기본 표시
          <Box
            sx={{
              width: '100%',
              height: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e0e0e0',
              borderRadius: '8px',
              color: '#666',
            }}
          >
            <YouTubeIcon sx={{ fontSize: 64, color: 'error.main', mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="medium">
              {videoInfo.title || '비디오 제목'}
            </Typography>
          </Box>
        )}
      </Box>
    )
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <YouTubeIcon color="error" sx={{ fontSize: 36, mr: 2 }} />
          <Typography variant="h4" fontWeight="bold">
            YouTube 다운로더
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index || completed}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              다운로드 링크
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="YouTube URL을 입력해주세요"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                disabled={loading}
                sx={{ mr: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LinkIcon />}
                onClick={handleExtractInfo}
                disabled={loading}
                sx={{ px: 3, py: 1.5, whiteSpace: 'nowrap' }}
              >
                {loading ? '정보 추출 중...' : '정보 추출'}
              </Button>
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              YouTube 영상의 URL을 입력하고 [정보 추출] 버튼을 클릭하세요.
            </Alert>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Card sx={{ mb: 3, overflow: 'hidden', borderRadius: '12px' }}>
              <Grid container>
                <Grid item xs={12} md={4}>
                  {renderThumbnail()}
                </Grid>
                <Grid item xs={12} md={8}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {videoInfo.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {videoInfo.author}
                    </Typography>
                    <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                      <Chip
                        icon={<YouTube fontSize="small" />}
                        label={`길이: ${videoInfo.duration}`}
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        icon={<CloudDownloadIcon fontSize="small" />}
                        label={`포맷: ${videoInfo.format.toUpperCase()}`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={
                          loading ? <CircularProgress size={20} color="inherit" /> : <CloudDownloadIcon />
                        }
                        onClick={handleDownload}
                        disabled={loading}
                      >
                        {loading ? '다운로드 중...' : '다운로드'}
                      </Button>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            <Alert severity="info">
              영상 정보를 확인하고 [다운로드] 버튼을 클릭하여 다음 단계로 진행하세요.
            </Alert>
          </Box>
        )}

        {completed && (
          <Box sx={{ mt: 3 }}>
            <Alert
              severity="success"
              icon={<CheckCircleOutlineIcon />}
              sx={{ mb: 3, py: 2 }}
            >
              <Typography variant="h6">다운로드 준비가 완료되었습니다!</Typography>
              <Typography variant="body2">
                아래 링크를 사용하여 파일을 다운로드하거나 공유할 수 있습니다.
              </Typography>
            </Alert>

            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              다운로드 링크
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={downloadUrl}
                disabled
                sx={{ mr: 1 }}
              />
              <IconButton
                color={copied ? 'success' : 'primary'}
                onClick={handleCopyUrl}
                sx={{ p: 1.5, bgcolor: 'background.default' }}
              >
                {copied ? <CheckCircleOutlineIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<YouTubeIcon />}
                href={videoUrl}
                target="_blank"
              >
                원본 영상 보기
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
                href={downloadUrl}
              >
                다운로드
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Typography variant="h6" fontWeight="medium" gutterBottom>
        이용 안내
      </Typography>
      <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Typography variant="body1" paragraph>
          이 서비스는 YouTube 동영상을 다운로드하기 위한 개인적인 용도로만 사용해주세요.
          저작권이 있는 콘텐츠의 다운로드는 법적 책임이 따를 수 있습니다.
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" color="textSecondary">
            YouTube 영상 URL을 입력하여 시작하세요.
          </Typography>
          <Typography component="li" variant="body1" color="textSecondary">
            영상 정보가 추출되면 다운로드 포맷을 선택할 수 있습니다.
          </Typography>
          <Typography component="li" variant="body1" color="textSecondary">
            다운로드 링크는 24시간 동안 유효합니다.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}