import { ListItemText, Stack, Typography } from "@mui/material";

import React from "react"
import DialogContainer from "./DialogContainer";
import { format } from "./Moment";

export default function({ id, modelName, dataSource }){
  const { axios } = window;

  const [model,setUser] = React.useState({});
  const [loading,setLoading] = React.useState(true);

  React.useEffect(() => {
    (async() => {
      const response = await axios.get(`${dataSource}/${id}`);

      setUser(response.data);
      setLoading(false);
    })();
  },[]);

  const modelLines = [];
  for (const modelField in model) {
    if (Object.hasOwnProperty.call(model, modelField)) {
      let modelValue = model[modelField];

      if(modelField.endsWith("_at"))
        modelValue = format(modelValue);

      const modelFieldDisplay = modelField // .replace('_', ' ')
        .split('_')
        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');

      modelLines.push(
        <ListItemText key={modelField} primary={modelValue} secondary={modelFieldDisplay} />
      );
    }
  }

  const content = <Stack>{modelLines}</Stack>

  return <DialogContainer 
    {...{
      loading,
      title: `${modelName} preview`,
      content
    }}
  />
}