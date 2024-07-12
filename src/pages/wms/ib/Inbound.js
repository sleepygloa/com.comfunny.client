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
import InboundInq from "./InboundInq.js";
import InboundPlan from "./InboundPlan.js";
import InboundExam from "./InboundExam.js";
import InboundPutw from "./InboundPutw.js";

export default function Inbound() {
  const {menuTitle} = '입고 관리';
  const PRO_URL = '/wms/ib/inbound';


  const [activeTab, setActiveTab] = useState(0);
  const tabsData = [
    { label: '입고현황', badgeContent: 0 },
    { label: '입고예정', badgeContent: 0 },
    { label: '입고검수', badgeContent: 0 },
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
      <PageTitle title={'입고 관리'} />
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="inbound tabs" variant="fullWidth">
        {tabsData.map((tab, index) => (
          <Tab 
            key={index} 
            label={<Badge badgeContent={tab.badgeContent} color="secondary">{tab.label}</Badge>} 
          />
        ))}
      </Tabs>
      {activeTab === 0 && <InboundInq />}
      {activeTab === 1 && <InboundPlan />}
      {activeTab === 2 && <InboundExam />}
    </>
  );
}
