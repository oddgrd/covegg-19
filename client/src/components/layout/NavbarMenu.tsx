import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  faList,
  faSignOutAlt,
  faBars,
  faPaintBrush,
  faPlus,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../auth/authSlice';

export const NavbarMenu = () => {
  const [menu, toggleMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const email = useAppSelector((state) => state.auth.user.email);

  const isAdmin = email === 'oddgrd@gmail.com';

  const handleLogOut = () => {
    dispatch(logout());
    toggleMenu(!menu);
    history.push('/');
  };
  const handleClick = useCallback((e: any) => {
    if (!dropdownRef.current) return;
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    toggleMenu(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => handleClick(e));

    return () => {
      document.removeEventListener('mousedown', (e) => handleClick(e));
    };
  }, [handleClick]);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => toggleMenu(!menu)} className='btn'>
        <FontAwesomeIcon icon={faBars} className='nav-link' />
      </button>
      {menu && (
        <div className='navbar-menu menu-animation-down'>
          <Link
            to='/browse'
            className='navbar-menu-item'
            onClick={() => toggleMenu(!menu)}
          >
            <FontAwesomeIcon icon={faList} className='nav-link' /> Browse
            Problems
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to='/create'
                className='navbar-menu-item'
                onClick={() => toggleMenu(!menu)}
              >
                <FontAwesomeIcon icon={faPaintBrush} className='nav-link' />{' '}
                Create New Problem
              </Link>
              {isAdmin && (
                <Link
                  to='/boards/add'
                  className='navbar-menu-item'
                  onClick={() => toggleMenu(!menu)}
                >
                  <FontAwesomeIcon icon={faPlus} className='nav-link' /> Add New
                  Board
                </Link>
              )}
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => handleLogOut()}
              className='navbar-menu-item btn'
            >
              <FontAwesomeIcon icon={faSignOutAlt} className='nav-link' /> Log
              Out
            </button>
          ) : (
            <Link
              to='/login'
              className='navbar-menu-item'
              onClick={() => toggleMenu(!menu)}
            >
              <FontAwesomeIcon icon={faSignInAlt} className='nav-link' /> Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
