import { Button, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Navigate } from 'react-router-dom';
import React from "react";
import * as yup from 'yup';
import { useAuthStore } from "./appState";
import SectionHeaderTitle from "./SectionHeaderTitle";

const fields = [
  {
    name: 'title',
    initial: '',
    type: 'text',
    validation: yup
      .string()
      .min(3)
      .max(100)
      .required()
  },
  {
    name: 'author',
    initial: '',
    type: 'text',
    validation: yup
      .string()
      .min(3)
      .max(100)
      .required()
  }
];

export default function(){
  const { axios } = window;

  const validationSchema = yup.object(
    fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.validation }), {}));

  const formik = useFormik({
    initialValues: fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.initial }), {}),
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      let errored = false;
      await axios.post('book', {
        ...values
      }).catch(function (error) {
        errored = true;
        // setErrors({
        //   email: "invalid login",
        //   password: "invalid login",
        // });
        // console.error(error);
      })

      if(errored) return;
    }
  });

  return <React.Fragment>
    <SectionHeaderTitle>Save Book</SectionHeaderTitle>
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} width={250}>
        {fields.map((fieldItem, fieldKey) => 
          <TextField key={fieldKey} name={fieldItem.name} label={fieldItem.name}
            type={fieldItem.type}
            value={formik.values[fieldItem.name]}
            onChange={formik.handleChange}
            error={formik.touched[fieldItem.name] && Boolean(formik.errors[fieldItem.name])}
            helperText={formik.touched[fieldItem.name] && formik.errors[fieldItem.name]}
          />
        )}
        <Button variant="outlined" type="submit">Save</Button>
      </Stack>
    </form>
  </React.Fragment>
}