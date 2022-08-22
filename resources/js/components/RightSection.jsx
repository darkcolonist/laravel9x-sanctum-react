import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './appState';
import { PermitWithFallback } from './Permission';
import UnauthorizedSection from './UnauthorizedSection';
import UsersSection from './UsersSection';
const BooksSection = React.lazy(() => import('./BooksSection'));
const LoginSection = React.lazy(() => import('./LoginSection'));
const LogoutSection = React.lazy(() => import('./LogoutSection'));
const MyAwesomeComponent = React.lazy(() => import('./MyAwesomeComponent'));
const NotFoundSection = React.lazy(() => import('./NotFoundSection'));

function Suspense(props){
  return <React.Suspense {...props} fallback={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />} />
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
        <Route path="unauthorized" element={<Suspense><UnauthorizedSection /></Suspense>} />

        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="wow" element={<Suspense><MyAwesomeComponent /></Suspense>} />
          <Route path="books" element={
            <PermitWithFallback can="view books"><Suspense><BooksSection/></Suspense></PermitWithFallback>
          } />
          <Route path="users" element={
            <PermitWithFallback can="view users"><Suspense><UsersSection/></Suspense></PermitWithFallback>
          } />
          <Route path="users/new" element={
            <PermitWithFallback can="create users"><Suspense><UsersSection /></Suspense></PermitWithFallback>
          } />
          <Route path="logout" element={<Suspense><LogoutSection /></Suspense>} />
        </Route>

        <Route path="*" element={<Suspense><NotFoundSection /></Suspense>} />
      </Routes>
    </Box>
  </React.Fragment>
}