const redux = require('redux');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;

// initial state
const initialState = {
  loading: false,
  users: [],
  error: '',
};

// action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// action creators
const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUserScccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// async action creator
const fetchUsers = () => {
  // these functions are allowed to create side effects
  return function(dispatch) {
    dispatch(fetchUserRequest);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the array of users
        const users = response.data.map(user => user.id);
        dispatch(fetchUserScccess(users));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUserFailure(error));
      });
  }
};

// store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// subscribe the store
store.subscribe(() => {
  console.log(store.getState());
});

// use the redux
store.dispatch(fetchUsers());