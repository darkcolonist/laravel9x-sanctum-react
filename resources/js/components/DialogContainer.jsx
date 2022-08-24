import React from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, LinearProgress } from "@mui/material";

export default function({loading, loadingContent, loadingTitle, title, content, actions, ...props}){
  loadingTitle = loadingTitle || "loading"
  loadingContent = loadingContent || <LinearProgress />

  return <React.Fragment>
    <DialogTitle id="alert-dialog-title">
      {!loading && title}
      {loading && loadingTitle}
    </DialogTitle>
    <DialogContent>
      {loading && loadingContent}
      {!loading && content}
    </DialogContent>
    {!loading && 
      <DialogActions>
        {actions}
      </DialogActions>}
  </React.Fragment>
}