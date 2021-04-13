import React from 'react';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <section className='container'>
      <div className='landing'>
        <h1 style={{ color: '#05ab75', fontSize: '2.5rem' }}>Covegg-19</h1>
        <div className='landing-links'>
          <Link to='/edit' className='landing-link'>
            <strong>CREATE</strong>
          </Link>
          <Link to='/problems' className='landing-link'>
            <strong>BROWSE</strong>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
