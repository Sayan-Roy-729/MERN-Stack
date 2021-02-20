# Getting Started with `Redux`
## How Redux Work in React
![Redux](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/NodeJS%20Lifecycle%20%26%20Event%20Loop.png)

## React - Basics
Reducer &#10161; Store &#10161; Subscription &#10161; Dispatching Action
```js
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
};

// Reducer accepts state and action & returns updated state
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER'){
        return {
            ...state,
            counter: state.counter + 1
        };
    }

    if (action.type === 'ADD_COUNTER'){
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription | it is triggered when state is updated. 
store.subscribe(() => {
    console.log('Subscription', store.getState());
});

// Dispatching Action (payload)
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
```

## With React Components:-

### In `Index.js`: Connect React to Redux
```js
import React from 'react';
import ReactDOM from 'react-dom';

// import redux 
import { Provider } from 'react-redux';  // npm install --save react-redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import reducer 
// import reducer from './store/reducer';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

// Combine the reducers
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

// Create MiddleWare
const logger = store => {
    return next => {
        return action => {
            console.log('[MiddleWare] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux Store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store = { store }><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

```