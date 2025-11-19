// import React from 'react';
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Timeline,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineConnector,
//   TimelineContent,
//   TimelineDot,
//   TimelineOppositeContent,
//   Paper,
//   Divider
// } from '@mui/material';
// import BusinessIcon from '@mui/icons-material/Business';
// import StarIcon from '@mui/icons-material/Star';
// import GroupsIcon from '@mui/icons-material/Groups';
// import HandshakeIcon from '@mui/icons-material/Handshake';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import SchoolIcon from '@mui/icons-material/School';
// import PublicIcon from '@mui/icons-material/Public';
// import AutorenewIcon from '@mui/icons-material/Autorenew';

// export default function CompanyHistory() {
//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ py: 4 }}>
//         {/* 회사 연혁 헤더 */}
//         <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//           회사 연혁
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary" paragraph>
//           2010년 창립 이후 지속적인 성장과 혁신의 발자취
//         </Typography>
//         <Divider sx={{ mb: 4 }} />
        
//         {/* 소개 문구 */}
//         <Paper elevation={0} sx={{ p: 3, mb: 5, bgcolor: 'background.paper', borderRadius: 2 }}>
//           <Typography variant="body1" paragraph>
//             컴퍼니 로지텍은 2010년 설립 이후 끊임없는 기술 혁신과 서비스 품질 향상을 통해 물류 산업의 디지털화를 선도해 왔습니다.
//             국내 시장에서의 성공을 기반으로 해외 시장으로 진출하며 글로벌 물류 솔루션 기업으로 성장하고 있습니다.
//             지난 10여 년간의 발자취를 통해 물류 산업의 미래를 함께 만들어가는 여정을 확인하실 수 있습니다.
//           </Typography>
//         </Paper>
        
//         {/* 타임라인 */}
//         <Timeline position="alternate">
//           {historyData.map((period, idx) => (
//             <Box key={period.year}>
//               {/* 연도 표시 */}
//               <TimelineItem>
//                 <TimelineOppositeContent sx={{ py: 3 }}>
//                   <Typography variant="h4" color="text.primary" sx={{ fontWeight: 'bold' }}>
//                     {period.year}
//                   </Typography>
//                 </TimelineOppositeContent>
//                 <TimelineSeparator>
//                   <TimelineDot color="primary" variant="outlined" />
//                   {idx < historyData.length - 1 && <TimelineConnector sx={{ height: 30 }} />}
//                 </TimelineSeparator>
//                 <TimelineContent></TimelineContent>
//               </TimelineItem>
              
//               {/* 해당 연도의 이벤트들 */}
//               {period.events.map((event, eventIdx) => (
//                 <TimelineItem key={event.title}>
//                   <TimelineOppositeContent sx={{ py: 3 }}>
//                     <Typography variant="body2" color="text.secondary">
//                       {period.year}
//                     </Typography>
//                   </TimelineOppositeContent>
//                   <TimelineSeparator>
//                     <TimelineDot sx={{ bgcolor: event.color }}>
//                       {event.icon}
//                     </TimelineDot>
//                     {(eventIdx < period.events.length - 1 || idx < historyData.length - 1) && 
//                       <TimelineConnector />
//                     }
//                   </TimelineSeparator>
//                   <TimelineContent sx={{ py: 3 }}>
//                     <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//                       <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium' }}>
//                         {event.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {event.description}
//                       </Typography>
//                     </Paper>
//                   </TimelineContent>
//                 </TimelineItem>
//               ))}
//             </Box>
//           ))}
//         </Timeline>
        
//         {/* 미래 비전 */}
//         <Box sx={{ mt: 6, mb: 4 }}>
//           <Paper 
//             elevation={0} 
//             sx={{ 
//               p: 4, 
//               bgcolor: 'background.paper', 
//               borderRadius: 2,
//               position: 'relative',
//               overflow: 'hidden'
//             }}
//           >
//             <Box 
//               sx={{ 
//                 position: 'absolute', 
//                 top: 0, 
//                 left: 0, 
//                 width: '100%', 
//                 height: '100%', 
//                 bgcolor: 'primary.main', 
//                 opacity: 0.05,
//                 zIndex: 0
//               }} 
//             />
//             <Box sx={{ position: 'relative', zIndex: 1 }}>
//               <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 미래를 향한 도전
//               </Typography>
//               <Typography variant="body1">
//                 컴퍼니 로지텍은 앞으로도 끊임없는 혁신과 도전을 통해 글로벌 물류 산업의 디지털 혁신을 선도해 나갈 것입니다.
//                 인공지능, 빅데이터, IoT 등 첨단 기술을 물류 시스템에 적용하여 더욱 똑똑하고 효율적인 물류 솔루션을 제공하고,
//                 지속가능한 친환경 물류 체계 구축에 기여하며 세계 각국의 파트너들과 함께 성장해 나가겠습니다.
//               </Typography>
//             </Box>
//           </Paper>
//         </Box>
//       </Box>
//     </Container>
//   );
  
