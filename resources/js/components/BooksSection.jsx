import { Button, IconButton, Stack } from "@mui/material";
import DataGrid from "./DataGrid";
import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import AddIcon from '@mui/icons-material/Add';
import Permission, { detectIfCan } from "./Permission";
import { useNavigate } from "react-router-dom";
import { useDialogStore } from "./appState";
import ViewBookDialogContent from "./ViewBookDialogContent";

export default function () {
  const navigate = useNavigate();
  
  const { show: showDialog } = useDialogStore();

  const handleActionClick = function (action, email) {
    // console.info(action, email);
    navigate(`/dashboard/books/${action}/${email}`);
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

        if (detectIfCan('view books'))
          actions.push(<IconButton title={`view ${params.row.title}`} key={actions.length} onClick={e => 
            // handleActionClick("view", params.id /* or params.row.email */)
            showDialog(ViewBookDialogContent, {
              id: params.id
            })
            // showDialog(<ViewBookDialogContent id={params.id} />)
          }>
            <PreviewIcon />
          </IconButton>);

        if (detectIfCan('edit books'))
          actions.push(<IconButton title={`edit ${params.row.title}`} key={actions.length} onClick={e => handleActionClick("edit", params.id /* or params.row.email */)}>
            <EditIcon />
          </IconButton>);

        return actions;
      }
    }
    , { field: 'title', headerName: 'title', width: 450 }
    , { field: 'author', headerName: 'author', width: 150 }
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
  const [rowCount, setRowCount] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios.get('book')
      .then(response => {
        setIsFetching(false);
        setRows(response.data.rows);
        setRowCount(response.data.total);
      });
  }, []);

  return <React.Fragment>
    <SectionHeaderTitle>Books</SectionHeaderTitle>
    <DataGrid
      columns={columns}
      rows={rows}
      loading={isFetching}
      getRowId={row => row.id}
      toolbarItems={
        <React.Fragment>
          <Permission can="create books">
            <Button onClick={() => {
              navigate('/dashboard/books/new');
            }}><AddIcon /> New Book</Button>
          </Permission>
        </React.Fragment>
      }
      rowCount={rowCount} />
  </React.Fragment>
}