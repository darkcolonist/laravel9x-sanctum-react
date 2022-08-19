import React from "react";
import { useAuthStore } from "./appState";

export function detectIfCan(can){
  const { permissions } = useAuthStore();

  if(permissions.includes(can)) return true;

  return false;
}


export function PermitWithFallback({ can, fallback, ...props }) {
  fallback = fallback || <span>restricted</span>

  if (detectIfCan(can)) return props.children;

  return fallback;
}

export default function({can, ...props}){
  if(!detectIfCan(can))
    return undefined;

  return <React.Fragment {...props}></React.Fragment>

}