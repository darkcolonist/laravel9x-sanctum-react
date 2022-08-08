import { Typography, Divider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyAwesomeComponent from './MyAwesomeComponent';

export default function(){
  return <React.Fragment>
    <Typography component="h1">you are viewing the Kwa page</Typography>
    <Divider />
      <Routes>
          <Route path="/" element={<div>kwa 1</div>} />
          <Route path="about" element={<div>kwa 2</div>} />
          <Route path="wow" element={<MyAwesomeComponent />} />
      </Routes>
  </React.Fragment>
}
