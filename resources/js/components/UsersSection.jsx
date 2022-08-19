import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";

export default function(){
  const [users,setUsers] = React.useState([]);
  const [usersLoaded,setUsersLoaded] = React.useState(false);

  React.useEffect(() => {
    axios.get('user')
      .then(response => {
        setUsers(response.data);
        setUsersLoaded(true);
      });
  },[]);

  const userRenderer = [];

  if(usersLoaded){
    users.forEach((user, index) => {
      userRenderer.push(
        <Paper sx={{m:1, p:1}} key={index}>
          <Typography variant="body1">{user.title}</Typography>
          <Typography variant="body2">by {user.author}</Typography>
        </Paper>
      );
    });
  }
  else{
    userRenderer.push(<LinearProgress key="wait"/>);
  }

  return <React.Fragment>
    <SectionHeaderTitle>Users</SectionHeaderTitle>
    <Stack>
      {userRenderer}
    </Stack>
  </React.Fragment>
}