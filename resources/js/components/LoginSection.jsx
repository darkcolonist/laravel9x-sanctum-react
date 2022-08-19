import { Button, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Navigate } from 'react-router-dom';
import React from "react";
import * as yup from 'yup';
import { useAuthStore } from "./appState";

export default function(){
  const { axios } = window;
  const { loggedIn, setLoggedIn } = useAuthStore();
  const [isLoggingIn,setIsLoggingIn] = React.useState(false);

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: 'admin@example.com',
      password: 'strongpassword'
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setIsLoggingIn(true);

      await axios.get('sanctum/csrf-cookie');

      let errored = false;
      await axios.post('login', {
        email: values.email,
        password: values.password
      }).catch(function (error) {
        errored = true;
        setErrors({
          email: "invalid login",
          password: "invalid login",
        });
        // console.error(error);
      })

      if(errored) return;

      await axios.post('me').then(function (response) {
        // console.info(response.data);
        // setLoggedIn({
        //   email: response.data.email
        //   , permissions: response.data.permissions
        // });
        setLoggedIn(response.data);
      }).finally(() => {
        setIsLoggingIn(false);
      });
    }
  });

  return <React.Fragment>
    {loggedIn && <Navigate to="/" replace={true} />}
    {isLoggingIn && <><LinearProgress /><Typography>logging you in, please wait...</Typography></>}
    {!isLoggingIn && <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} width={250}>
        <TextField name="email" label="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField name="password" label="password" type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button variant="outlined" type="submit">Login</Button>
      </Stack>
    </form>}
  </React.Fragment>
}