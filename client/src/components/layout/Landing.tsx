import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { login } from '../auth/authSlice';
import GoogleButton from 'react-google-button';
const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login());
  };
  return (
    <section className='container'>
      <div className='landing'>
        <div className='landing-header'>
          <h1 style={{ fontSize: '2rem' }}>Covegg-19</h1>
          <h3 style={{ maxWidth: '500px' }}>
            Save and browse problems on your home climbing board
          </h3>
        </div>

        <div className='landing-links'>
          {isAuthenticated ? (
            <>
              <Link to='/create' className='landing-link'>
                <strong>CREATE</strong>
              </Link>
              <Link to='/browse' className='landing-link'>
                <strong>BROWSE</strong>
              </Link>
            </>
          ) : (
            <>
              <h3 style={{ textAlign: 'center' }}>
                Register or sign in to get started:
              </h3>
              <GoogleButton onClick={handleLogin} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
