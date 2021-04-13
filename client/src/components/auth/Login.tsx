import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from './btn_google_signin_dark_pressed_web@2x.png';
export const Login = () => {
  const googleSignInClick = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };
  return (
    <section className='container'>
      <div className='landing'>
        <h1 style={{ color: '#05ab75', fontSize: '2.5rem' }}>Covegg-19</h1>
        <div className='landing-links'>
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
          <Link to='/problems' className='landing-link'>
            <strong>BROWSE</strong>
          </Link>
        </div>
      </div>
    </section>
  );
};
