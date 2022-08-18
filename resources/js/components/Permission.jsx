import React from "react";

function detectIfCan(can){
  console.info('checking permission', can);
  return true;
}

export default function({can, ...props}){
  if(!detectIfCan(can))
    return undefined;

  return <React.Fragment {...props}></React.Fragment>

}