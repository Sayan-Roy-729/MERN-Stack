import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect }from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';

// Lazy Loading (Load page asyncronously) 
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});
// import FullPost from './FullPost/FullPost';

class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        return (
            <div className = "Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                    to = "/posts/" 
                                    exact 
                                    activeClassName = "my-active"
                                    activeStyle = {{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}>Posts</NavLink></li>
                            <li><NavLink to = {{
                                // this pathname create absolute path, otherwise create relative path
                                // pathname: this.props.match.url + '/new-post',
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path = "/" exact render = {() => <h1>Home</h1>}/>
                <Route path = "/posts" render = {() => <h1>Home 2</h1>}/> */}
                <Switch>
                    {this.state.auth ? <Route path = "/new-post" component = {AsyncNewPost}/> : null}
                    <Route path = "/posts" component = {Posts}/>
                    <Route render = {() => <h1>Not found!</h1>}/>
                    {/* <Redirect from = "/" to = "/posts" /> */}
                    {/* <Route path = "/" component = {Posts}/> */}
                    {/* <Route path = "/:id" exact component = {FullPost}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;