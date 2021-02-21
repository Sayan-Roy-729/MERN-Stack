# React Routing - Felling Different pages in one page

## Install Packages for routing
- npm install --save react-router-dom
- npm install --save react-router

## Enable routing - 
```js
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename = "/my-app">
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
```
## Routing (**`Route`** & **`Link`**):
- Can Render different component/jsx through same Route. Then the components will be available also inside the dom top to bottom beneath each other.
- If we don't use `Link`, then every routing, the page will reload. Then, previous state of application will loss. So link is used.
```js
import {Route, Link} from 'react-router-dom';
import Posts from '...';

class Something extends Components {

  render() {
    return(
      <div>
        <header>
          <ul>
            <li><Link to = "/">Home</Link></li>
            <li><Link to = {{
                        pathname: '/new-post',
                        hash: '#submit',
                        search: '?quick-submit=true'
            }}>New Post</Link></li>
          </ul>
        </header>

        <Switch>
          <Route path = "/" exact component={Posts}/>
          <Route path = "/" render ={() => <h1>Home2</h1>}/>
          <Route path = "/new-post" component = {NewPost}/>
          <Route component = {404Page}/>
        </Switch>
      </div>
    );
  }
}

export default Something;
```
- Modify the `Link` for different way: http://localhost:3000/new-post?suick-submit=true#submit
```js
<li><Link to= {{
  pathname: '/new-post',
  hash: '#submit',
  search: '?quick-submit=true'
}}>New Post<Link></li>
```
- When push is used, you can go back. But if you use `redirect` then can't go the last page because it replaces the stack page.

## Through **`props`** (history, location, match):
- Go to the another page through props
```js
this.props.history.push({pathname: '/' + id});
```

## **`withRouter`**
When routing pages, then the routing details dont pass into the deep component child. Then `withRoute` helps to get the routing datails. The routing details will be nearest routing datas.

```js
import { withRouter } from 'react-router-dom';

const post = props => {
  console.log(props);

  return (
    <div>
      Some JSX Code here
    </div>
  )
};

export default withRouter(post);
```

## Absolute Path and Relation Path:
- When working with routing in react, generally the path will be **absolute path**. E.g. Some domain like www.example.com to www.example.com/posts. In this, goes home page to `/posts` page. Then if go the single post `/post` then the URL will be www.example.com/post. In absolute path, it will never happend that www.example.com/posts/post.
- Making the **relative path**
```js
<li><Link to = {{
  pathname: this.props.match.url + '/new-post'
}}>New Post</Link></li>
```

## **Styling the Active Route (`NavLink`)**:
- `NavLink` automatically add css class named `active`. Then can use for styling that class.
- Can also be add own custom class for active by adding additional `activeClassName` attribute.
- Can also add insile styling by passing `activeStyle` attribute. 
```js
import {Route, NavLink} from 'react-router-dom';

class Blog extends Component {
  render() {
    return (
      <div>
        <header>
          <ul>
            <li>
              <NavLink 
                to = "/" 
                exact 
                activeClassName="my-active" 
                activeStyle={{"color": "#fa923f"}}>
                  Home
              </NavLink>
            </li>
            <li>
              <NavLink to = "/new-post" exact>
                Post
              </NavLink>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}
```
```css
.active {
  color: #fa923f;
}
```

## Passing **`Route Parameters`**:
- Pass the parameter through the url:
```js
const Blog = props => {
  return (
    <div>
      <div>
        <Link to = {'/' + post.id}>Post</Link>
      </div>
      <Route path="/:id" component = {Post}/>
    </div>
  );
}
```
- Extract from the url:
```js
import React from 'react';

class FullPost extends Component {
  componentDidMount(){
    const postId = this.props.match.params.id;
    // then some code here
  }

  render() {
    return {
      <div>
        <h1>Show Full Post</h1>
      </div>
    }
  }
}
```

## **`Switch`** to Load a Single Route:
- Sometimes, when rendering pages through patch; then some some though don't same by treated as same. Then to prevent this, `swtch` helps.
- In the example, the two routes shows as a same. So when rendering, two components will render that is not required.
- 1st match will render at a time.
```js
import {Route, Switch} form 'react-router-dom';

render(){
  return (
    <Switch>
      <Route to="/new-post" component = {NewPost}/>
      <Route to="/:id" component = {Post}/>
    </Switch>
  );
}
```

