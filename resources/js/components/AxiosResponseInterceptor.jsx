/**
 * solution taken from https://stackoverflow.com/a/71047161/27698
 */
import React from 'react';
import { useAuthStore } from "./appState";

function promiseResolveError(error){
  // console.info('got axios error but handled:', error.response?.data?.message);
  return Promise.resolve(error);
}

export default function(){
  const { setLoggedOut } = useAuthStore();
  // const 

  React.useEffect(() => {
    axios.interceptors.response.use(undefined, function(error){
      switch(error.response.status){
        case 401:
          setLoggedOut(true);
          return promiseResolveError(error);
      }

      return Promise.reject(error);
    });
  },[]);

  return undefined;
}