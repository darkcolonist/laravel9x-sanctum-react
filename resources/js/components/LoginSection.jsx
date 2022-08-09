import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from 'yup';

export default function(){
  const { axios } = window;

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
      email: 'someone@example.com',
      password: 'strongpassword'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // const {username, password} = values;

      // axios.get('sanctum/csrf-cookie').then(function(response){
        axios.post('login', {
          email: values.email,
          password: values.password
        }).then(function (response) {
          console.info(response);
        }).catch(function (error) {
          console.error(error);
        });
      // });
    }
  });

  return <React.Fragment>
    <form onSubmit={formik.handleSubmit}>
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
    </form>
  </React.Fragment>
}
