import _ from 'lodash';
window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
const apiClient = axios.create({
  baseURL: app.url,
  withCredentials: true
});

apiClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// commenting below as being handled by get:/sanctum/csrf-cookie in login
// apiClient.interceptors.request.use(function (config) {
//   config.headers['x-csrf-token'] = app.csrf;
//   return config;
// }, null, { synchronous: true });

/**
 * below is erroneous - instead, moved this solution to 
 * ./components/AxiosResponseInterceptor.jsx and applied to
 * ./layouts/PrimaryLayout.jsx
 */
// // import { useAuthStore } from "./components/appState"; // <--- breaks the rules of hooks
// apiClient.interceptors.response.use(function(response){
//   return response;
// }, function(error){
//   console.error(error.response.data);
//   if(error.response.status === 401){
//     // const logoutDispatch = useAuthStore((state) => state.setLoggedOut);  // <--- breaks the rules of hooks
//     console.info('attempting to handle 401...');
//     // logoutDispatch(true);  <--- breaks the rules of hooks
//     // window.location.href = `${app.url}/dashboard/logout`;
//   }
// });

window.axios = apiClient;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
