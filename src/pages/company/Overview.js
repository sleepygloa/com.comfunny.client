import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Divider,
  Paper
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function CompanyOverview() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* 회사 소개 헤더 */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          회사 소개
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          혁신적인 물류 솔루션으로 세상을 연결합니다
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {/* 메인 소개 */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            물류 산업의 디지털 혁신 파트너
          </Typography>
          <Typography variant="body1" paragraph>
            저희 회사는 2010년 설립 이후 지속적인 기술 혁신과 서비스 품질 향상을 통해 물류 산업의 디지털 트랜스포메이션을 선도하고 있습니다. 
            창고관리시스템(WMS), 운송관리시스템(TMS), 물류 자동화 솔루션 등 다양한 물류 소프트웨어 및 시스템을 개발하여 고객사의 물류 프로세스 최적화와 효율성 증대에 기여하고 있습니다.
          </Typography>
          <Typography variant="body1">
            빠르게 변화하는 글로벌 물류 환경과 소비자 요구에 대응하기 위해 인공지능, 빅데이터, 클라우드 컴퓨팅, IoT 등 최신 기술을 활용한 솔루션을 제공하며, 
            국내외 다양한 기업들과의 파트너십을 통해 물류 생태계를 확장해 나가고 있습니다.
          </Typography>
        </Paper>

        {/* 회사 정보 카드 */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BusinessIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" component="div">
                    회사 개요
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">회사명</Typography>
                  <Typography variant="body2">컴퍼니 로지텍</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">설립일</Typography>
                  <Typography variant="body2">2010년 3월 15일</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">대표이사</Typography>
                  <Typography variant="body2">홍길동</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">본사 위치</Typography>
                  <Typography variant="body2">서울특별시 강남구 테헤란로 123</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">주요 사업</Typography>
                  <Typography variant="body2">물류 솔루션 개발 및 공급, 물류 컨설팅</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">임직원 수</Typography>
                  <Typography variant="body2">120명 (2023년 기준)</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PeopleIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" component="div">
                    조직 구성
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">연구개발본부</Typography>
                  <Typography variant="body2">45명</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">컨설팅사업부</Typography>
                  <Typography variant="body2">25명</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">영업마케팅부</Typography>
                  <Typography variant="body2">20명</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">고객지원팀</Typography>
                  <Typography variant="body2">15명</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">경영지원부</Typography>
                  <Typography variant="body2">10명</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">품질관리팀</Typography>
                  <Typography variant="body2">5명</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 핵심 가치 */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          핵심 가치
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                <VerifiedIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="div" gutterBottom>
                  고객 중심
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  모든 비즈니스 결정과 솔루션 개발 과정에서 고객의 니즈와 요구사항을 최우선으로 고려합니다.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                <VerifiedIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="div" gutterBottom>
                  혁신
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  지속적인 연구개발과 기술 혁신을 통해 물류 산업의 새로운 표준을 제시합니다.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                <VerifiedIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="div" gutterBottom>
                  전문성
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  물류 업계에 대한 깊은 이해와 기술적 전문성을 바탕으로 최적의 솔루션을 제공합니다.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                <VerifiedIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="div" gutterBottom>
                  지속가능성
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  환경과 사회적 책임을 고려한 지속가능한 물류 솔루션 개발에 앞장섭니다.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* CEO 메시지 */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            mb: 6,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              bgcolor: 'primary.main', 
              opacity: 0.05,
              zIndex: 0
            }} 
          />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              CEO 메시지
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
              "저희 회사는 단순히 물류 솔루션을 제공하는 기업을 넘어, 고객사의 디지털 혁신을 함께 이끌어가는 파트너가 되고자 합니다. 
              물류는 모든 산업의 근간이며, 효율적인 물류 시스템은 기업의 경쟁력과 직결됩니다. 
              우리의 기술과 경험을 바탕으로 고객사의 물류 프로세스를 최적화하고, 더 나아가 지속가능한 물류 생태계를 구축하는 데 기여하겠습니다."
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                대표이사 홍길동
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}