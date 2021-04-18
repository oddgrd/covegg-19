import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <Link to='/' className='nav-link'>
          <strong>C-19</strong>
        </Link>
      </h1>
    </nav>
  );
};
