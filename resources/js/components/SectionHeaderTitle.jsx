import React from "react";
import { Divider, Typography } from "@mui/material";

export default function(props){
  return <React.Fragment>
    <Typography {...props} variant="h5"></Typography>
    <Divider />
  </React.Fragment>
}