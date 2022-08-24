import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useDialogStore } from './appState';

export default function() {
  const { open, element, elementProps } = useDialogStore();

  // console.info('dialog rendering...'); // debug

  // const handleClickOpen = () => {
  //   useDialogStore.setState({ open: true });
  // };

  const handleClose = () => {
    useDialogStore.setState({ open: false });
  };

  return (<Dialog
    maxWidth='xs'
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    {React.createElement(element, elementProps)}
    
  </Dialog>);
}