//   // 회사 연혁 데이터
//   const historyData = [
//     {
//       year: "2010",
//       events: [
//         {
//           title: "회사 창립",
//           description: "물류 솔루션 전문기업으로 서울 강남에 설립",
//           icon: <BusinessIcon />,
//           color: "primary.main"
//         },
//         {
//           title: "초기 WMS 솔루션 개발",
//           description: "중소기업을 위한 기본 창고관리시스템 1.0 출시",
//           icon: <StarIcon />,
//           color: "primary.main"
//         }
//       ]
//     },
//     {
//       year: "2012",
//       events: [
//         {
//           title: "기업부설연구소 설립",
//           description: "물류기술 연구개발을 위한 기업부설연구소 개소",
//           icon: <SchoolIcon />,
//           color: "success.main"
//         },
//         {
//           title: "벤처기업 인증 획득",
//           description: "기술혁신형 벤처기업 인증 획득",
//           icon: <EmojiEventsIcon />,
//           color: "success.main"
//         }
//       ]
//     },
//     {
//       year: "2014",
//       events: [
//         {
//           title: "WMS 엔터프라이즈 버전 출시",
//           description: "대규모 물류센터를 위한 확장형 WMS 솔루션 출시",
//           icon: <StarIcon />,
//           color: "secondary.main"
//         },
//         {
//           title: "주요 유통업체 파트너십 체결",
//           description: "국내 대형 유통기업 3사와 전략적 파트너십 체결",
//           icon: <HandshakeIcon />,
//           color: "secondary.main"
//         }
//       ]
//     },
//     {
//       year: "2016",
//       events: [
//         {
//           title: "클라우드 기반 WMS 출시",
//           description: "SaaS 형태의 클라우드 기반 WMS 솔루션 출시",
//           icon: <AutorenewIcon />,
//           color: "info.main"
//         },
//         {
//           title: "본사 확장 이전",
//           description: "서울 테헤란로 신사옥으로 본사 확장 이전",
//           icon: <BusinessIcon />,
//           color: "info.main"
//         }
//       ]
//     },
//     {
//       year: "2018",
//       events: [
//         {
//           title: "해외 지사 설립",
//           description: "베트남, 싱가포르 지사 설립을 통한 동남아시아 시장 진출",
//           icon: <PublicIcon />,
//           color: "warning.main"
//         },
//         {
//           title: "물류기술 혁신상 수상",
//           description: "물류기술 혁신 부문 산업통상자원부 장관상 수상",
//           icon: <EmojiEventsIcon />,
//           color: "warning.main"
//         }
//       ]
//     },
//     {
//       year: "2020",
//       events: [
//         {
//           title: "AI 기반 물류 솔루션 출시",
//           description: "인공지능과 기계학습을 활용한 물류 예측 시스템 상용화",
//           icon: <StarIcon />,
//           color: "error.main"
//         },
//         {
//           title: "임직원 100명 돌파",
//           description: "지속적인 성장으로 임직원 100명 규모 달성",
//           icon: <GroupsIcon />,
//           color: "error.main"
//         }
//       ]
//     },
//     {
//       year: "2022",
//       events: [
//         {
//           title: "ESG 경영 선포",
//           description: "환경친화적 물류 솔루션 개발 및 사회적 책임 경영 선언",
//           icon: <PublicIcon />,
//           color: "primary.dark"
//         },
//         {
//           title: "디지털 물류 혁신센터 개소",
//           description: "첨단 물류 기술 연구 및 테스트를 위한 혁신센터 개소",
//           icon: <BusinessIcon />,
//           color: "primary.dark"
//         }
//       ]
//     },
//     {
//       year: "2024",
//       events: [
//         {
//           title: "글로벌 물류 플랫폼 론칭",
//           description: "국제 물류를 위한 통합 디지털 플랫폼 출시",
//           icon: <PublicIcon />,
//           color: "success.dark"
//         },
//         {
//           title: "세계 물류기술 어워드 수상",
//           description: "물류 디지털 트랜스포메이션 부문 세계적 권위의 상 수상",
//           icon: <EmojiEventsIcon />,
//           color: "success.dark"
//         }
//       ]
//     }
//   ];