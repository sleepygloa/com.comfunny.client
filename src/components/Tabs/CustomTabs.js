import React, {useContext} from 'react';
// import {
//   Route,
//   Switch,
//   Redirect,
//   withRouter,
// } from "react-router-dom";
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
// import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanels from './TabPanels';


// pages
import Dashboard from "../../pages/dashboard";
// import Notifications from "../../pages/notifications";
// import Maps from "../../pages/maps";
// import Charts from "../../pages/backup/charts";
// //sd
// import SdBiz from "../../pages/sd/Biz";

// //Sys
// import SysMenu from "../../pages/sys/Menu";
// import SysCode from "../../pages/sys/Code";
// import SysUser from "../../pages/sys/User";
// import SysAuth from "../../pages/sys/Auth";
// import SysAuthMenu from "../../pages/sys/AuthMenu";

//css
import './Tabs.css';
import { TabContext } from '../../context/TabContext';

const Components = {
  Dashboard: Dashboard,
  // Notifications: Notifications,
  // Maps: Maps,
  // Charts: Charts,

  // SdBiz: SdBiz,

  // SysMenu: SysMenu,
  // SysCode: SysCode,
  // SysUser: SysUser,
  // SysAuth: SysAuth,
  // SysAuthMenu: SysAuthMenu,
  // SysAuthUser: SysAuthUser
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {children}
      {/* {value === index && (
        {children}
        // <Box p={3}>
        //   <Typography>{children}</Typography>
        // </Box>
      )} */}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  // index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    padding: '0px',
    backgroundColor: theme.palette.background.paper,
    border:'1px gray solid'
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles(); 
  // const [value, setValue] = React.useState(0);
  const { currTabList, selTabIdx, setSelTabIdx } = useContext(TabContext);

  const handleChange = (event, newValue) => {
    setSelTabIdx(newValue);
  };

  return (
    <div className={classes.root}>
        {/* 탭메뉴들 */}
        <Tabs
          value={selTabIdx}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          style={{minHeight:'30px'}}
        >
          {currTabList && currTabList.map((menu)=>{
            return (
                    <Tab label={menu.menuNm} key={menu.idx} {...a11yProps(menu.idx)} style={{minHeight:'30px', minWidth:'1px'}} />
                  )
          })}
        </Tabs>
        
        {/* 탭 내용 */}
        <TabPanels>
        {currTabList && currTabList.map((tab)=>{
          var ComponentId = Components[tab.menuId];
          return (
            <TabPanel value={selTabIdx} index={tab.idx} key={tab.idx}>
              <ComponentId menuNm={tab.menuNm} />
            </TabPanel>
          )
        })}
        </TabPanels>
    </div>
  );
}
