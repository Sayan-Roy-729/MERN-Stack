# Functional Component:

```js
import React, { useState } from 'react';
```
1. useState is used to manage state in functional component like state in class based component.
useState is only available from version ^16.8
2. `useState()` returns an array that has two elements.
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
  
  const [otherState, setOtherState] = useState('some other value');
  ```
  3. Difference between `useState()` and `setState()`:
  - In class based component, this.setState update the selected state, doesn't delete the other specified state. But useState that returns 2nd element as a function that helps to update state, it actually build new state and if there is any state that is not selected, that will be deleted.
   - Another difference between state and useState is that, in class based component state can't use multiple times. But, useState can be used multiple times. Then, one useState's 2nd element function doesn't modufy other defined useState's state.
  ```js
  const nameChangedHandler = event => {
    setPersonsState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 },
      ]
    });
  };
  ```
  4. `props.children` use:<br/>
  `Person` Component -->
  ```js
  return (
    <div className = "Person">
        <p onClick = {props.click}>
            I'm {props.name} and I am {props.age} years old!
        </p>
        {/* props.children is used when something will be passed between
        opening and closing tag when using the component */}
        <p>{props.children}</p>
        <input type = "text" onChange = {props.changed} value = {props.name}/>
    </div>
  );
  ```
  Use `Person` Component (To pass the content (My Hobbies: Racing) to the main component, in parent component have to use props.children)
  ```js
  <Person 
      name={personsState.persons[1].name} 
      age={personsState.persons[1].age}
      // ! Pass the method between components (If class based component --> this.switchNameHandler.bind(this, 'Maximilian') or () => this.switchNameHandler('Max')) 
      click = {() => switchNameHandler('Maximilian')} 
      changed = {nameChangedHandler}>
        My Hobbies: Racing
      </Person>
      ```
 
  
