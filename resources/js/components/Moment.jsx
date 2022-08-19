import React from 'react';
import styled from '@mui/material/styles/styled';
import moment from 'moment';
import { Typography } from '@mui/material';

export default function(props){
  let CodeWrapper = styled(Typography)({
    fontFamily: "monospace"
  });

  return <CodeWrapper {...props}>{moment(props.children).format(props.format || "dddd, MMMM Do YYYY, h:mm:ssA")}</CodeWrapper>
}