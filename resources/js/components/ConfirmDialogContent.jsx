import { Button, Stack } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import React from "react"
import DialogContainer from "./DialogContainer";
import { useDialogStore } from './appState';

export default function({ title, icon, message, action }){
  const handleProceed = async () => {
    setLoading(true);
    await action();
    // setLoading(false);
    handleClose();
  }

  const handleClose = () => {
    useDialogStore.setState({ open: false });
  }

  icon = icon || WarningIcon;
  title = title || "Confirm irreversible action";

  const [loading,setLoading] = React.useState(false);

  React.useEffect(() => {
    (async() => {
      // const response = await axios.get(`book/${id}`);

      // setBook(response.data);
      setLoading(false);
    })();
  },[]);

  const titleRender = <Stack direction="row"
    alignItems="center"
    spacing={2}>{React.createElement(icon)}<span>confirm irreversible action</span></Stack>

  const actions = <>
    <Button variant="contained" color="success" onClick={()=>handleClose()}>Cancel</Button>
    <Button variant="contained" color="error" startIcon={React.createElement(icon)}
      onClick={() => handleProceed()}>Proceed</Button>
  </>

  return <DialogContainer 
    {...{
      loading,
      title: titleRender,
      content: message,
      actions
    }}
  />
}