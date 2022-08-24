import React from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LinearProgress } from "@mui/material";

export default function({loading, loadingContent, loadingTitle, title, content, ...props}){
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
  </React.Fragment>
}