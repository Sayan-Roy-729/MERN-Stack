# Getting Started with React Hooks

>## **Rules:**
- Must only use the hooks in functional component or inside our custom hooks
- Always have to use hooks on the root level in the component. React Hooks must be called in the exact same order in every component render.

>## **`useState()`:**
**useState always return an array with two elements:**<br>
- 1. Cuttent State Snapshot<br>
- 2. Function that allows to update current state

```js
import React, { useState } from 'react';

const [ inputState, setInputState ] = useState({ title: '', amount: '' });
```

> **Properties**<br>
- 1. Does not merge current state with old state that setState does in class based component<br>
- 2. In 2nd array element (function for update state), have to pass an function which takes
prevState because it wanted to change the state before commited the previous chnages into state
then creates error. To prevent, have to pass an function( which takes prevState as argument)
in the 2nd element function. <br>
`Example -->`

```js
    onChange={event => {
        const newTitle = event.target.value;
        setInputState(prevInputState => ({
            title: newTitle,
            amount: prevInputState.amount
        }));
    }}
```
- 3. Can use multiple `useState()` in a functional component. It will be very handy for managing more than 2 or complex state. Then will not be happend closure ploblem that is caused in previous `onChange` method.
```js
const [ enteredTitle, setEnteredTitle ] = useState('');
const [ enteredAmount, setEnteredAmount ] = useState('');


onChange={
    event => {
                setEnteredAmount(event.target.value);
         }
}
```
## **`useEffect()`:**
- Anything that can't manage in normal render flow (mostly causes **side effects like http request**) in functional component, then `useEffect()` comes handy. 
- Get executed right **`after`** and **`every`** component render cycle.
- useEffect() acts like `componentDidUpdate()`: It runs the function after every component update (re-render).
- To prevent the re-render, useEffect accepts the extarnal dependencies as an 2nd arguments as an array. It that dependencies is changed, then this useEffect() will re-execute on re-render. 
```js
useEffect(() => {

    fetch('https://react-hooks-c7662-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData){
            loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
            });
        }

        setUserIngredients(loadedIngredients);
    });
    }, []);
```
- Used like this (with `[]` as a second argument), useEffect() acts like componentDidMount: It runs `only once` after the first render.
- In component, can use multiple times useEffect as many as want. 
- Can also be used to clean up something inside the component like timer. Then in the first argument of useEffect() that takes function, have to return a function. And in the return function, have the codes of clean up. If you have `[]` as dependencies (i.e. the effect only runs once), the cleanup function runs when the component gets `unmounted`.
```js
useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        // Firebase query params
        const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch(
          'https://react-hooks-c7662-default-rtdb.firebaseio.com/ingredients.json' +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);

    // clear in useEffect
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, inputRef]);
```

> ## **`useCallback()`:**
- It allows to wrap one of the function defination with it and when the time of re-render, it helps to check old data and if there is any difference between old data and current data, then it allows to re-render, otherwise it prevents.
- useCallback will return a memoized version of the callback that only changes if one of the inputs has changed or have to use privious input or function is defined at last render call.
- It use past catch memory.
```js
const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
}, []);
```

> ## **`useRef()`:**
- useRef returns a mutable ref object whose `.current` property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

- Note that useRef() is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.

```js
const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        // Firebase query params
        const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch(
          'https://react-hooks-c7662-default-rtdb.firebaseio.com/ingredients.json' +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <input ref = {inputref} type = "text" value = {enterenFilter} onChange = {event => setEnteredFilter(event.target.value)}/>
  );
```

> ## **`useReducer()`:**
- An alternative to useState.
- `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values. 
- It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
- Whilst the concept of reducer functions is similar, `useReducer()` has absolutely NO connection to the `Redux library`!
- It is defined `outside the component.`
- When working with `useReducer()`, React will re-render the component whenever uour reducer returns the new state.

```js
// currentIngredients means current state
const reducer = (currentIngredients, action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(reducer, initialState);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients});
  }, []);

    return (
        // ...
    );
}
```

> ## **`useMemo()`** Alternative of **`React.memo()`**
- useMemo will only recompute the memoized value when one of the dependencies has changed.
- Usage note: if calling useMemo with a referentially stable function, also give it as the input in the second argument.
```js
import React, { useMemo } from 'react';

const ingredients = () => {

  const ingredientList  = useMemo(() => {
    return (
        <IngredientList 
          ingredients={userIngredients} 
          onRemoveItem={removeIngredientHandler} />
    )
  }, [userIngredients, removeIngredientHandler]);

  return (
    // Some code here...
    {ingredientList}
  );
};
```

> ## **`useContext()`:** Context Api (Alternative of `Redux`)
- Define Context:
```js
import React, { useState } from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {}
});

const AuthContextProvider = props => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logingHandler = () => {
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider 
            value = {{login: logingHandler, 
            isAuth: isAuthenticated}}>
                {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
```
- Pass Context to index.js that all components can communicate through the context:
```js
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';

ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>, 
    
    document.getElementById('root')
);
```

- Use the context (in app.js) - If user is loggedin then render `MustLoginComponents` otherwise, will render `Auth` login component to login.
```js
import React, { useContext } from 'react';

import MustLoginComponents from './components/MustLoginComponents';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />
  if (authContext.isAuth) {
    content = <MustLoginComponents />
  }

  return content;
};

export default App;
```
- Use the context (in auth.js) - When user is not logged in, then this component will render. In this component, login functionality is used through `context api`.
```js
import React, { useContext } from 'react';

import Card from './UI/Card';
import { AuthContext } from '../context/auth-context';
import './Auth.css';

const Auth = props => {
  const authContext = useContext(AuthContext);


  const loginHandler = () => {
    authContext.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
```

>## **`Custom React Hook`**:
- These are normal javascript functions which can use other hooks inside of it and contain a common stateful logic that can be reused within multiple components. These functions are prefixed with the word *use*.
- Custom hooks means fewer keystrokes and less repetitive code.
- In normal function, couldnot use dispatch events, hooks and many more. For this custom hook. Inside a hook, can use another hook.
- Create hook (http hook)
```js
import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra
      };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  // create reducer
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  // clear updated state
  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  // http method
  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifer) => {
      dispatchHttp({ type: 'SEND', identifier: reqIdentifer });

      fetch(url, {
        method: method,
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          dispatchHttp({
            type: 'RESPONSE',
            responseData: responseData,
            extra: reqExtra
          });
        })
        .catch(error => {
          dispatchHttp({
            type: 'ERROR',
            errorMessage: 'Something went wrong!'
          });
        });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifer: httpState.identifier,
    clear: clear
  };
};

export default useHttp;
``` 
- Use the hook
```js
import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // custom reducer
  const {isLoading, error, data, sendRequest, reqExtra, reqIdentifer, clear} = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-update.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(
    ingredientId => {
      sendRequest(
        `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
```
