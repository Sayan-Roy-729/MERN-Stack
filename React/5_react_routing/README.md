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
- Can Render different component/jsx through same Route. Then the components will be available also inside the dom top to bottom beneath each other.
- Without using `Switch` (Only using `Route`), every time when changes page, the whole page will reload. Then the state will be removed and will create problems. For that, have to use `Switch` that switches between pages.
```js
import {Route, Switch} from 'react-router-dom';
import Posts from '...';

class Something extends Components {

  render() {
    return(
      <div>
        <header>
          <ul>
            <li href = "/">Home</li>
            <li href = "/new-post">New Post</li>
          </ul>
        </header>

        <Switch>
          <Route path = "/" exact component={Posts}/>
          <Route path = "/" render ={() => <h1>Home2</h1>}/>
          <Route path = "/new-post" component = {NewPost}/>
        </Switch>
      </div>
    );
  }
}

export default Something;
```

