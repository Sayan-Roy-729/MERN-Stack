import React from 'react';

// ?One type Form of HOC:
// const withClass = props => (
//     <div className = {props.classes}>
//         {props.children}
//     </div>
// );

// ?Another form of HOC:
const withClass = (WrappedComponent, className) => {
    // pass the props of child component with the help of spread operator
    return props => (
        <div className = {className}>
            <WrappedComponent {...props}/>
        </div>
    );
}

export default withClass;