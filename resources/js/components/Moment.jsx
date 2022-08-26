import React from 'react';
import styled from '@mui/material/styles/styled';
import moment from 'moment';
import { Typography } from '@mui/material';

const defaultFormat = "dddd, MMMM Do YYYY, h:mm:ssA ZZ"

export function format(value, format){
  return moment(value).format(format || defaultFormat);
}

function fromNow(value){
  return moment(value).fromNow();
}

export default function(props){
  let CodeWrapper = styled(Typography)({
    fontFamily: "monospace"
  });

  const { format: preferredFormat, children: value } = props;

  let displayDate = "NaD";
  let title = value;

  switch (preferredFormat){
    case "fromNow":
      displayDate = fromNow(value);
      title = format(value);
      break;
    default:
      displayDate = format(value, preferredFormat);
      break;
  }

  return <CodeWrapper title={title} {...props}>{displayDate}</CodeWrapper>
}