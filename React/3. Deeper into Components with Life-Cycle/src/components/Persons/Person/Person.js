import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

// ? For install proptypes --> npm install --save prop-types

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  //? This is class based. For functional component --> useContext()
  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  render() {
    console.log('[Person.js] rendering...');

    // return (
    //   <div className={classes.Person}>
    //     <p onClick={this.props.click}>
    //       I'm {this.props.name} and I am {this.props.age} years old!
    //     </p>
    //     <p>{this.props.children}</p>
    //     <input type="text" onChange={this.props.changed} value={this.props.name} />
    //   </div>
    // );

    // ?JSX Element can also be written inside an array where comma separated. Then have to pass key values
    // return [
    //   <p key = "i1" onClick={this.props.click}>
    //     I'm {this.props.name} and I am {this.props.age} years old!
    //   </p>,
    //   <p key = "i2">{this.props.children}</p>,
    //   <input
    //     key = "i3"
    //     type="text"
    //     onChange={this.props.changed}
    //     value={this.props.name}
    //   />,
    // ];

    // // Wrap with higher order component (hoc)
    return (
      <Aux>
        {/* <AuthContext.Consumer>
          {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        </AuthContext.Consumer> */}

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

    // ?React alse return hoc called Fragment
    // return (
    //   <React.Fragment>
    //     <p key="i1" onClick={this.props.click}>
    //       I'm {this.props.name} and I am {this.props.age} years old!
    //     </p>
    //     <p key="i2">{this.props.children}</p>
    //     <input
    //       key="i3"
    //       type="text"
    //       onChange={this.props.changed}
    //       value={this.props.name}
    //     />
    //   </React.Fragment>
    // );
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
