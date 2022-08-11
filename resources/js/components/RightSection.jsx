import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './appState';
const BooksSection = React.lazy(() => import('./BooksSection'));
const LoginSection = React.lazy(() => import('./LoginSection'));
const LogoutSection = React.lazy(() => import('./LogoutSection'));
const MyAwesomeComponent = React.lazy(() => import('./MyAwesomeComponent'));

function Suspense(props){
  return <React.Suspense {...props} fallback={<span>...</span>} />
}

function ProtectedRoutes(props){
  const { loggedIn } = useAuthStore();

  if (!loggedIn) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default function(){
  // console.log('touch');
  return <React.Fragment>
    <Box sx={{p:2}}>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="about" element={<div>about</div>} />
        <Route path="login" element={<Suspense><LoginSection /></Suspense>} />

        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="wow" element={<Suspense><MyAwesomeComponent /></Suspense>} />
          <Route path="books" element={<Suspense><BooksSection /></Suspense>} />
          <Route path="logout" element={<Suspense><LogoutSection /></Suspense>} />
        </Route>
      </Routes>
    </Box>
  </React.Fragment>
}