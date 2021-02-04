import React from 'react';
import { withRouter } from 'react-router-dom';

// Sometimes in some components, the router history is not available inside props. Then wrap
// that domponent with withRouter() that helps to give information of nearest routing.

import './Post.css';

const post = (props) => {

    console.log(props);

    return (
        <article className="Post" onClick = {props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
    };

// export default withRouter(post);
export default post;