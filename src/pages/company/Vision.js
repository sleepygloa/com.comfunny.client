// import React from 'react';
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Grid, 
//   Card, 
//   CardContent,
//   Paper,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
// import SpeedIcon from '@mui/icons-material/Speed';
// import PublicIcon from '@mui/icons-material/Public';
// import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

// export default function CompanyVision() {
//   // 핵심 가치 데이터
//   const coreValues = [
//     {
//       title: "혁신",
//       description: "지속적인 기술 혁신과 창의적인 사고를 통해 물류 산업의 새로운 가치를 창출합니다.",
//       icon: <EmojiObjectsIcon fontSize="large" sx={{ color: 'primary.main' }} />
//     },
//     {
//       title: "고객 중심",
//       description: "고객의 니즈와 문제점을 깊이 이해하고, 이를 해결하기 위한 최적의 솔루션을 제공합니다.",
//       icon: <CheckCircleIcon fontSize="large" sx={{ color: 'primary.main' }} />
//     },
//     {
//       title: "신속성",
//       description: "빠르게 변화하는 시장에 민첩하게 대응하며, 고객에게 적시의 서비스를 제공합니다.",
//       icon: <SpeedIcon fontSize="large" sx={{ color: 'primary.main' }} />
//     },
//     {
//       title: "글로벌 마인드",
//       description: "국제적 시각에서 사업을 바라보며, 다양한 문화와 시장에 적합한 솔루션을 개발합니다.",
//       icon: <PublicIcon fontSize="large" sx={{ color: 'primary.main' }} />
//     },
//     {
//       title: "지속가능성",
//       description: "환경과 사회적 책임을 고려한 지속가능한 비즈니스 모델과 솔루션을 추구합니다.",
//       icon: <AllInclusiveIcon fontSize="large" sx={{ color: 'primary.main' }} />
//     }
//   ];

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ py: 4 }}>
//         {/* 비전 및 미션 헤더 */}
//         <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//           비전 및 미션
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary" paragraph>
//           물류 디지털 혁신을 선도하는 글로벌 리더
//         </Typography>
//         <Divider sx={{ mb: 4 }} />

//         {/* 비전 섹션 */}
//         <Grid container spacing={4} sx={{ mb: 6 }}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <VisibilityIcon sx={{ color: 'primary.main', mr: 1, fontSize: 30 }} />
//                   <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
//                     비전 (Vision)
//                   </Typography>
//                 </Box>
//                 <Divider sx={{ mb: 3 }} />
//                 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'medium' }}>
//                   "물류의 디지털 혁신을 선도하는 글로벌 솔루션 리더"
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   저희 회사는 최첨단 기술을 활용하여 물류 산업의 디지털 트랜스포메이션을 선도하는 글로벌 리더가 되는 것을 목표로 합니다.
//                   인공지능, 빅데이터, IoT 등의 기술을 물류 프로세스에 접목하여 효율성과 투명성을 극대화하고, 
//                   물류 산업의 미래를 새롭게 정의하는 혁신적인 솔루션을 지속적으로 개발하겠습니다.
//                 </Typography>
//                 <Typography variant="body1">
//                   또한 환경 친화적이고 지속가능한 물류 생태계를 구축하여 기업의 사회적 책임을 다하고, 
//                   글로벌 시장에서 신뢰받는, 고객과 함께 성장하는 파트너가 되겠습니다.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <EmojiObjectsIcon sx={{ color: 'primary.main', mr: 1, fontSize: 30 }} />
//                   <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
//                     미션 (Mission)
//                   </Typography>
//                 </Box>
//                 <Divider sx={{ mb: 3 }} />
//                 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'medium' }}>
//                   "혁신적인 물류 솔루션으로 고객의 가치를 창출하고 세상을 연결합니다"
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   저희 회사는 첨단 기술과 물류 전문성을 바탕으로 고객의 물류 프로세스를 최적화하고, 
//                   비즈니스 가치를 극대화하는 혁신적인 솔루션을 제공합니다.
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   물류는 단순한 상품의 이동이 아닌, 세상을 연결하는 중요한 가치 사슬입니다. 
//                   우리는 이러한 물류의 본질적 가치를 극대화하여 사람과 사람, 기업과 소비자, 
//                   나아가 국가와 국가를 효율적으로 연결하는 데 기여하고자 합니다.
//                 </Typography>
//                 <Typography variant="body1">
//                   지속적인 연구개발과 혁신을 통해 물류 산업의 새로운 표준을 제시하고, 
//                   고객과 파트너, 임직원 모두가 함께 성장하는 지속가능한 미래를 만들어 나가겠습니다.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* 핵심 가치 섹션 */}
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
//           핵심 가치 (Core Values)
//         </Typography>
//         <Paper elevation={1} sx={{ p: 4, borderRadius: 2, mb: 6 }}>
//           <Grid container spacing={3}>
//             {coreValues.map((value, index) => (
//               <Grid item xs={12} key={index}>
//                 <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
//                   <Box sx={{ mr: 2, mt: 0.5 }}>{value.icon}</Box>
//                   <Box>
//                     <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 0.5 }}>
//                       {value.title}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       {value.description}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 {index < coreValues.length - 1 && <Divider sx={{ my: 2 }} />}
//               </Grid>
//             ))}
//           </Grid>
//         </Paper>

//         {/* 2030 비전 목표 */}
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
//           2030 비전 목표
//         </Typography>
//         <Paper 
//           elevation={0} 
//           sx={{ 
//             p: 4, 
//             bgcolor: 'background.paper', 
//             borderRadius: 2,
//             mb: 6,
//             position: 'relative',
//             overflow: 'hidden'
//           }}
//         >
//           <Box 
//             sx={{ 
//               position: 'absolute', 
//               top: 0, 
//               left: 0, 
//               width: '100%', 
//               height: '100%', 
//               bgcolor: 'primary.main', 
//               opacity: 0.05,
//               zIndex: 0
//             }} 
//           />
//           <Box sx={{ position: 'relative', zIndex: 1 }}>
//             <Typography variant="body1" paragraph>
//               컴퍼니 로지텍은 2030년까지 다음과 같은 목표를 달성하고자 합니다:
//             </Typography>
            
//             <List>
//               <ListItem>
//                 <ListItemIcon>
//                   <CheckCircleIcon color="primary" />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="글로벌 시장 확장" 
//                   secondary="아시아, 유럽, 북미 등 주요 물류 시장에서 선도적 위치 확보" 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemIcon>
//                   <CheckCircleIcon color="primary" />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="지속가능한 물류 솔루션" 
//                   secondary="탄소 배출을 최소화하는 친환경 물류 시스템 개발 및 보급" 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemIcon>
//                   <CheckCircleIcon color="primary" />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="AI 기반 완전 자동화 물류 플랫폼" 
//                   secondary="인공지능과 로보틱스 기술을 활용한 차세대 자동화 물류 시스템 구축" 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemIcon>
//                   <CheckCircleIcon color="primary" />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="디지털 물류 생태계 조성" 
//                   secondary="다양한 파트너사와의 협업을 통한 통합 물류 생태계 구축 및 확장" 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemIcon>
//                   <CheckCircleIcon color="primary" />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="물류 혁신 인재 양성" 
//                   secondary="물류 기술 전문가 양성 프로그램을 통한 산업 인재 육성 및 사회 기여" 
//                 />
//               </ListItem>
//             </List>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }