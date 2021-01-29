import React, { Component } from 'react';
// import Radium, {StyleRoot} from 'radium'; // npm install --save radium (for adding styling), for media query have to wrap the entire app with StyleRoot
// import styled from 'styled-components';

import './App.css';

// npm install --save styled-components

import Person from './Person/Person';


// ! for styled-component
// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black
//   }`;

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 },
    ],
    otherState: 'some other value',
    showPersons: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // Alternative way to copy from object
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  };

  deletePersonHandler = personIndex => {
    // ! this does not copy that is stored in state. It creates pointer that points to that state.
    // ! So, when splice one item from it, before calling the setState, one item is deleted.
    // ! So have to copy by using .slice() method or using spread operator
    // const persons = this.state.persons;
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click = {this.deletePersonHandler.bind(this, index)}
                name = {person.name}
                age = {person.age}
                key = {person.id}
                changed = {event => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };
    }

    // Add Styling
    const classes = [];
    if (this.state.persons.length <= 2){
      classes.push('red'); // classes = ['red']
    } 
    if (this.state.persons.length <= 1) {
      classes.push('bold'); // classes = ['red', 'bold']
    }

    // ! Have to wrap with StyleRoot Component of radium 
    // return (
    //   <StyleRoot>
    //     <div className="App">
    //       <h1>Hi, I'm a React App</h1>
    //       <p className = {classes.join(' ')}>This is really working!</p>
    //       <button style={style} onClick={this.togglePersonsHandler}>
    //         Toggle Persons
    //       </button>

    //       {persons}
    //     </div>
    //   </StyleRoot>
    // )

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className = {classes.join(' ')}>This is really working!</p>
          <StyledButton alt = {this.state.showPersons} onClick={this.togglePersonsHandler}>
            Toggle Persons
          </StyledButton>
          {persons}
        </div>
    );
    // ! return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

// export default Radium(App); // Radium acts as a higher order component
export default App;