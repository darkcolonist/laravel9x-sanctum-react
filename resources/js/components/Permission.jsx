import React from "react";
import { useAuthStore } from "./appState";

function detectIfCan(can){
  const { permissions } = useAuthStore();

  if(permissions.includes(can)) return true;

  return false;
}

export default function({can, ...props}){
  if(!detectIfCan(can))
    return undefined;

  return <React.Fragment {...props}></React.Fragment>

}