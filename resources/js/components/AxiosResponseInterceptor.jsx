/**
 * solution taken from https://stackoverflow.com/a/71047161/27698
 */
import React from 'react';
import { useAuthStore } from "./appState";

export default function(){
  const { setLoggedOut } = useAuthStore();

  React.useEffect(() => {
    axios.interceptors.response.use(undefined, function(error){
      switch(error.response.status){
        case 401:
          setLoggedOut(true);
          break;
      }
    });
  },[]);

  return undefined;
}