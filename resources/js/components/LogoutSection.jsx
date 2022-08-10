import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Navigate } from "react-router-dom";

export default function(){
  const { axios } = window;

  const [loggedOut, setLoggedOut] = React.useState(false);

  React.useEffect(() => {
    axios.post('logout', {}
    ).then(function (response) {
      if (response.status === 204) {
        sessionStorage.setItem("loggedIn", false);
        setLoggedOut(true);
      }
    }).catch(function (error) {
      // if(error.code === 419){
        sessionStorage.setItem("loggedIn", false);
        setLoggedOut(true);
      // }
      console.error(error);
    });
  },[]);

  return <React.Fragment>
    {loggedOut && <Navigate to="/login" replace={true} />}
    logging you out...
  </React.Fragment>
}
