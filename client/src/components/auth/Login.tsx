import React from 'react';
import GoogleLogin from './btn_google_signin_dark_pressed_web@2x.png';
import { useAppDispatch } from '../../app/hooks';
import { login } from './authSlice';

export const Login = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login());
  };
  return (
    <button onClick={handleLogin} className='btn'>
      <img
        src={GoogleLogin}
        alt='Sign in with Google'
        style={{
          width: '100%',
          display: 'block',
          margin: 'auto',
          objectFit: 'contain'
        }}
      />
    </button>
  );
};
