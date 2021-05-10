import React from 'react';
import GoogleButton from 'react-google-button';
import { useAppDispatch } from '../../app/hooks';
import { Footer } from '../layout/Footer';
import { login } from './authSlice';

export const Login = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login());
  };
  return (
    <section className='container'>
      <div
        className='div-center'
        style={{ gap: '0.7rem', padding: '0.5rem', marginTop: '2rem' }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#f5f6f7',
            marginBottom: '1rem',
            width: '300px'
          }}
        >
          Register or sign in to create problems
        </h2>
        <GoogleButton onClick={handleLogin} />
        <i
          style={{
            fontSize: '1rem',
            marginTop: '0.5rem',
            width: '300px'
          }}
        >
          *Only preapproved google accounts are currently able to register
        </i>
      </div>
      <Footer />
    </section>
  );
};
