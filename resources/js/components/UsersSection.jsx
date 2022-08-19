import { LinearProgress, Paper, Typography } from "@mui/material";
import DataGrid from "./DataGrid";
import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";

const columns = [
  { field: 'name', headerName: 'name', width: 300 }
  , { field: 'email', headerName: 'email', width: 300 }
  , { field: 'created_at', headerName: 'created_at', width: 400, 
      renderCell: params => <Moment>2020-01-01</Moment> }
  , { field: 'updated_at', headerName: 'updated_at', width: 400, 
      renderCell: params => <Moment>2020-01-01</Moment> }
];

export default function(){
  const [rows,setRows] = React.useState([]);
  const [rowsLoaded,setRowsLoaded] = React.useState(false);

  React.useEffect(() => {
    axios.get('user')
      .then(response => {
        setRows(response.data);
        setRowsLoaded(true);
      });
  },[]);

  const userRenderer = [];

  if(rowsLoaded){
    rows.forEach((user, index) => {
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
    <DataGrid 
      columns={columns} 
      rows={rows}
      getRowId={row => row.email}
      rowCount={99} />
  </React.Fragment>
}