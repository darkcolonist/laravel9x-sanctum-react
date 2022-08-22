import { IconButton, LinearProgress, Paper, Typography } from "@mui/material";
import DataGrid from "./DataGrid";
import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { detectIfCan } from "./Permission";

export default function(){
  const handleActionClick = function(action, email){
    console.info(action, email);
  }

  const columns = [
    {
      field: 'action',
      headerName: 'Actions',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const actions = [];

        if(detectIfCan('view users'))
          actions.push(<IconButton key={actions.length} onClick={e => handleActionClick("view", params.row.email)}>
            <PreviewIcon />
          </IconButton>);

        if(detectIfCan('edit users'))
          actions.push(<IconButton key={actions.length} onClick={e => handleActionClick("edit", params.row.email)}>
            <EditIcon />
          </IconButton>);

        return actions;
      }
    }
    , { field: 'name', headerName: 'name', width: 300 }
    , { field: 'email', headerName: 'email', width: 300 }
    , {
      field: 'created_at', headerName: 'created_at', width: 400,
      renderCell: params => <Moment>{params.value}</Moment>
    }
    , {
      field: 'updated_at', headerName: 'updated_at', width: 400,
      renderCell: params => <Moment>{params.value}</Moment>
    }
  ];

  const [isFetching, setIsFetching] = React.useState(true);
  const [rowCount,setRowCount] = React.useState(0);
  const [rows,setRows] = React.useState([]);
  const [rowsLoaded,setRowsLoaded] = React.useState(false);

  React.useEffect(() => {
    axios.get('user')
      .then(response => {
        setIsFetching(false);
        setRows(response.data.rows);
        setRowCount(response.data.total);
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
      loading={isFetching}
      getRowId={row => row.email}
      rowCount={rowCount} />
  </React.Fragment>
}