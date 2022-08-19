import { Divider, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import SectionHeaderTitle from "./SectionHeaderTitle";
export default function(){
  const location = useLocation();

  // console.info(location);

  return <React.Fragment>
    <SectionHeaderTitle>403 - Unauthorized</SectionHeaderTitle>
    <Typography variant="body1">You were trying to access a restricted section.</Typography>
    <Typography variant="body2">Click <Link underline="hover" component={RouterLink} to="/">here</Link> to go back home.</Typography>
  </React.Fragment>
}