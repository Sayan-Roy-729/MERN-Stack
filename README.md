# MERN-Stack
MERN STACK TUTORIAL
## M --> MongoDB
## E --> ExpressJS
## R --> ReactJS
## N --> NodeJS


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

### Component Lifecycle (`Only available in Class-based Components!`)
- 1. constructor(props)
- 2. getDerivedStateFromProps(props, state)
- 3. getSnapshotBeforeUpdate()
- 4. componentDidCatch()
- 5. componentWillUnmount()
- 6. shouldComponentUpdate()
- 7. componentDidUpdate()
- 8. componentDidMount()
- 9. render()
- 1 --> 2 --> 9 --> 8
