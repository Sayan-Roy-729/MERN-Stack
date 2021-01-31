import React, { useEffect, useRef, useContext } from 'react';
// useRef for referance in Functional component

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

  //? Create Referance but it automatically called when jsx is rendering. So it fails. For that,
  //? have to call this referance inside useEffect because it runs when render is already ran once.
  const toggleBtnRef = useRef(null);

  //? Create Context Connection
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  // ! // Similar to componentDidMount and componentDidUpdate: Run every render cycle
  // ? 1. Can use useEffect more than once
  // ? 2. Require 2nd argument to control useEffect. Pass in the 2nd argument and checks whether is
  // ? changed or not. If changed then it will be re-execute and update render
  // ? 3. Another case if wanted to execute for the 1st time. Then only pass an empty array to the
  // ? 2nd argument that tells that this component has no dependencies and that's why only execute
  // ? for the 1st time. 
  // ? 4.For clean up like componentWillUnmount, useEffect can also do like this 
  // ? by returning a function
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');

    // http request...
    // const timer = setTimeout(() => {
    //   alert('Saved data to cloud');
    // }, 1000);

    // ?
    toggleBtnRef.current.click();
    return () => {
      // clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, [props.persons]);


  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  });



  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button ref = {toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      {/* <AuthContext.Consumer>
        {(context) => <button onClick = {context.login}>Log in</button>}
      </AuthContext.Consumer> */}
      <button onClick = {authContext.login}>Log in</button>
    </div>
  );
};

// ?Like shouldComponentUpdate() React.memo check whether have to re-render or not (for functional component)
export default React.memo(cockpit);
