import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
const BooksSection = React.lazy(() => import('./BooksSection'));
const LoginSection = React.lazy(() => import('./LoginSection'));
const LogoutSection = React.lazy(() => import('./LogoutSection'));
const MyAwesomeComponent = React.lazy(() => import('./MyAwesomeComponent'));

function Suspense(props){
  return <React.Suspense {...props} fallback={<span>...</span>} />
}

export default function(){
  // console.log('touch');
  return <React.Fragment>
    <Box sx={{p:2}}>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="about" element={<div>about</div>} />
        <Route path="books" element={<Suspense><BooksSection /></Suspense>} />
        <Route path="wow" element={<Suspense><MyAwesomeComponent /></Suspense>} />
        <Route path="login" element={<Suspense><LoginSection /></Suspense>} />
        <Route path="logout" element={<Suspense><LogoutSection /></Suspense>} />
      </Routes>
    </Box>
  </React.Fragment>
}