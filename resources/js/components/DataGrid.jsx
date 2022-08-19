import { DataGrid } from "@mui/x-data-grid";
import DataGridToolbar from "./DataGridToolbar";
import React from "react";

export default function(props){
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
    pagination
    components={{
      Toolbar: DataGridToolbar
    }}
    {...props} />
}