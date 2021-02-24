import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.module.css';

// Connect with redux
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';

// import reducer file
import ProductReducer from './store/reducers/products';

// import reducers
const store = createStore(ProductReducer);



ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

