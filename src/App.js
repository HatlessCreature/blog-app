import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AppPosts from './pages/AppPosts';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path='/posts'>
          <AppPosts />
        </Route>
        <Route exact path='/'>
          <AppPosts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
