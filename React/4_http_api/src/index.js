import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Setting a default global configuration for axios
 axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptors to execute code globally (Always have to return request)
axios.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    // this error is triggered when sending the request like no internet connection
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(request => {
    console.log(request);
    return request;
}, error => {
    // this error is triggered when sending the request like no internet connection
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
