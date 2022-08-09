import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BooksSection from './BooksSection';
import LoginSection from './LoginSection';
import LogoutSection from './LogoutSection';
import MyAwesomeComponent from './MyAwesomeComponent';

export default function(){
  return <React.Fragment>
    <Box sx={{p:2}}>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="about" element={<div>about</div>} />
        <Route path="books" element={<BooksSection />} />
        <Route path="wow" element={<MyAwesomeComponent />} />
        <Route path="login" element={<LoginSection />} />
        <Route path="logout" element={<LogoutSection />} />
      </Routes>
    </Box>
  </React.Fragment>
}