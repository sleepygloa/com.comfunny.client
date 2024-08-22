import React, { useState, useEffect } from 'react';

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField, SchDateField} from "../../../components/SearchBar/Components/TextFieldDefault.js"

import { DataGrid } from "@mui/x-data-grid";
import { Box, Tabs, Tab, Badge, Grid } from '@mui/material';

//Common
import {client} from '../../../contraints.js';
import { gvGridDropdownDisLabel, 
  gvGetToday
} from "../../../components/Common.js";

//CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

//Program
import OutboundInq from "./OutboundInq.js";
import OutboundPlan from "./OutboundPlan.js";
import OutboundAllot from "./OutboundAllot.js";
import OutboundInst from "../st/StockMove.js";
import OutboundPicking from "./OutboundPicking.js";

export default function Inbound() {
  const {menuTitle} = '출고 관리';
  const PRO_URL = '/wms/ib/inbound';


  const [activeTab, setActiveTab] = useState(0);
  const tabsData = [
    { label: '출고현황', badgeContent: 0 },
    { label: '출고예정', badgeContent: 0 },
    { label: '출고할당', badgeContent: 0 },
    { label: '출고지시', badgeContent: 0 },
    { label: '출고피킹', badgeContent: 0 },
    { label: '출고상차', badgeContent: 0 },
    { label: '배송현황', badgeContent: 0 },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    // Fetch data or adjust state based on activeTab

    // const today = gvGetToday();
    // setSchValues(()=>({...schValues, ibPlanYmd: today}));
  }, [activeTab]);


  return (
    <>
      <PageTitle title={'출고 관리'} />
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="outbound tabs" variant="fullWidth">
        {tabsData.map((tab, index) => (
          <Tab 
            key={index} 
            label={<Badge badgeContent={tab.badgeContent} color="secondary">{tab.label}</Badge>} 
          />
        ))}
      </Tabs>
      {activeTab === 0 && <OutboundInq />}
      {activeTab === 1 && <OutboundPlan />}
      {activeTab === 2 && <OutboundAllot />}
      {activeTab === 3 && <OutboundInst title={""} refVal1={"OB_INST"}/>}
      {activeTab === 4 && <OutboundPicking />}
    </>
  );
}
