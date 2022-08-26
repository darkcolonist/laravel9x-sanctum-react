import { Button, Divider, IconButton } from "@mui/material";
import DataGrid from "./DataGrid";
import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import Permission, { detectIfCan } from "./Permission";
import { useNavigate } from "react-router-dom";
import { useBookStore, useDialogStore } from "./appState";
import ViewBookDialogContent from "./ViewBookDialogContent";
import ConfirmDialogContent from "./ConfirmDialogContent";
import { useSnackbarStore } from "./appState";
import { Box } from "@mui/system";

export default function () {
  const navigate = useNavigate();
  
  const { show: showDialog } = useDialogStore();
  const bookState = useBookStore();
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
                  bookState.refresh();
                }
              })
            }>
            <DeleteForeverIcon />
          </IconButton>);

        return actions;
      }
    }
    , { field: 'id', headerName: 'id', width: 50}
    , { field: 'title', headerName: 'title', width: 450 }
    , { field: 'author', headerName: 'author', width: 150 }
    , {
      field: 'created_at', headerName: 'created_at', width: 200,
      renderCell: params => <Moment format="fromNow">{params.value}</Moment>
    }
    , {
      field: 'updated_at', headerName: 'updated_at', width: 200,
      renderCell: params => <Moment format="fromNow">{params.value}</Moment>
    }
  ];

  const [isFetching, setIsFetching] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setIsFetching(true);

    /**
     * for debugging
     */
    // console.info(bookState);

    axios.get('book',{
      params: {
        page: bookState.dataGridPage + 1,
        sortModel: bookState.dataGridSortModel,
        limit: bookState.dataGridPageSize,
        searchKeyword: bookState.dataGridKeyword,
      }
    }).then(response => {
        setIsFetching(false);
        setRows(response.data.rows);
        setRowCount(response.data.total);

        /**
         * for debugging, reloads the datagrid every second
         */
        // setTimeout(() => {
        //   bookState.refresh();
        //   console.info(bookState);
        // }, 1000);
      });
  }, [bookState]);

  return <React.Fragment>
    <SectionHeaderTitle>Books</SectionHeaderTitle>
    <DataGrid
      initialState={{
        sorting: {
          sortModel: bookState.dataGridSortModel,
        }
      }}
      pageSize={bookState.dataGridPageSize}
      loading={isFetching}
      getRowId={row => row.id}
      page={bookState.dataGridPage}
      onPageSizeChange={(newVal) => useBookStore.setState({
        dataGridPageSize: newVal
      })}
      onPageChange={(newVal) => useBookStore.setState({
        dataGridPage: newVal
      })}
      onSortModelChange={(newVal) => useBookStore.setState({
        dataGridSortModel: newVal
      })}

      searchProps={{
        quickSearchValue: bookState.dataGridKeyword,
        onQuickSearch: (keyword) => useBookStore.setState({
          dataGridKeyword: keyword
        })
      }}

      columns={columns}
      rows={rows}

      toolbarItems={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Button onClick={() => {
            bookState.refresh();
          }} startIcon={<RefreshIcon />}>Refresh</Button>
          <Permission can="create books">
            <Divider orientation="vertical" flexItem/>
            <Button onClick={() => {
              navigate('/dashboard/books/new');
            }} startIcon={<AddIcon/>}>New Book</Button>
          </Permission>
        </Box>
      }

      rowCount={rowCount} 
      />
  </React.Fragment>
}