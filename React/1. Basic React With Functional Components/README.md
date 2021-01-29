# Functional Component:

1. ```js
import React, { useState } from 'react';
```
useState is used to manage state in functional component like state in class based component.
useState is only available from version ^16.8
2. useState returns an array that has two elements.
 - First element always be current state
 - Second element will always be a function that allow us to update state such that react is wired of it and rerender it's component.
```js
const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 },
    ],
  });
  ```
  
