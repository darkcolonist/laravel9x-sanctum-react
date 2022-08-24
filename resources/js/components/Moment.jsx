import React from 'react';
import styled from '@mui/material/styles/styled';
import moment from 'moment';
import { Typography } from '@mui/material';

export function format(value, format){
  return moment(value).format(format || "dddd, MMMM Do YYYY, h:mm:ssA")
}

export default function(props){
  let CodeWrapper = styled(Typography)({
    fontFamily: "monospace"
  });

  return <CodeWrapper {...props}>{format(props.children, props.format)}</CodeWrapper>
}