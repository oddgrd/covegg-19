import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from '../components/layout/Landing';
import Editor from '../components/editor/Editor';
import { Problem } from '../components/problem/Problem';
import { BrowseProblems } from '../components/problem/BrowseProblems';
import { Login } from '../components/auth/Login';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <>
          <Route exact path='/' component={Landing} />

          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/edit' component={Editor} />
            {/* <Route exact path='/problem' component={Problem} /> */}
            <Route exact path='/problems' component={BrowseProblems} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
