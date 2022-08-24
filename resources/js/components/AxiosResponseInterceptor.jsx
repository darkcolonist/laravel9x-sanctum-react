/**
 * solution taken from https://stackoverflow.com/a/71047161/27698
 */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from "./appState";

function promiseResolveError(error){
  // console.info('got axios error but handled:', error.response?.data?.message);
  return Promise.resolve(error);
}

export default function(){
  const { setLoggedOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    axios.interceptors.response.use(undefined, function(error){
      switch(error.response.status){
        /**
         * unauthenticated
         */
        case 401:
          setLoggedOut(true);
          return promiseResolveError(error);

        /**
         * unauthorized
         */
        case 403:
          navigate('/unauthorized');
          return promiseResolveError(error);

        /**
         * not found
         */
        case 404:
          // console.info(location);
          navigate(`/404?origin=${location.pathname}`);
          return promiseResolveError(error);
      }

      return Promise.reject(error);
    });
  },[]);

  return undefined;
}