import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  faList,
  faSignOutAlt,
  faBars,
  faPaintBrush
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout, login } from '../auth/authSlice';
import GoogleButton from 'react-google-button';

export const NavbarMenu = () => {
  const [menu, toggleMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    history.push('/');
  };
  const handleLogin = () => {
    dispatch(login());
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
        <div className='navbar-menu'>
          <Link to='/browse' className='navbar-menu-item'>
            <FontAwesomeIcon icon={faList} className='nav-link' /> Browse
            Problems
          </Link>
          <Link to='/create' className='navbar-menu-item'>
            <FontAwesomeIcon icon={faPaintBrush} className='nav-link' /> Create
            New Problem
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => handleLogOut()}
              className='navbar-menu-item btn'
              style={{}}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className='nav-link' /> Log
              Out
            </button>
          ) : (
            <GoogleButton onClick={handleLogin} />
          )}
        </div>
      )}
    </div>
  );
};
