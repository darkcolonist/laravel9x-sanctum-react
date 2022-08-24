import { Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation, useSearchParams } from "react-router-dom";
import SectionHeaderTitle from "./SectionHeaderTitle";
export default function(){
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pathname = searchParams.get('origin') || location.pathname;

  return <React.Fragment>
    <SectionHeaderTitle>404 - Section Not Found</SectionHeaderTitle>
    <Typography variant="body1">The section <code>{pathname}</code> you are looking for cannot be found.</Typography>
    <Typography variant="body2">Click <Link underline="hover" component={RouterLink} to="/">here</Link> to go back home.</Typography>
  </React.Fragment>
}