import { Button, IconButton } from "@mui/material";
import DataGrid from "./DataGrid";
import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Permission, { detectIfCan } from "./Permission";
import { useNavigate } from "react-router-dom";
import { useBookStore, useDialogStore } from "./appState";
import ViewBookDialogContent from "./ViewBookDialogContent";
import ConfirmDialogContent from "./ConfirmDialogContent";
import { useSnackbarStore } from "./appState";
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export default function () {
  const navigate = useNavigate();
  
  const { show: showDialog } = useDialogStore();
  const { dataGrid: dataGridState, refresh: refreshDataGrid } = useBookStore();
  const { show: showSnackBar } = useSnackbarStore();

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
      width: 150,
      renderCell: (params) => {
        const actions = [];

        if (detectIfCan('view books'))
          actions.push(<IconButton title={`view ${params.row.title}`} key={actions.length} 
            onClick={e => 
              // handleActionClick("view", params.id /* or params.row.email */)
              showDialog(ViewBookDialogContent, {
                id: params.id
              })
              // showDialog(<ViewBookDialogContent id={params.id} />)
            }>
            <PreviewIcon />
          </IconButton>);

        if (detectIfCan('edit books'))
          actions.push(<IconButton title={`edit ${params.row.title}`} key={actions.length} 
            onClick={e => handleActionClick("edit", params.id /* or params.row.email */)}>
            <EditIcon />
          </IconButton>);

        if (detectIfCan('delete books'))
          actions.push(<IconButton title={`delete ${params.row.title}`} key={actions.length} 
            onClick={e =>
              // handleActionClick("view", params.id /* or params.row.email */)
              showDialog(ConfirmDialogContent, {
                // title: "confirm irreversible action",
                icon: DeleteForeverIcon,
                message: `you are about to delete ${params.row.title}`,
                action: async () => {
                  const deletedModel = await axios.delete(`book/${params.id}`);
                  showSnackBar(`deleted ${deletedModel.data.title}`);
                  await refreshDataGrid();
                }
              })
              // showDialog(<ViewBookDialogContent id={params.id} />)
            }>
            <DeleteForeverIcon />
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

  const [isFetching, setIsFetching] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setIsFetching(true);
    axios.get('book')
      .then(response => {
        setIsFetching(false);
        setRows(response.data.rows);
        setRowCount(response.data.total);

        /**
         * for debugging, reloads the datagrid every second
         */
        // setTimeout(() => {
        //   refreshDataGrid();
        //   console.info(dataGridState);
        // }, 1000);
      });
  }, [dataGridState.version]);

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