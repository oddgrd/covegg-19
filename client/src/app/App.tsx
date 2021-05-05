import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../components/layout/Landing';
import Editor from '../components/editor/Editor';
import { Problem } from '../components/browser/Problem';
import { Browser } from '../components/browser/Browser';
import { Navbar } from '../components/layout/Navbar';
import { PrivateRoute } from '../components/routing/PrivateRoute';
import { AdminRoute } from '../components/routing/AdminRoute';
import { BoardForm } from '../components/board/BoardForm';

// Redux
import { useAppDispatch } from './hooks';
import { loadUser } from '../components/auth/authSlice';

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
          <PrivateRoute exact path='/problems/:id' component={Problem} />
          <PrivateRoute exact path='/browse' component={Browser} />
          <AdminRoute exact path='/boards/add' component={BoardForm} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
