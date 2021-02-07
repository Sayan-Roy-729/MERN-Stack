# MERN-Stack
MERN STACK TUTORIAL
## M &#129066; MongoDB
## E &#129066; ExpressJS
## R &#129066; ReactJS
## N &#129066; NodeJS

# **`React`**

## **`componentDidCatch(error, info)`**
### If sometime failed to render a component (`ErrorBoundary`)(^16. React):
```js
import React, { component } from 'react';
  
 class ErrorBoundary extends Component {
    state = {
      hasError: false,
      errorMessage: ''
    }
    
    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    }
    
    
    
    render() {
      if (this.state.hasError) {
        return <h1>{this.state.errorMessage}</h1>;
      } else {
        return this.props.children;
      }
    }
 } 
 
 export default ErrorBoundary;
```

## Component Lifecycle (`Only available in Class-based Components!`)
- 1. constructor(props)
- 2. getDerivedStateFromProps(props, state)
- 3. getSnapshotBeforeUpdate(prevProps, prevState)
- 4. componentDidCatch()
- 5. componentWillUnmount()
- 6. shouldComponentUpdate(nextProps, nextState)
- 7. componentDidUpdate()
- 8. componentDidMount()
- 9. render()
- **`1 --> 2 --> 9 --> 8`**
- **`Component Lifecycle - Update 2 --> 6 --> 9 --> 3 --> 7`**

## [Deep Drive into Component with Component Lifecycle Hoocks, Context, HOC, PropTypes](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/React/3.%20Deeper%20into%20Components%20with%20Life-Cycle/README.md)
