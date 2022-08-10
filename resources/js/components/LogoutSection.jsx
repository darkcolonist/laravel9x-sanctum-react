import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./appState";

export default function(){
  const { axios } = window;

  const { loggedIn, setLoggedOut } = useAuthStore();

  React.useEffect(() => {
    if(!loggedIn) return;

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
    {!loggedIn && <Navigate to="/login" replace={true} />}
    logging you out...
  </React.Fragment>
}