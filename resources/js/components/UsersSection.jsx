import React from "react";
import SectionHeaderTitle from "./SectionHeaderTitle";
import Moment from "./Moment";
import MasterDataGrid from "./MasterDataGrid";
import { useUserStore } from "./appState";

const corePath = "/dashboard/users";

export default function(){
  const columns = [
    { field: 'name', headerName: 'name', width: 300 }
    , { field: 'email', headerName: 'email', width: 300 }
    , {
      field: 'created_at', headerName: 'created_at', width: 400,
      renderCell: params => <Moment format="fromNow">{params.value}</Moment>
    }
    , {
      field: 'updated_at', headerName: 'updated_at', width: 400,
      renderCell: params => <Moment format="fromNow">{params.value}</Moment>
    }
  ];

  return <React.Fragment>
    <SectionHeaderTitle>Users</SectionHeaderTitle>
    <MasterDataGrid 
      path={corePath}
      modelName="user"
      dataSource="user"
      permissionNoun="users"
      rowIdentifierField="email"
      rowTitleField="name"
      useDataStore={useUserStore}
      columns={columns}
    />
  </React.Fragment>
}