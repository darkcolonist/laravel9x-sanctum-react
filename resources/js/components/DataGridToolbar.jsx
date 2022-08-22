import { Button, Grid, TextField } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
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

export default function({newItemRoute, ...props}){
  const navigate = useNavigate();

  return <GridToolbarContainer>
    <Grid item>
      <Button onClick={() => {
        navigate(newItemRoute || 'new');
      }}>
        <AddIcon /> New Item
      </Button>
    </Grid>

    <Grid style={{ flex: 1 }} />

    <Grid item>
      <CustomSearchBox
        quickSearchValue={props.quickSearchValue}
        onQuickSearch={props.onQuickSearch}
      />
    </Grid>
  </GridToolbarContainer>
}