import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../components/layout/Landing';
import Editor from '../components/editor/Editor';
import { Problem } from '../components/browser/Problem';
import { BrowseProblems } from '../components/browser/BrowseProblems';
import { Login } from '../components/auth/Login';

// Redux
import { useAppDispatch } from './hooks';
import { loadUser } from '../components/auth/authSlice';
import { Navbar } from '../components/layout/Navbar';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/edit' component={Editor} />
          <Route exact path='/problem' component={Problem} />
          <Route exact path='/browse' component={BrowseProblems} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
