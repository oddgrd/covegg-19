import React from 'react';
import GoogleLogin from './btn_google_signin_dark_pressed_web@2x.png';
export const Login = () => {
  const googleSignInClick = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };
  return (
    <button onClick={googleSignInClick} className='btn'>
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
