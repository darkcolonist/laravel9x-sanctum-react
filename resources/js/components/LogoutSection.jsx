import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from 'yup';

export default function(){
  const { axios } = window;

  React.useEffect(() => {
    axios.post('logout', {}
    ).then(function (response) {
      console.info(response);
    }).catch(function (error) {
      console.error(error);
    });
  },[]);

  return <React.Fragment>
    logging you out...
  </React.Fragment>
}
