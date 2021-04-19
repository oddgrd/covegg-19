import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Spinner from '../layout/Spinner';

export const PrivateRoute = ({ ...routeProps }: RouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const status = useAppSelector((state) => state.auth.status);

  if (status === 'pending') {
    return <Spinner />;
  } else if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to='/' />;
  }
};
