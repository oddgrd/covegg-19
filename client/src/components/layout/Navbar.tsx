import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavbarMenu } from './NavbarMenu';
import logoUrl from '../../images/Logo-klatreapp.svg';
import SVG, { Props as SVGProps } from 'react-inlinesvg';

const Logo = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} title='MyLogo' {...props} />
));
export const Navbar = () => {
  const logo = useRef<SVGElement>(null);
  return (
    <nav className='navbar'>
      <NavbarMenu />

      <Link to='/' className='nav-link'>
        <SVG src={`${process.env.PUBLIC_URL}/menu.svg`} title='Menu' />
        <Logo ref={logo} src={logoUrl} style={{ width: '48px' }} />
      </Link>

      <Link to='/browse' style={{ textAlign: 'end' }}>
        <FontAwesomeIcon icon={faList} className='nav-link' />
      </Link>
    </nav>
  );
};
