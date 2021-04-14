import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import api from '../utils/api';
import Landing from '../components/layout/Landing';
import Editor from '../components/editor/Editor';
import { Problem } from '../components/browser/Problem';
import { BrowseProblems } from '../components/browser/BrowseProblems';
import { Login } from '../components/auth/Login';

// Redux
import { useAppDispatch } from './hooks';
import { loadUser } from '../components/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const auth = async () => {
      try {
        const res = await api.get('/auth');
        dispatch(loadUser(res.data));
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    auth();
  }, [dispatch]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
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
