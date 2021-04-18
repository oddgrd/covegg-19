import React from 'react';
import { Login } from '../auth/Login';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { logout } from '../auth/authSlice';
const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <section className='container'>
      <div className='landing'>
        <div className='landing-header'>
          <h1 style={{ fontSize: '2rem' }}>Covegg-19</h1>
          <h3>Save and browse problems on your home climbing board</h3>
        </div>

        <div className='landing-links'>
          {isAuthenticated ? (
            <>
              <button onClick={() => handleLogOut()}>Log Out</button>
              <Link to='/edit' className='landing-link'>
                <strong>CREATE</strong>
              </Link>
            </>
          ) : (
            <>
              <h3>Sign in to add problems:</h3>
              <Login />
            </>
          )}

          <Link to='/problems' className='landing-link'>
            <strong>BROWSE</strong>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
