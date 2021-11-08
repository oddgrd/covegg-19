import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <section className='container'>
      <div className='landing'>
        <div className='landing-header'>
          <h1 style={{ fontSize: '2rem' }}>Covegg-19 (DEPRECATED)</h1>
          <h3 style={{ maxWidth: '500px' }}>
            Create and browse problems for your home climbing board
          </h3>
          <h3>This project is no longer developed, new version at: </h3>
        </div>
        <a
          href='https://myhomeboard.no/'
          target='_blank'
          rel='noreferrer'
          style={{
            color: '#05ab75',
            fontSize: '25px',
            textDecoration: 'underline',
          }}
        >
          myhomeboard.no
        </a>

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
