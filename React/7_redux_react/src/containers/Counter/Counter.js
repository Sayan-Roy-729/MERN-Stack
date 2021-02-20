import React, { Component } from 'react';
import { connect } from 'react-redux'; // npm install --save react-redux
import * as actionCreators from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
// import * as actionTypes from '../../store/actions/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        // eslint-disable-next-line default-case
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.OnIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.OnDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubstractCounter}  />
                <hr />
                <button onClick = {() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key = {strResult.id} onClick = {() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                    
                </ul>
            </div>
        );
    }
}

// Pass state from redux stote to this component
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

// Dispatch ==> Component to Redux Store with Action
const mapDispatchToProps = dispatch => {
    return {
        OnIncrementCounter: () => dispatch(actionCreators.increment()),

        // Without MiddleWare
        // OnDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        // onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
        // onSubstractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        // onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        // onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id}),

        // With MiddleWare
        OnDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(10)),
        onSubstractCounter: () => dispatch(actionCreators.subtract(15)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);