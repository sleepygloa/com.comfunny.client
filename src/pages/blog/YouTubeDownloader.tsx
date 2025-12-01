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
} from '@mui/material';
import {
  YouTube as YouTubeIcon,
  CloudDownload as CloudDownloadIcon,
  Link as LinkIcon,
  ContentCopy as ContentCopyIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

// 비디오 정보 타입 정의
interface VideoInfo {
  title: string;
  author: string;
  thumbnailUrl: string;
  duration: string;
  format: string;
}

export default function YouTubeDownloader() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({
    title: '',
    author: '',
    thumbnailUrl: '',
    duration: '',
    format: 'mp4',
  });
  const [copied, setCopied] = useState(false);

  const steps = ['영상 정보 추출', '포맷 다운로드', 'Firebase 업로드', '다운로드 링크 확인'];

  // YouTube 동영상 ID 추출 함수
  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // 영상 정보 추출 (시뮬레이션)
  const handleExtractInfo = () => {
    if (!videoUrl) {
      setError('YouTube URL을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    // 실제 API 호출 대신 setTimeout으로 시뮬레이션
    setTimeout(() => {
      try {
        // URL 유효성 검사
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
      } catch (err: any) {
        setLoading(false);
        setError(err.message || '오류가 발생했습니다.');
      }
    }, 1500);
  };

  // 다운로드 처리 (시뮬레이션)
  const handleDownload = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        // 가상의 다운로드 URL 생성
        setDownloadUrl('https://storage.googleapis.com/comfunnydevelopers.firebasestorage.app/youtube_downloads/sample_video.mp4');
        setLoading(false);
        setCompleted(true);
        setActiveStep(3); // 마지막 단계로 이동
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
          borderRadius: '8px',
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
              display: 'block'
            }}
            onError={(e: any) => {
              // 이미지 로드 실패 시 대체 UI 표시 (단순화)
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <YouTubeIcon sx={{ fontSize: 64, color: 'error.main', mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="medium">
              비디오 미리보기
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ py: 4, maxWidth: 1000, mx: 'auto' }}>
      <Paper sx={{ p: 4, mb: 4, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <YouTubeIcon color="error" sx={{ fontSize: 36, mr: 2 }} />
          <Typography variant="h4" fontWeight="bold">
            YouTube 다운로더
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Step 0: URL 입력 */}
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              다운로드 링크 입력
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                disabled={loading}
                size="medium"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LinkIcon />}
                onClick={handleExtractInfo}
                disabled={loading}
                sx={{ px: 3, py: 1.5, whiteSpace: 'nowrap', height: '56px' }}
              >
                {loading ? '추출 중...' : '정보 추출'}
              </Button>
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              YouTube 영상의 URL을 입력하고 [정보 추출] 버튼을 클릭하세요.
            </Alert>
          </Box>
        )}

        {/* Step 1 & 2: 정보 확인 및 다운로드 */}
        {(activeStep === 1 || activeStep === 2) && (
          <Box>
            <Card sx={{ mb: 3, overflow: 'hidden', borderRadius: '12px', border: '1px solid #eee', boxShadow: 'none' }}>
              <Grid container>
                <Grid item xs={12} md={5}>
                  {renderThumbnail()}
                </Grid>
                <Grid item xs={12} md={7}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {videoInfo.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      게시자: {videoInfo.author}
                    </Typography>
                    
                    <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<YouTubeIcon fontSize="small" />}
                        label={`길이: ${videoInfo.duration}`}
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        icon={<CloudDownloadIcon fontSize="small" />}
                        label={`포맷: ${videoInfo.format.toUpperCase()}`}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={
                          loading ? <CircularProgress size={20} color="inherit" /> : <CloudDownloadIcon />
                        }
                        onClick={handleDownload}
                        disabled={loading}
                      >
                        {loading ? '서버 처리 중...' : '영상 다운로드 시작'}
                      </Button>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            {loading && (
                 <Alert severity="warning" icon={<CircularProgress size={20} />}>
                    서버에서 영상을 처리하고 있습니다. 잠시만 기다려주세요... (이 과정은 시간이 걸릴 수 있습니다)
                 </Alert>
            )}
          </Box>
        )}

        {/* Step 3: 완료 */}
        {completed && (
          <Box sx={{ mt: 3 }}>
            <Alert
              severity="success"
              icon={<CheckCircleOutlineIcon fontSize="inherit" />}
              sx={{ mb: 4, py: 2, '& .MuiAlert-message': { width: '100%' } }}
            >
              <Typography variant="h6" fontWeight="bold">다운로드 준비가 완료되었습니다!</Typography>
              <Typography variant="body2">
                아래 링크를 사용하여 파일을 다운로드하거나 공유할 수 있습니다. (링크는 24시간 동안 유효합니다)
              </Typography>
            </Alert>

            <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.secondary">
                다운로드 링크
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={downloadUrl}
                    disabled
                    size="small"
                    sx={{ mr: 1, bgcolor: 'white' }}
                />
                <IconButton
                    color={copied ? 'success' : 'primary'}
                    onClick={handleCopyUrl}
                    sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'white' }}
                >
                    {copied ? <CheckCircleOutlineIcon /> : <ContentCopyIcon />}
                </IconButton>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
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
                    color="success"
                    startIcon={<CloudDownloadIcon />}
                    href={downloadUrl}
                    download
                >
                    파일 다운로드
                </Button>
                </Box>
            </Box>
             <Button onClick={() => {setActiveStep(0); setCompleted(false); setVideoUrl('');}} sx={{mt: 4}}>
                 다른 영상 다운로드하기
             </Button>
          </Box>
        )}
      </Paper>

      <Box sx={{ px: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ErrorOutlineIcon color="info" /> 이용 안내
        </Typography>
        <Paper sx={{ p: 3, borderRadius: '12px', bgcolor: 'info.light', color: 'info.contrastText' }}>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li><Typography variant="body2">이 서비스는 개인적인 학습 및 연구 목적으로만 사용해야 합니다.</Typography></li>
            <li><Typography variant="body2">저작권이 있는 콘텐츠를 무단으로 배포하거나 상업적으로 이용할 경우 법적 책임이 따를 수 있습니다.</Typography></li>
            <li><Typography variant="body2">서버 부하 방지를 위해 대용량 영상 다운로드는 제한될 수 있습니다.</Typography></li>
          </ul>
        </Paper>
      </Box>
    </Box>
  );
}

// 아이콘이 없는 경우를 대비한 임시 아이콘 컴포넌트 (실제로는 @mui/icons-material 설치 필요)
const ErrorOutlineIcon = (props: any) => (
    <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
)