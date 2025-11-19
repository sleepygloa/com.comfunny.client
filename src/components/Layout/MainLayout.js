import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Divider, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Custom components
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Context
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import { useLogin } from "../../context/UserContext";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, signOut, isLoginPopAction } = useLogin();
  const { isAuthenticated } = state || { isAuthenticated: false };
  
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageTitle, setPageTitle] = useState("대시보드");
  
  // User menu
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Determine page title based on route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === "/" || path === "") {
      setPageTitle("대시보드");
    } else if (path.includes("wms/sys/code")) {
      setPageTitle("시스템 코드 관리");
    } else if (path.includes("wms/sd")) {
      setPageTitle("기준 정보 관리");
    } else if (path.includes("wms/ib")) {
      setPageTitle("입고 관리");
    } else if (path.includes("wms/st")) {
      setPageTitle("재고 관리");
    } else if (path.includes("wms/ob")) {
      setPageTitle("출고 관리");
    } else if (path.includes("blog")) {
      setPageTitle("블로그");
    }
  }, [location]);
  
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated && !location.pathname.includes('/login')) {
      // Optional: Redirect to login if not authenticated
      // navigate('/login');
      // Or open login popup
      // isLoginPopAction.openPop();
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={isSidebarOpened}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleSidebar(layoutDispatch)}
            edge="start"
            sx={{ mr: 2, ...(isSidebarOpened && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          
          {isAuthenticated ? (
            <>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate('/profile')}>
                  프로필
                </MenuItem>
                <MenuItem onClick={() => navigate('/settings')}>
                  설정
                </MenuItem>
                <Divider />
                <MenuItem onClick={signOut}>
                  로그아웃
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div>
              <Button 
                color="inherit" 
                onClick={() => isLoginPopAction.openPop()}
                startIcon={<AccountCircleIcon />}
                sx={{ mr: 1 }}
              >
                로그인
              </Button>
              <Button 
                variant="outlined"
                color="inherit" 
                onClick={() => navigate('/register')}
                sx={{ 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                회원가입
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBarStyled>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isSidebarOpened}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            WMS 시스템
          </Typography>
          <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Sidebar />
      </Drawer>
      
      <Main open={isSidebarOpened}>
        <DrawerHeader />
        <Box component="div" sx={{ minHeight: 'calc(100vh - 180px)' }}>
          <Outlet />
        </Box>
        <Footer />
      </Main>
    </Box>
  );
}