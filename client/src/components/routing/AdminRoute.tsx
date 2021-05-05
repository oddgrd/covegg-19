import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Spinner from '../layout/Spinner';

export const AdminRoute = ({
  component: Component,
  ...routeProps
}: RouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const status = useAppSelector((state) => state.auth.status);
  const email = useAppSelector((state) => state.auth.user.email);
  const isAdmin = email === 'oddgrd@gmail.com';
  if (!Component) {
    throw Error('component is undefined');
  }

  // Prevents redirect on refresh, but displays null if not authenticated,
  // fix using localStorage and jwt?
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (status === 'pending') {
      return <Spinner />;
    } else if (status === 'idle') {
      setTimeout(() => {}, 100);
    } else if (status === 'resolved' && isAuthenticated && isAdmin) {
      return <Component {...props} />;
    } else {
      return (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      );
    }
  };

  return <Route {...routeProps} render={render} />;
};
