
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

>### shouldComponentUpdate()
```js
shouldComponentUpdate(nextProps, nextState){
  if (nextProps.persons !== this.props.persons){
    return true;
  } else {
     return false;
  }
}
```
