import { Paper, MenuList, MenuItem, ListItemText, ListItemIcon, Typography, Divider } from '@mui/material';
import React from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuthStore } from './appState';

function CustomLinkMenuItem({children, to, ...props}){
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <MenuItem component={NavLink} to={to} {...props}
    selected={match !== null}>
    <ListItemIcon>
        {match ? <ArrowForwardIosIcon /> : undefined}
    </ListItemIcon>
    <ListItemText>{children}</ListItemText>
  </MenuItem>
}

function ProtectedLinks(props){
  const { loggedIn } = useAuthStore();
  if (!loggedIn)
    return undefined;

  return <>
    {props.children}
  </>
}

export default function(){
  const { email, loggedIn } = useAuthStore();

  return <Paper>
    <MenuList dense>
      <MenuItem disabled>
        <ListItemText>{app.name}</ListItemText>
      </MenuItem>
      {loggedIn && <Divider />}
      {loggedIn && <MenuItem disabled>
        <ListItemText>Welcome, {email}</ListItemText>
      </MenuItem>}
      {loggedIn && <Divider />}
      <CustomLinkMenuItem to="/">Home</CustomLinkMenuItem>
      <ProtectedLinks>
        <CustomLinkMenuItem to="/dashboard/wow">Wow</CustomLinkMenuItem>
        <CustomLinkMenuItem to="/dashboard/books">Books</CustomLinkMenuItem>
      </ProtectedLinks>
      <CustomLinkMenuItem to="/about">About</CustomLinkMenuItem>
      <Divider />
      {loggedIn && <CustomLinkMenuItem to="/dashboard/logout">Logout</CustomLinkMenuItem>}
      {!loggedIn && <CustomLinkMenuItem to="/login">Login</CustomLinkMenuItem>}
    </MenuList>
  </Paper>
}