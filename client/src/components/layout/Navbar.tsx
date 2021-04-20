import React from 'react';
import { Link } from 'react-router-dom';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavbarMenu } from './NavbarMenu';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <NavbarMenu />

      <h1 style={{ textAlign: 'center' }}>
        <Link to='/' className='nav-link'>
          <strong>C-19</strong>
        </Link>
      </h1>
      <Link to='/browse' style={{ textAlign: 'end' }}>
        <FontAwesomeIcon icon={faList} className='nav-link' />
      </Link>
    </nav>
  );
};
