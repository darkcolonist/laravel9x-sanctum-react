import { Typography, Divider, Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginSection from './LoginSection';
import MyAwesomeComponent from './MyAwesomeComponent';

export default function(){
  return <React.Fragment>
    <Typography variant="h4">you are viewing the Kwa page</Typography>
    <Divider />
    <Box sx={{p:2}}>
      <Routes>
        <Route path="/" element={<div>kwa 1</div>} />
        <Route path="about" element={<div>kwa 2</div>} />
        <Route path="wow" element={<MyAwesomeComponent />} />
        <Route path="login" element={<LoginSection />} />
      </Routes>
    </Box>
  </React.Fragment>
}