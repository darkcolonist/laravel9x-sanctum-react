import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbarStore } from './appState';

export default function(){
  const { message, severity, open, hide } = useSnackbarStore();
  const autoHideDuration = 3000;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    hide();
  };

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration}
      onClose={handleSnackbarClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};