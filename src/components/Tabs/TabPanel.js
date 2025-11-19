import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';



export default function TabPanel({ children }, props) {
  const classes = useStyles();

  return (
    <TabPanel value={props.value} index={props.index}>
    { children }
    </TabPanel>
  );
}
