import React, { useState } from 'react';

// useState Rook allows to manage state in functional component

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  // useState always return an array with two elements,
  // => 1. Cuttent State Snapshot
  // => 2. Function that allows to update current state
  //
  // Properties
  // => 1. Does not merge current state with old state that setState does in class based component
  // => 2. In 2nd array element (function for update state), have to pass an function which takes
  // prevState because it wanted to change the state before commited the previous chnages into state
  // then creates error. To prevent, have to pass an function( which takes prevState as argument)
  // in the 2nd element function. Example -->
  // onChange={event => {
  //   const newTitle = event.target.value;
  //   setInputState(prevInputState => ({
  //     title: newTitle,
  //     amount: prevInputState.amount
  //   }));
  // }}
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={(event) => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={(event) => {
                setEnteredAmount(event.target.value);
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {/* {props.loading ? <LoadingIndicator/> : null } */}
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
