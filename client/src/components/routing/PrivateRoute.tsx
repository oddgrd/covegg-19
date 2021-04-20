import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Spinner from '../layout/Spinner';

export const PrivateRoute = ({
  component: Component,
  ...routeProps
}: RouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const status = useAppSelector((state) => state.auth.status);

  if (!Component) {
    throw Error('component is undefined');
  }

  // Prevents redirect on refresh, but gets stuck if logged out in route,
  // fix using localStorage
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (status === 'pending' || status === 'idle') {
      return <Spinner />;
    } else if (status === 'resolved' && isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  };

  return <Route {...routeProps} render={render} />;
};
