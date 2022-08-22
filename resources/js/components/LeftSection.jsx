import { Paper, MenuList, MenuItem, ListItemText, ListItemIcon, Divider, Collapse } from '@mui/material';
import React from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuthStore } from './appState';
import Permission from './Permission';

function CustomLinkMenuItem({children, to, end, ...props}){
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: end && true });

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
  return <Collapse in={loggedIn}>
    {props.children}
  </Collapse>
}

export default function(){
  const { email, loggedIn } = useAuthStore();

  return <Paper>
    <MenuList dense>
      <MenuItem disabled>
        <ListItemText>{app.name}</ListItemText>
      </MenuItem>
      <Collapse in={loggedIn}><Divider /></Collapse>
      <Collapse in={loggedIn}><MenuItem disabled>
        <ListItemText>Welcome, {email}</ListItemText>
      </MenuItem></Collapse>
      <Collapse in={loggedIn}><Divider /></Collapse>
      <CustomLinkMenuItem to="/">Home</CustomLinkMenuItem>
      <ProtectedLinks>
        <CustomLinkMenuItem to="/dashboard/wow">Wow</CustomLinkMenuItem>
        <Permission can="view books">
          <CustomLinkMenuItem to="/dashboard/books" end={false}>Books</CustomLinkMenuItem>
        </Permission>
        <Permission can="view users">
          <CustomLinkMenuItem to="/dashboard/users" end={false}>Users</CustomLinkMenuItem>
        </Permission>
      </ProtectedLinks>
      <CustomLinkMenuItem to="/about">About</CustomLinkMenuItem>
      <Divider  />
      <Collapse in={loggedIn}><CustomLinkMenuItem to="/dashboard/logout">Logout</CustomLinkMenuItem></Collapse>
      <Collapse in={!loggedIn}><CustomLinkMenuItem to="/login">Login</CustomLinkMenuItem></Collapse>
    </MenuList>
  </Paper>
}