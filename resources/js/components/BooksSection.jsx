import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

export default function(){
  const [books,setBooks] = React.useState([]);

  React.useEffect(() => {
    axios.get('book')
      .then(response => {
        setBooks(response.data);
      });
  },[]);

  const bookRenderer = [];

  books.forEach((book, index) => {
    bookRenderer.push(
      <Paper sx={{m:1, p:1}} key={index}>
        <Typography variant="body1">{book.title}</Typography>
        <Typography variant="body2">by {book.author}</Typography>
      </Paper>
    );
  });

  return <React.Fragment>
    <Typography variant="h5">Books</Typography>
    <Stack>
      {bookRenderer}
    </Stack>
  </React.Fragment>
}