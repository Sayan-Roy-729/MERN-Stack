
# Deep Drive into React Component & Life-Cycle
>## Life-Cycle Hooks
Lifecycle hooks are only available in class based component, not in functional component.
- constructor() (Call super(props); **Do:** Setup State; **Don't:** Cause side-effect)
- getDerivedStateFromProps() (^16.3; when ever props change, **Do:** sync state to props, **Don't:** Cause Side-Effects)
- getSnapshotBeforeUpdate(prevProps, prevState) (**Do:** Last-minute DOM ops **Don't:** Cause Side-Effects)
- componentDidCatch()
- componentWillUnmount()
- shouldComponentUpdate(nextProps, nextState) (**Do:** Decide whether to continue or not; **Don't:** Cause Side-effects)
- componentDidUpdate(prevProps, prevState, snapshot) (**Do:** Cause Side-Effect **Don't:** Update State (triggers re-render))
- componentDidMount() (**Do:** Cause Side-Effects; **Don't:** Update State (triggers re-render))
- render() (Prepare & Structure the JSX Code)
**Most Important --> componentDidMount(), shouldComponentUpdate(), componentDidUpdate()**


>### Component Lifecycle - Creation
**constructor(props) --> getDerivedStateFromProps(props, state) --> render() --> Render Child Components --> componentDidMount() --> getDerivedStateFromProps() --> render()**
- Inside **static getDerivedStateFromProps(props, state)** have to return `state`


>### Component Lifecycle - Update
**getDerivedStateFromProps(props, state) --> shouldComponentUpdate(nextProps, nextState) --> render() --> Update Child Component Props --> getSnapshotBeforeUpdate(prevProps, prevState) --> componentDidUpdate(prevProps, prevState, snapshot)**
- **shouldComponentUpdate(nextProps, nextState)**  returns true or false, if true will be rerender otherwise not.


>### useEffect()
- `useEffect()` is the second most important react hook after `useState()` in functional component. This hook is became usefull in functional component to manage like class based component's lifecycle. It behaves like `componentDidMount()`, `shouldComponentUpdate()`, `componentDidUpdate()`
- It executes for every rerender. It also run when component created. 
- More than once useEffect() can use inside functional component
- If wants to execute when one or more that props change and other cases don't run although render is executed, then that props (exam, porps.persons) have to pass as a second argument.
- It wants to execute for the first time, and don't run next times, then pass an empty array in the second argument position.
- Can also be used to clean up some work as a return function. After first execution of useEffect(), all-time first executed this clean-up and then executed other things. Tirggered when the component will be deleted. 
- The clean up execution is executed according the 2nd argument. If 2nd argument is not passed, then the clean-up code will execute for every render call. If some arguments are passed like [props.persons] then the clean-up code will execute when that will be removed.
```js
useEffect(() => {
  console.log('...');
  // http request
  const timer = setTimeout(() => {
    alert('Save data into cloud');
  }, 1000);
  return () => {
    console.log('clean up work in useEffect');
    clearTimeout(timer);
  };
}, [props.persons]);
```

>### Cleaning up with Lifecycle Hooks
If some clean up is required like remove eventListener or stop timer then `componentWillUnmount()` lifecycle hook is called.

>### shouldComponentUpdate() & PureComponent()
- `nextProps.persons !== this.props.persons` here nextProps.persons is referance types, it points to the persons array. But it that array is changed but pointer is not changed, then condition will be failed because it checkes the pointer. 
- shouldComponentUpdate() is class based react lifecycle hook. For functional component, `React.memo()` is used.
- If all the props have to check whether they are changed or not, then beside using the shouldComponentUpdate(), have to extend with PureComponent and it does same work behind the sence.
```js
import React, {PureComponent} from 'react';

class Persons extends PureComponent {

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.persons !== this.props.persons ||
        nextProps.changed !== this.props.changed ||
        nextProps.clicked !== this.props.clicked){
      return true;
    } else {
       return false;
    }
  }
}

```

>### React.memo()

 - Like shouldComponentUpdate() in class based component, memo() also work same job with functional component. Only wrap with memo() with exporting the functional component.
 - It rerender when the props will change.

```js
import React from 'react';

const cockpit = props => {
  // ... some code
}
export default React.memo(cockpit);
```

>## Rendering Adacent JSX Elements (hoc => higher order component) `auxiliary.js`
- Form-1:
```js
return (
  <div className = {classes.Person}>
    <p onClick = {this.props.click}>
      I'm {this.props.name} and I'm {this.props.age} years old!
    </p>
    <p>{this.props.children}</p>
    <input type = "text" onChange = {this.props.changed} value = {this.props.name}/>
  </div>
)
```

- Form-2: In this form, have to use key though it's inconvinient. 
```js
return [
    <p key = "i1" onClick = {this.props.click}>
      I'm {this.props.name} and I'm {this.props.age} years old!
    </p>,
    <p key = "i2">{this.props.children}</p>,
    <input key = "i3" type = "text" onChange = {this.props.changed} value = {this.props.name}/>
  ];
```

- Form-3: 
```js
const aux = props => props.children;

export default aux;
```

```js
import Aux from '....auxiliary.js';

return (
  <Aux>
    <p onClick = {this.props.click}>
      I'm {this.props.name} and I'm {this.props.age} years old!
    </p>
    <p>{this.props.children}</p>
    <input type = "text" onChange = {this.props.changed} value = {this.props.name}/>
  </Aux>
)
```

- Form-4: From ^16.2, build in Aux Component in React
```js
import React from 'react';

return (
  <React.Fragment>
    <p onClick = {this.props.click}>
      I'm {this.props.name} and I'm {this.props.age} years old!
    </p>
    <p>{this.props.children}</p>
    <input type = "text" onChange = {this.props.changed} value = {this.props.name}/>
  </React.Fragment>
)
```

- Form-5:
```js
import React from 'react';

const withClass = props => (
  <div className = {props.classes}>
    {props.children}
  </div>
);

export default withClass;
```

```js
import WithClass from '....WithClass';

return (
  <WithClass classes = {classes.App}>
    <p onClick = {this.props.click}>
      I'm {this.props.name} and I'm {this.props.age} years old!
    </p>
    <p>{this.props.children}</p>
    <input type = "text" onChange = {this.props.changed} value = {this.props.name}/>
  </WithClass>
)
```

- Form-6:
```js
import React from 'react';

const withclass = (WrappedComponent, className) => {
  return props => (
    <div className = {className}>
      <WrappedComponent {...props}/>
    </div>
  );
};

export default withClass;
```

```js
import React from 'react';
import Aux from '....auxiliary.js';
import withClass from '...withClass.js';

class App extends React.Component {

  render() {
    return (
      <Aux>
        <p onClick = {this.props.click}>
          I'm {this.props.name} and I'm {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input type = "text" onChange = {this.props.changed} value = {this.props.name}/>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
```

>## Setting State Correctly
- Wrong way
```js
import React from 'react';

class App extends React.Component {
  state = {
    persons: [
      {id: 'asfa1', name: 'Max', age: 28},
      {id: 'vasdf1', name: 'Manu', age: 29},
      {id: 'asdf11', name: 'Stephanie', age: 28}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  }
  
  nameChangeHandler() {
    this.setState({persons: persons, changeCounter: this.state.changeCounter + 1});
  }
}
```

- Right way
```js
nameChangeHandler() {
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }
```

>## PropTypes
`npm install --save prop-types`
```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Person exyends Component {
  render() {
    return (
      <div className = {classes.Person}>
        <p onClick = {this.props.click}>
          I'm {this.props.name} and I'm {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input type = "text" onChange = {this.props.changed} value = {this.props.name}/>
      </div>
    )
  }
}

Person.propTypes = {
  click: PropTypes.func,
  age: PropTypes.number,
  name: PropTypes.string,
  changed: PropTypes.func
};

export default Person;
```

>### Referrence(Ref) in Class Based Components:
- Way-1: Supported in Older React Version
```js
return (
    <Aux>
      <p key="i1" onClick={this.props.click}>
        I'm {this.props.name} and I am {this.props.age} years old!
      </p>
      <p key="i2">{this.props.children}</p>
      <input
        key="i3"
        // Reference
        ref = {(inputEl) => {this.inputElement = inputEl}}
        type="text"
        onChange={this.props.changed}
        value={this.props.name}
      />
    </Aux>
    );
```

- Form-2:
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    // Create Reference
    this.inputElementRef = React.createRef();
  }
  
  // To use the referance, have to use the created referance pointer inside componentDidMount; otherwise sometimes throw error
  componentDidMount() {
    this.inputElementRef.current.focus();
  }

  render() {
    console.log('[Person.js] rendering...');
    
    return (
      <Aux>
        <p key="i1" onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          // ref = {(inputEl) => {this.inputElement = inputEl}}
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

// Define every props that what types of this props
Person.PropTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
```
>### Reference in Functional Component

```js
import React, { useEffect, useRef } from 'react';
// useRef for referance in Functional component

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

  //? Create Referance but it automatically called when jsx is rendering. So it fails. For that,
  //? have to call this referance inside useEffect because it runs when render is already ran once.
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');

    // Use The Reference
    toggleBtnRef.current.click();
    return () => {
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
      <button onClick = {authContext.login}>Log in</button>
    </div>
  );
};

// ?Like shouldComponentUpdate() React.memo check whether have to re-render or not (for functional component)
export default React.memo(cockpit);
```


>### Prop-Chain Problem(Context):
- Define Context
```js
import React from 'react';

const authContext = React.createContext({
  authenticated: false, 
  login: () => {}
  });

export default authContext;
```
- Use in Parent File
```js
import React, {Component} from 'react';
import AuthContext from '..../context/auth-context.js';

class App extends Component {
  render () {
    return (
      <Aux>
        <button onClick={() => { this.setState({ showCockpit: false }); }}>
          Remove Cockpit
        </button>
        {/* Wrap JSX with AuthContext for passing the props directly between files, values step should be same that are defined in context file*/}
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}
```
- Use where is required
- Cockpit File for Login button (Use Context in Functional Component)
```js
import React, { useEffect, useRef, useContext } from 'react';
// useRef for referance in Functional component

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

  //? Create Context Connection 
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button ref = {toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      {/* Method-1 For Context */}
      {/* <AuthContext.Consumer>
        {(context) => <button onClick = {context.login}>Log in</button>}
      </AuthContext.Consumer> */}
      
      {/* Method-2 For Context but have to define authContext in function body*/}
      <button onClick = {authContext.login}>Log in</button>
    </div>
  );
};

// ?Like shouldComponentUpdate() React.memo check whether have to re-render or not (for functional component)
export default React.memo(cockpit);

```
- Person File Where have to render according to the value of context (Context in Class based Components)
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {

  // This is class based. For functional component --> useContext()
  static contextType = AuthContext;
  
  componentDidMount() {
    // this.context is given by react for Context
    console.log(this.context.authenticated);
  }

  render() {
    console.log('[Person.js] rendering...');

    // Wrap with higher order component (hoc)
    return (
      <Aux>
        {/* Method-1 for Context */}
        {/* <AuthContext.Consumer>
          {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        </AuthContext.Consumer> */}
        
        {/* Method-2 for Context but have to define static contextType in class body*/}
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please log in</p>
        )}
        
        <p key="i1" onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          // ref = {(inputEl) => {this.inputElement = inputEl}}
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

// ? Define every props that what types of this props
Person.PropTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);

```
