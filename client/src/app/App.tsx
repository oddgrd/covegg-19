import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../components/layout/Landing';
import Editor from '../components/editor/Editor';
import { Problem } from '../components/browser/Problem';
import { Browser } from '../components/browser/Browser';

// Redux
import { useAppDispatch } from './hooks';
import { loadUser } from '../components/auth/authSlice';
import { Navbar } from '../components/layout/Navbar';
import { PrivateRoute } from '../components/routing/PrivateRoute';

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
          <PrivateRoute exact path='/create' component={Editor} />
          <PrivateRoute exact path='/problem/:id' component={Problem} />
          <PrivateRoute exact path='/browse' component={Browser} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
