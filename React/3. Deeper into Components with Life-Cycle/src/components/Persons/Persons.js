import React, { PureComponent } from 'react';

import Person from './Person/Person';
// import AuthContext from '../../context/auth-context';

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  //! Will removed this life-cycle hook like componentWillUpdate
  // componentWillReceiveProps(props) {
  //   console.log('[]Persons.js] componentWillReceiveProps');
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   // ?nextProps.persons points the state; sometimes it caused side effect because it only points the
  //   // ?pointer; does not look entire data in the state. So if nextProps.person and this.props.persons
  //   // ?have same pointer then it sees that they are same though inside that, there is difference
  //   // ?In shouldComponentUpdate, it every props have to check whether they changed or not, then the class
  //   // ?component have to extend with PureComponent without extends Components. This PureComponent is behind the sence
  //   // ?same as Component, but in it, all props are automatically checked. Have not to define seperately
  //   if (
  //     nextProps.persons !== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.clicked !== this.props.clicked
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!' };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componrntDidUpdate');
    console.log(snapshot);
  }

  // Used to clean up something
  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Persons.js] rendering...');

    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
          // isAuth = {this.props.isAuthenticated}
        />
      );
    });
  }
}

export default Persons;
