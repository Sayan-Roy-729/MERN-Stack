import React, { useState } from 'react'; // useState is a react hook that is used to manage the functional component (only have ^16.8 version)
import './App.css';
import Person from './Person/Person';

const app = props => {
  // state = {
  //   persons: [
  //     { name: 'Max', age: 28 },
  //     { name: 'Manu', age: 29 },
  //     { name: 'Stephanie', age: 26 },
  //   ],
  // };

  // switchNameHandler = () => {
  //   this.setState({
  //     persons: [
  //       { name: 'Maximilian', age: 28 },
  //       { name: 'Manu', age: 29 },
  //       { name: 'Stephanie', age: 27 },
  //     ],
  //   });
  // };

  // ! useState returns an array that has exactly two elements.
  // 1. 1st element always be current state
  // 2. 2nd element will always be a function that allow us to update state such that react is wired of it and rerender it's component.

  // ! Difference Between state and useState
  // 1. In class based component, this.setState update the selected state, doesn't delete the other specified state. But useState that returns 2nd element as a function that helps to update state, it actually build new state and if there is any state that is not selected, that will be deleted. 
  // 2. Another difference between state and useState is that, in class based component state can't use multiple times. But, useState can be used multiple times. Then, one useState's 2nd element function doesn't modufy other defined useState's state. 
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 },
    ],
    // otherState: 'some other value',
  });

  const [otherState, setOtherState] = useState('some other value');

  console.log(personsState, otherState);

  const switchNameHandler = (newName) => {
    setPersonsState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 },
      ]
    });
  };

  const nameChangedHandler = event => {
    setPersonsState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 },
      ]
    });
  };

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  return (
    <div className="App">
      <h1>Hi, I'm a React App.</h1>
      <p>This is really working!</p>

      <button onClick={() => switchNameHandler('Maximilian')} style = {style}>
        Switch Name
      </button>

      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
      />

      <Person 
      name={personsState.persons[1].name} 
      age={personsState.persons[1].age}
      // ! Pass the method between components (If class based component --> this.switchNameHandler.bind(this, 'Maximilian') or () => this.switchNameHandler('Max')) 
      click = {() => switchNameHandler('Maximilian')} 
      changed = {nameChangedHandler}>
        My Hobbies: Racing
      </Person>

      <Person
        name={personsState.persons[2].name}
        age={personsState.persons[2].age}
      />
    </div>
  );
};

export default app;
