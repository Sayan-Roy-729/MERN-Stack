import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import rootReducer from './reducers';

// //? STORE -> GLOBALIZED STATE

// //? ACTION INCREMENT
// const increment = () => {
//   return {
//     type: 'INCREMENT',
//   }
// }

// const decrement = () => {
//   return {
//     type: 'DECREMENT',
//   }
// }

// //? REDUCER
// const counter = (state = 0, action) => {
//   switch(action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// }

// let store = createStore(counter);

// //? DIsplay it in the console
// store.subscribe(() => console.log(store.getState()));

// //? DISPATCH
// store.dispatch(increment());


// ##########################################
// ##########################################
// ##########################################

//? Using React
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
