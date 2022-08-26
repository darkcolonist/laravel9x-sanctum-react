import { DataGrid } from "@mui/x-data-grid";
import DataGridToolbar from "./DataGridToolbar";
import React from "react";

export default function ({toolbarItems, searchProps, ...props}){
  searchProps = searchProps || {};

  return <DataGrid 
    autoHeight 
    density="compact"
    disableColumnFilter
    disableColumnSelector
    disableDensitySelector
    disableColumnMenu 
    disableSelectionOnClick
    paginationMode="server"
    sortingMode="server"
    rowsPerPageOptions={[5,10,50,100]}
    pagination
    components={{
      Toolbar: DataGridToolbar
    }}
    componentsProps={{
      toolbar: {
        toolbarItems,
        quickSearchValue: searchProps.quickSearchValue,
        onQuickSearch: searchProps.onQuickSearch
      }
    }}
    {...props} />
}

function sampleOnlyDoNotUse(){
  <DataGrid
    pageSize={dataGridOptions.pageSize}
    initialState={{
      sorting: {
        sortModel: dataGridOptions.sortModel,
      }
    }}
    components={{
      Toolbar: MyDataGridToolBar
    }}
    componentsProps={{
      toolbar: {
        quickSearchValue: dataGridOptions.searchKeyword,
        onQuickSearch: (searchKeyword) => useAutoinvoiceListStore.setState(state => { state.dataGridOptions.searchKeyword = searchKeyword })
      }
    }}
    density={appConfig.tableDensity}
    onPageSizeChange={(pageSize) => useAutoinvoiceListStore.setState(state => { state.dataGridOptions.pageSize = pageSize })}
    rowsPerPageOptions={appConfig.tableSizes}
    pagination
    page={dataGridOptions.page}
    disableSelectionOnClick
    paginationMode="server"
    sortingMode="server"
    rowCount={totalRows}
    autoHeight
    getRowId={(row) => row.hash}
    loading={isFetching}
    disableColumnFilter
    disableColumnSelector
    disableDensitySelector
    disableColumnMenu
    onPageChange={(page) => useAutoinvoiceListStore.setState(state => { state.dataGridOptions.page = page })}
    onSortModelChange={(sortModel) => useAutoinvoiceListStore.setState(state => { state.dataGridOptions.sortModel = sortModel })}
    {...{
      columns,
      rows
    }} />
}