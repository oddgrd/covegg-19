import React from 'react';
import { Login } from '../auth/Login';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { logOut } from '../auth/authSlice';
const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <section className='container'>
      <div className='landing'>
        <h1 style={{ color: '#05ab75', fontSize: '2.5rem' }}>Covegg-19</h1>
        <div className='landing-links'>
          {isAuthenticated ? (
            <>
              <button onClick={() => handleLogOut()}>Log Out</button>
              <Link to='/edit' className='landing-link'>
                <strong>CREATE</strong>
              </Link>
            </>
          ) : (
            <Login />
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
