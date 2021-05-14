import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <section className='container'>
      <div className='landing'>
        <div className='landing-header unselectable'>
          <h1 style={{ fontSize: '2rem' }}>Covegg-19 (BETA)</h1>
          <h3 style={{ maxWidth: '500px' }}>
            Create and browse problems for your home climbing board
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
              <Link to='/login' className='landing-link'>
                <strong>LOGIN</strong>
              </Link>
              <Link to='/browse' className='landing-link'>
                <strong>BROWSE</strong>
              </Link>
            </>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Landing;
