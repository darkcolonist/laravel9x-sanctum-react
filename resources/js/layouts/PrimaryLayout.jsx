import { Grid } from '@mui/material';
import React from 'react';
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';
import { BrowserRouter } from "react-router-dom";
import AxiosResponseInterceptor from '../components/AxiosResponseInterceptor';
import AppSnackbar from '../components/AppSnackbar';
import AppDialog from '../components/AppDialog';

export default function(){
  return <BrowserRouter>
    <AxiosResponseInterceptor />
    <AppSnackbar />
    <AppDialog />
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <LeftSection />
      </Grid>
      <Grid item xs={10}>
        <RightSection />
      </Grid>
    </Grid>
  </BrowserRouter>
}