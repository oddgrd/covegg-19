import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavbarMenu } from './NavbarMenu';
import logoUrl from '../../images/Logo-klatreapp.svg';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import { useAppSelector } from '../../app/hooks';

const Logo = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} title='Covegg-19' {...props} />
));

export const Navbar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const visibility = isAuthenticated ? 'visible' : 'hidden';
  const logo = useRef<SVGElement>(null);
  return (
    <nav className='navbar'>
      <NavbarMenu />

      <Link to='/' className='nav-link'>
        <Logo ref={logo} src={logoUrl} style={{ width: '48px' }} />
      </Link>

      <Link to='/browse' style={{ visibility: visibility }}>
        <FontAwesomeIcon icon={faList} className='nav-link' />
      </Link>
    </nav>
  );
};