## **`Nested Routes`**:
- When home page is rendering, Posts Component is rendered. But here dont defining the single post, the single post route is define inside the Posts Component for rendering single post.
- The problem is this that when rendering the nested route, the url will change but the dom will not be updated.
```js
render(){
  return (
    <div>
      <Route path = "/posts" exact component = {Posts}/>
      <Switch>
        <Route path="/new-post" component = {NewPost}/>
      </Switch>
    </div>
  );
}
```

```js
render() {
  return {
    <div>
      <section className = "Posts">
        {posts}
      </section>

      <Route path = "/:id" exact component = {FullPost}/>
    </div>
  };
}
```
- Solve problem inside the nested route
```js
render() {
  return {
    <div>
      <section className = "Posts">
        {posts}
      </section>

      <Route path = {this.props.match.url + '/:id'} exact component = {FullPost}/>
    </div>
  };
}
```
## **`Redirecting` Requests**:
- If you visit `'/'`, then you will redirected to `'/posts'`
```js
import {Redirect} from 'react-router-dom';

render(){
  return (
    <div>
      <Switch>
        <Route path = "/posts" exact component = {Posts}/>
        <Route path="/new-post" component = {NewPost}/>
        <Redirect from ="/" to = "/posts" />
      </Switch>
    </div>
  );
}
```

## **`Guards`**:
Some pages can be visited by the logged in user. If not, then can't.

```js
class Blog extends Component {
  state = {
    auth: false
  }

  render() {
    return (
      <Switch>
        {this.state.auth ? <Route path="/new-post" component = {NewPost}/> : null}
        <Route path="/posts" component = {Posts}/>
        <Redirect from = "/" to="/posts"/>
      </Switch>
    );
  }
}
```

## **`Lazy Loading:`** (react-router v^4)
- When rendering, all pages are loaded though users does not visit all pages.
- For this, it creates more download resouse that creates not much better user experience.
- WHen visited, that time will be loaded, otherwise not.
- `HOC Component(asyncComponent.js)`
```js
import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }
    componentDidMount() {
      importCOmponent()
        .then(cmp => {
          this.setState({component: cmp.default})
        });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
};

export default asyncComponent;
```
- `Main Home Component`
```js
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';

import Posts from './Posts/Posts';
import asyncComponent from '../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true
  }

  render(){
    return(
      <div>
        <Switch>
          {this.state.auth ? <Route path="/new-post" component = {AsyncNewPost}/> : null}
          <Route path="/posts" component = {Posts}/>
          <Redirect from = "/" to="/posts"/>
        </Switch>
      </div>
    );
  }
}
```

### **`For React^16.6 Lazy Loading`**
```js
import React, {Component, Suspense} from 'react';
import {...} from 'react-router-dom';

// import Posts from './containers/Posts';
import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(() => import('./containers/Posts'));

class App extends Component {
  render() {
    return {
      <BrowserRouter>
        <React.Fragment>
          <nav>
            <NavLink to = "/user">User Page</NavLink>
            <NavLink to = "/posts">Posts Page</NavLink>
          </nav>

          <Route path = "/" component = {Welcome} exact/>
          <Route path = "/user" component = {User} />

          {/*<Route path = "/posts" component = {Posts}/>*/}

          <Route 
            path = "/posts" 
            render = {() => 
              <Suspense fallback = {<div>Loading...</div>}>
                <Posts/>
              </Suspense>}
          />

        </React.Fragment>
      </BrowserRouter>
    }
  }
}
```
Can be use this another way:
```js
import React, {Component, Suspense} from 'react';
import {...} from 'react-router-dom';

// import Posts from './containers/Posts';
import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(() => import('./containers/Posts'));

class App extends Component {
  state = {
    showPosts: false
  }

  modeHandler = () => {
    this.setState(prevState => {
      return {showPosts: !prevSTate.showPosts};
    });
  };

  render() {
    return {
      <React.Fragment>

        <button onClick = {this.modeHandler}>Toggle Mode</button>

        {this.state.showPosts ? 
          (
            <Suspense fallback = {<div>Loading...</div>}>
             <Posts/>
            </Suspense>) : 
        <User />}

      </React.Fragment>
    }
  }
}
```


