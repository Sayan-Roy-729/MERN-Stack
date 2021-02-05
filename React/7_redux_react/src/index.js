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
