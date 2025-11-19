import React from "react";
import { Typography, Box, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ 
      mt: 8,
      py: 3, 
      borderTop: '1px solid #eaeaea',
      textAlign: 'center'
    }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="/">
          WMS 시스템
        </Link>{' '}
        {new Date().getFullYear()}
        {'. All rights reserved.'}
      </Typography>
      <Typography variant="body2" color="text.secondary" pt={1}>
        {'버전 1.0.0'}
      </Typography>
    </Box>
  );
}