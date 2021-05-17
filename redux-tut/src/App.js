import { useSelector, useDispatch } from 'react-redux';

import { decrement, increment } from './actions';

function App() {
    const counter = useSelector((state) => state.counter);
    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();

    return (
        <div className="App">
            <h1>Counter {counter}</h1>
            <button onClick = {() => dispatch(increment())}>+</button>
            <button onClick = {() => dispatch(decrement())}>-</button>

            {isLogged && <h3>Valuable Information I shouldn't see</h3>}
        </div>
    );
}

export default App;
