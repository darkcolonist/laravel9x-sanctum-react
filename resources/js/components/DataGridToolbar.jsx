import { Grid, TextField } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import React from 'react';

export function CustomSearchBox(props){
  function keyPress(e){
    if (e.keyCode == 13) {
      var ourNewValue = e.target.value.trim();
      if(typeof props.onQuickSearch === 'function')
        props.onQuickSearch(ourNewValue);
    }
  }

  return <TextField
    size='small'
    placeholder='enter to search'
    variant='standard'
    defaultValue={props.quickSearchValue}
    onKeyUp={keyPress}
    InputProps={{
      startAdornment: <SearchIcon />
    }}
  ></TextField>
}

export default function({toolbarItems, ...props}){
  return <GridToolbarContainer>
    <Grid item>{toolbarItems}</Grid>

    <Grid style={{ flex: 1 }} />

    <Grid item>
      <CustomSearchBox
        quickSearchValue={props.quickSearchValue}
        onQuickSearch={props.onQuickSearch}
      />
    </Grid>
  </GridToolbarContainer>
}