# Getting Started with React Hooks

>## **Rules:**
- Must only use the hooks in functional component or inside our custom hooks
- Always have to use hooks on the root level in the component. React Hooks must be called in the exact same order in every component render.

## **useState():**
>**useState always return an array with two elements:**<br>
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
## **useEffect():**
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
- Can also be used to clean up something inside the component like timer. Then in the first argument of useEffect() that takes function, have to return a function. And in the return function, have the codes of clean up. If you have `[]` as dependencies (i.e. the effect only runs once), the cleanup function runs when the component gets `unmountd`.
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

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, inputRef]);
```

> ## **useCallback():**
- useCallback will return a memoized version of the callback that only changes if one of the inputs has changed or have to use privious input or function is defined at last render call.
- It use past catch memory.
```js
const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
}, []);
```

> ## **useRef():**
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
```

> ## **useReducer():**
- An alternative to useState.
- `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values. 
- It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
- Whilst the concept of reducer functions is similar, `useReducer()` has absolutely NO connection to the `Redux library`!
- It is defined `outside the component.`
- When working with `useReducer()`, React will re-render the component whenever uour reducer returns the new state.

```js
// currentIngredients means current state
const ingredientReducer = (currentIngredients, action) => {
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
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients});
  }, []);

    return (
        // ...
    );
}
```

> ## **useMemo()** Alternative of **React.memo()**
- useMemo will only recompute the memoized value when one of the deps has changed.
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

> ## **Custom Hooks:**
