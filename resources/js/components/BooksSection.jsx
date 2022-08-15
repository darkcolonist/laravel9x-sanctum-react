import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export default function(){
  const [books,setBooks] = React.useState([]);
  const [booksLoaded,setBooksLoaded] = React.useState(false);

  React.useEffect(() => {
    axios.get('book')
      .then(response => {
        setBooks(response.data);
        setBooksLoaded(true);
      });
  },[]);

  const bookRenderer = [];

  if(booksLoaded){
    books.forEach((book, index) => {
      bookRenderer.push(
        <Paper sx={{m:1, p:1}} key={index}>
          <Typography variant="body1">{book.title}</Typography>
          <Typography variant="body2">by {book.author}</Typography>
        </Paper>
      );
    });
  }
  else{
    bookRenderer.push(<LinearProgress key="wait"/>);
  }

  return <React.Fragment>
    <Typography variant="h5">Books</Typography>
    <Stack>
      {bookRenderer}
    </Stack>
  </React.Fragment>
}