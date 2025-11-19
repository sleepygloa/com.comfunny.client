import React, { useEffect, useState } from "react";
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Paper, 
  useTheme, 
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  CardHeader
} from "@mui/material";
import { 
  TrendingUp, 
  MoreVert, 
  ArrowUpward, 
  ArrowDownward,
  People,
  Storage,
  Timer,
  CloudUpload
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const theme = useTheme();
  const [summaryData, setSummaryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [visitorsData, setVisitorsData] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stockStatus, setStockStatus] = useState([]);

  useEffect(() => {
    // 샘플 데이터 설정
    setSummaryData([
      { title: "총 방문자", value: "1,234", unit: "명", icon: <People />, color: "#3f51b5", trend: "+12.5%" },
      { title: "새로운 데이터", value: "56", unit: "건", icon: <Storage />, color: "#f44336", trend: "+8.3%" },
      { title: "평균 체류 시간", value: "3분 42초", unit: "", icon: <Timer />, color: "#4caf50", trend: "-2.1%" },
      { title: "데이터 요청", value: "120", unit: "건", icon: <CloudUpload />, color: "#ff9800", trend: "+15.7%" },
    ]);

    setTrendData([
      { name: '1월', value: 12 },
      { name: '2월', value: 19 },
      { name: '3월', value: 3 },
      { name: '4월', value: 5 },
      { name: '5월', value: 2 },
      { name: '6월', value: 8 },
      { name: '7월', value: 14 },
      { name: '8월', value: 20 },
      { name: '9월', value: 25 },
      { name: '10월', value: 18 },
      { name: '11월', value: 22 },
      { name: '12월', value: 30 },
    ]);

    setVisitorsData([
      { name: '월', 사용자: 4000, 페이지뷰: 2400 },
      { name: '화', 사용자: 3000, 페이지뷰: 1398 },
      { name: '수', 사용자: 2000, 페이지뷰: 9800 },
      { name: '목', 사용자: 2780, 페이지뷰: 3908 },
      { name: '금', 사용자: 1890, 페이지뷰: 4800 },
      { name: '토', 사용자: 2390, 페이지뷰: 3800 },
      { name: '일', 사용자: 3490, 페이지뷰: 4300 },
    ]);

    setCategoryStats([
      { name: "건강", value: 35 },
      { name: "경제", value: 25 },
      { name: "교육", value: 20 },
      { name: "환경", value: 15 },
      { name: "기타", value: 5 },
    ]);

    setRecentActivities([
      { id: 1, user: "김영희", action: "새 데이터 추가", time: "10분 전", status: "완료" },
      { id: 2, user: "이철수", action: "재고 이동", time: "25분 전", status: "처리 중" },
      { id: 3, user: "박지성", action: "창고 위치 변경", time: "1시간 전", status: "완료" },
      { id: 4, user: "최현우", action: "출고 계획 등록", time: "3시간 전", status: "완료" },
      { id: 5, user: "정민지", action: "입고 검수", time: "5시간 전", status: "완료" },
    ]);

    setStockStatus([
      { id: 1, item: "노트북", location: "A-01-01", quantity: 25, status: "정상" },
      { id: 2, item: "스마트폰", location: "A-01-02", quantity: 50, status: "정상" },
      { id: 3, item: "태블릿", location: "A-01-03", quantity: 5, status: "부족" },
      { id: 4, item: "모니터", location: "A-02-01", quantity: 10, status: "정상" },
      { id: 5, item: "키보드", location: "A-02-02", quantity: 2, status: "부족" },
    ]);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const renderSummaryCard = (data, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card 
        sx={{ 
          height: '100%', 
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)', 
          borderRadius: '12px',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Avatar 
              sx={{ 
                bgcolor: data.color, 
                width: 48, 
                height: 48, 
                boxShadow: `0 4px 8px 0 ${data.color}40` 
              }}
            >
              {data.icon}
            </Avatar>
            <Typography 
              variant="body2" 
              sx={{ 
                bgcolor: data.trend.startsWith('+') ? '#e6f4ea' : '#fce8e6',
                color: data.trend.startsWith('+') ? '#0d652d' : '#c5221f',
                p: '4px 8px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}
            >
              {data.trend} {data.trend.startsWith('+') ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="bold">
            {data.value}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {data.title} {data.unit && <Box component="span" sx={{ fontSize: '0.8rem' }}>({data.unit})</Box>}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* 요약 통계 카드 */}
        {summaryData.map((data, index) => renderSummaryCard(data, index))}

        {/* 월별 트렌드 차트 */}
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: '12px', 
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)' 
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">월별 방문자 트렌드</Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#666" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                      border: 'none' 
                    }} 
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="방문자 수"
                    stroke={theme.palette.primary.main}
                    strokeWidth={3}
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 7, stroke: theme.palette.primary.main, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 카테고리별 통계 */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: '12px', 
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)' 
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">카테고리 분포</Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 일별 방문자 및 페이지뷰 */}
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: '12px', 
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)' 
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">일별 활동</Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={visitorsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#666" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                      border: 'none' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="사용자" name="사용자" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="페이지뷰" name="페이지뷰" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 최근 활동 */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: '12px', 
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)' 
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">최근 활동</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  textTransform: 'none' 
                }}
              >
                모두 보기
              </Button>
            </Box>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem 
                    sx={{ 
                      px: 2, 
                      py: 1,
                      borderRadius: '8px',
                      ':hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {activity.action}
                        </Typography>
                      }
                      secondary={
                        <Box component="span" display="flex" justifyContent="space-between" mt={0.5}>
                          <Typography variant="body2" color="textSecondary">
                            {activity.user}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              bgcolor: activity.status === '완료' ? '#e6f4ea' : '#fef7e0',
                              color: activity.status === '완료' ? '#0d652d' : '#b06000',
                              px: 1,
                              py: 0.5,
                              borderRadius: '12px'
                            }}
                          >
                            {activity.status}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && (
                    <Divider component="li" sx={{ my: 1 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 상품 재고 상태 */}
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: '12px', 
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)' 
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold">재고 상태</Typography>
              <Button 
                variant="contained" 
                size="small" 
                color="primary"
                sx={{ 
                  borderRadius: '8px', 
                  textTransform: 'none' 
                }}
              >
                재고 관리
              </Button>
            </Box>
            <Grid container spacing={2}>
              {stockStatus.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.id}>
                  <Card 
                    sx={{ 
                      borderRadius: '12px', 
                      boxShadow: 'none', 
                      border: '1px solid #e0e0e0',
                      height: '100%'
                    }}
                  >
                    <CardHeader 
                      title={item.item} 
                      titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                      action={
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            bgcolor: item.status === '정상' ? '#e6f4ea' : '#fce8e6',
                            color: item.status === '정상' ? '#0d652d' : '#c5221f',
                            p: '4px 8px',
                            borderRadius: '16px',
                            fontWeight: 'medium'
                          }}
                        >
                          {item.status}
                        </Typography>
                      }
                      sx={{ pb: 0 }}
                    />
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          위치: {item.location}
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          {item.quantity}개
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}