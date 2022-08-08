import { Stack, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function(){
  return <Stack spacing={1}>
    <Button component={Link} to="/">Home</Button>
    <Button component={Link} to="/about">Link 1</Button>
    <Button component={Link} to="/wow">Awesome component</Button>
    <Button>Link 2</Button>
    <Button>Link 3</Button>
    <Button>Link 4</Button>
    <Button>Link 5</Button>
  </Stack>
}
