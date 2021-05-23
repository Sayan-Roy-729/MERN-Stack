import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigation';
import placeReducers from './store/places-reducer';

const rootReducer = combineReducers({
    places: placeReducers,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
}
