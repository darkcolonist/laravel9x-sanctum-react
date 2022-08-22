import { Button, IconButton } from "@mui/material";
import DataGrid from "./DataGrid";
import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import Permission, { detectIfCan } from "./Permission";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function(){
  const navigate = useNavigate();

  const handleActionClick = function(action, email){
    // console.info(action, email);
    navigate(`/dashboard/users/${action}/${email}`);
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
          actions.push(<IconButton title={`view ${params.row.name}`} key={actions.length} onClick={e => handleActionClick("view", params.id /* or params.row.email */)}>
            <PreviewIcon />
          </IconButton>);

        if(detectIfCan('edit users'))
          actions.push(<IconButton title={`edit ${params.row.name}`} key={actions.length} onClick={e => handleActionClick("edit", params.id /* or params.row.email */)}>
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

  React.useEffect(() => {
    axios.get('user')
      .then(response => {
        setIsFetching(false);
        setRows(response.data.rows);
        setRowCount(response.data.total);
      });
  },[]);

  return <React.Fragment>
    <SectionHeaderTitle>Users</SectionHeaderTitle>
    <DataGrid 
      columns={columns} 
      rows={rows}
      loading={isFetching}
      getRowId={row => row.email}
      toolbarItems={
        <React.Fragment>
          <Permission can="create users">
            <Button onClick={() => {
              navigate('/dashboard/users/new');
            }}><AddIcon /> New User</Button>
          </Permission>
        </React.Fragment>
      }
      rowCount={rowCount} />
  </React.Fragment>
}