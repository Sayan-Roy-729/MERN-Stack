import React from 'react';

import classes from './Button.module.css';

const Button = props => {
  return (
    <button className = {classes.Button} style = {props.style}>
      {props.buttonName}
    </button>
  ); 
};

export default Button;