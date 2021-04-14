import React, { useState, useEffect } from 'react';
import { Login } from '../auth/Login';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <section className='container'>
      <div className='landing'>
        <h1 style={{ color: '#05ab75', fontSize: '2.5rem' }}>Covegg-19</h1>
        <div className='landing-links'>
          {isAuthenticated ? (
            <Link to='/edit' className='landing-link'>
              <strong>CREATE</strong>
            </Link>
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
