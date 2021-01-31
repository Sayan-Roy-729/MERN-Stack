
# Deep Drive into React Component & Life-Cycle
>## Life-Cycle Hooks
Lifecycle hooks are only available in class based component, not in functional component.
- constructor() (Call super(props); **Do:** Setup State; **Don't:** Cause side-effect)
- getDerivedStateFromProps() (^16.3; when ever props change, **Do:** sync state to props, **Don't:** Cause Side-Effects)
- getSnapshotBeforeUpdate(prevProps, prevState) (**Do:** Last-minute DOM ops **Don't:** Cause Side-Effects)
- componentDidCatch()
- componentWillUnmount()
- shouldComponentUpdate(nextProps, nextState) (**Do:** Decide whether to continue or not; **Don't:** Cause Side-effects)
- componentDidUpdate() (**Do:** Cause Side-Effect **Don't:** Update State (triggers re-render))
- componentDidMount() (**Do:** Cause Side-Effects; **Don't:** Update State (triggers re-render))
- render() (Prepare & Structure the JSX Code)


>### Component Lifecycle - Creation
**constructor(props) --> getDerivedStateFromProps(props, state) --> render() --> Render Child Components --> componentDidMount() --> getDerivedStateFromProps() --> render()**
- Inside **getDerivedStateFromProps(props, state)** have to return `state`


>### Component Lifecycle - Update
**getDerivedStateFromProps(props, state) --> shouldComponentUpdate(nextProps, nextState) --> render() --> Update Child Component Props --> getSnapshotBeforeUpdate(prevProps, prevState) --> componentDidUpdate()**
Hello
