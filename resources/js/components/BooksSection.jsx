import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";
import { useBookStore } from "./appState";
import MasterDataGrid from "./MasterDataGrid";

export default function () {
  const columns = [
    { field: 'id', headerName: 'id', width: 50}
    , { field: 'title', headerName: 'title', width: 450 }
    , { field: 'author', headerName: 'author', width: 150 }
    , {
      field: 'created_at', headerName: 'created_at', width: 200,
      renderCell: params => <Moment format="fromNow">{params.value}</Moment>
    }
    , {
      field: 'updated_at', headerName: 'updated_at', width: 200,
      renderCell: params => <Moment format="fromNow">{params.value}</Moment>
    }
  ];

  return <React.Fragment>
    <SectionHeaderTitle>Books</SectionHeaderTitle>
    <MasterDataGrid
      path="/dashboard/books"
      modelName="book"
      dataSource="book"
      permissionNoun="books"
      rowIdentifierField="id"
      rowTitleField="title"
      useDataStore={useBookStore}
      columns={columns}
    />
  </React.Fragment>
}