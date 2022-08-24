import { Button, Hidden, LinearProgress, Stack, TextField, } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import * as yup from 'yup';
import { useSnackbarStore } from "./appState";
import SectionHeaderTitle from "./SectionHeaderTitle";
import { Box } from "@mui/system";

const fields = [
  {
    name: 'title',
    initial: app.env === 'local' ? 'test title' : '',
    type: 'text',
    componentParams: {
      multiline: true,
      maxRows: 4
    },
    validation: yup
      .string()
      .min(3)
      .max(100)
      .required()
  },
  {
    name: 'author',
    initial: app.env === 'local' ? 'test author' : '',
    type: 'text',
    validation: yup
      .string()
      .min(3)
      .max(100)
      .required()
  }
];

async function tryLoadModel(modelID){
  const { axios } = window;
  const response = await axios.get(`book/${modelID}`);
  return response.data;
}

export default function(){
  const { axios } = window;
  const { show: showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const { id: modelID } = useParams();
  const [saveMode,setSaveMode] = React.useState('store');
  const [loading,setLoading] = React.useState(false);
  const [initialFormValues, setInitialFormValues] = React.useState(fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.initial }), {}));

  async function initiateEditMode(){
    setLoading(true);
    setSaveMode('edit');
    const model = await tryLoadModel(modelID);

    // setInitialFormValues(fields.reduce((acc, cur) => {
    //   console.info({[cur.name]: model[cur.name]});
    //   return { ...acc, [cur.name]: model[cur.name] }
    // }, {})); // debug
    setInitialFormValues(fields.reduce((acc, cur) => ({ ...acc, [cur.name]: model[cur.name] }), {}));
    setLoading(false);
  }

  React.useEffect(() => {
    if (modelID !== undefined) initiateEditMode();
  },[]);

  async function storeMode(values, formik){
    showSnackbar(`saving ${values.title}`, "info");
    return await axios.post('book', {
      ...values
    }).then(function (response) {
      showSnackbar(`saved ${response.data.id}:${values.title}`, "success");
      // formik.setErrors({
      //   "title": "ignore this message, i am but debugging" // <--- clears with formik.resetForm
      // });

      formik.resetForm();

      // formik.setFieldValue('title', 'grrrr'); // <--- if you want to dynamically change the value

      // console.info(fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.initial }), {}));
      // setInitialFormValues(fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.initial }), {}));
      return response;
    }).catch(function (error) {
      showSnackbar(`unable to save ${values.title}`, "error");
    });
  }

  async function editMode(values, formik) {
    showSnackbar(`updating ${values.title}`, "info");
    return await axios.put(`book/${modelID}`, {
      ...values
    }).then(function (response) {
      showSnackbar(`updated ${response.data.id}:${values.title}`, "success");
      return response;
    }).catch(function (error) {
      showSnackbar(`unable to update ${values.title}`, "error");
    });
  }

  const validationSchema = yup.object(
    fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.validation }), {}));

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      switch(saveMode){
        case 'store':
          await storeMode(values, formik);
          break;
        case 'edit':
          await editMode(values, formik);
          break;
      }
    }
  });

  if(loading)
    return <LinearProgress />

  return <React.Fragment>
    {saveMode === 'store' && <SectionHeaderTitle>New Book</SectionHeaderTitle>}
    {saveMode === 'edit' && <SectionHeaderTitle>Update Book {modelID}</SectionHeaderTitle>}
    <Box sx={{mb:1}}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/books')}>
        back
      </Button>
    </Box>
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} width={250}>
        {fields.map((fieldItem, fieldKey) => 
          <TextField key={fieldKey} name={fieldItem.name} label={fieldItem.name}
            type={fieldItem.type}
            value={formik.values[fieldItem.name]}
            onChange={formik.handleChange}
            error={formik.touched[fieldItem.name] && Boolean(formik.errors[fieldItem.name])}
            helperText={formik.touched[fieldItem.name] && formik.errors[fieldItem.name]}
            {...fieldItem.componentParams}
          />
        )}

        {saveMode === 'store' && <Button variant="contained" color="success" 
          startIcon={<AddIcon />}
          type="submit">Save</Button>}
        {saveMode === 'edit' && <Button variant="contained" color="success" 
          startIcon={<SaveIcon />}
          type="submit">Update</Button>}
      </Stack>
    </form>
  </React.Fragment>
}