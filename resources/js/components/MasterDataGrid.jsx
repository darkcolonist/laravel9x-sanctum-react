import { Button, Divider, IconButton } from "@mui/material";
import DataGrid from "./DataGrid";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import Permission, { detectIfCan } from "./Permission";
import { useNavigate } from "react-router-dom";
import { useSnackbarStore, useDialogStore } from "./appState";
import ConfirmDialogContent from "./ConfirmDialogContent";
import { Box } from "@mui/system";
import ViewDialogContent from "./ViewDialogContent";

export default function ({ path: corePath, dataSource, useDataStore, 
  columns, modelName, rowIdentifierField, permissionNoun, rowTitleField
  ,...props }) {

  const navigate = useNavigate();
  const modelState = useDataStore();

  const { show: showDialog } = useDialogStore();
  const { show: showSnackBar } = useSnackbarStore();
  const handleActionClick = function (action, email) {
    // console.info(action, email);
    navigate(`${corePath}/${action}/${email}`);
  }

  const [isFetching, setIsFetching] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  columns = [
    {
      field: 'action',
      headerName: 'Actions',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: (params) => {
        const actions = [];

        if (detectIfCan(`view ${permissionNoun}`))
          actions.push(<IconButton title={`view ${params.row[rowTitleField]}`} key={actions.length}
            onClick={e =>
              // handleActionClick("view", params.id /* or params.row.email */)
              showDialog(ViewDialogContent, {
                modelName, dataSource,
                id: params.id
              })
            }>
            <PreviewIcon />
          </IconButton>);

        if (detectIfCan(`edit ${permissionNoun}`))
          actions.push(<IconButton title={`edit ${params.row[rowTitleField]}`} key={actions.length}
            onClick={e => handleActionClick("edit", params.id /* or params.row.email */)}>
            <EditIcon />
          </IconButton>);

        if (detectIfCan(`delete ${permissionNoun}`))
          actions.push(<IconButton title={`delete ${params.row[rowTitleField]}`} key={actions.length}
            onClick={e =>
              // handleActionClick("view", params.id /* or params.row.email */)
              showDialog(ConfirmDialogContent, {
                // title: "confirm irreversible action",
                icon: DeleteForeverIcon,
                message: `you are about to delete ${params.row[rowTitleField]}`,
                action: async () => {
                  const deletedModel = await axios.delete(`${dataSource}/${params.id}`);
                  showSnackBar(`deleted ${deletedModel.data[rowTitleField]}`);
                  modelState.refresh();
                }
              })
            }>
            <DeleteForeverIcon />
          </IconButton>);

        return actions;
      }
    },
    ...columns
  ];

  React.useEffect(() => {
    setIsFetching(true);
    axios.get(dataSource,{
      params: {
        page: modelState.dataGridPage + 1,
        sortModel: modelState.dataGridSortModel,
        limit: modelState.dataGridPageSize,
        searchKeyword: modelState.dataGridKeyword,
      }
    }).then(response => {
        setIsFetching(false);
        setRows(response.data.rows);
        setRowCount(response.data.total);
      });
  }, [modelState]);

  return <DataGrid
      initialState={{
        sorting: {
          sortModel: modelState.dataGridSortModel,
        }
      }}
      pageSize={modelState.dataGridPageSize}
      loading={isFetching}
      getRowId={row => row[rowIdentifierField]}
      page={modelState.dataGridPage}
      onPageSizeChange={(newVal) => useDataStore.setState({
        dataGridPageSize: newVal
      })}
      onPageChange={(newVal) => useDataStore.setState({
        dataGridPage: newVal
      })}
      onSortModelChange={(newVal) => useDataStore.setState({
        dataGridSortModel: newVal
      })}

      searchProps={{
        quickSearchValue: modelState.dataGridKeyword,
        onQuickSearch: (keyword) => useDataStore.setState({
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
            modelState.refresh();
          }} startIcon={<RefreshIcon />}>Refresh</Button>
          <Divider orientation="vertical" flexItem/>
          <Permission can={`create ${permissionNoun}`}>
            <Button onClick={() => {
              navigate(`${corePath}/new`);
            }} startIcon={<AddIcon />}>New {modelName[0].toUpperCase() + modelName.slice(1)}</Button>
          </Permission>
        </Box>
      }

      rowCount={rowCount} 
      />
}