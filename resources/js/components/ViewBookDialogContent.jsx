import { Divider, ListItemText, Stack, Typography } from "@mui/material";

import React from "react"
import DialogContainer from "./DialogContainer";
import { format } from "./Moment";

export default function({ id }){
  const { axios } = window;

  const [book,setBook] = React.useState({});
  const [loading,setLoading] = React.useState(true);

  React.useEffect(() => {
    (async() => {
      const response = await axios.get(`book/${id}`);

      setBook(response.data);
      setLoading(false);
    })();
  },[]);

  const bookLines = [];
  for (const bookField in book) {
    if (Object.hasOwnProperty.call(book, bookField)) {
      let bookValue = book[bookField];

      if(bookField.endsWith("_at"))
        bookValue = format(bookValue);

      const bookFieldDisplay = bookField // .replace('_', ' ')
        .split('_')
        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');

      bookLines.push(
        <ListItemText key={bookField} primary={bookValue} secondary={bookFieldDisplay} />
      );
    }
  }

  const content = <Stack>{bookLines}</Stack>

  return <DialogContainer 
    {...{
      loading,
      title: 'book preview',
      content
    }}
  />
}