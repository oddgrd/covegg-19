import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const Footer = () => {
  return (
    <div className='footer'>
      <a
        href='https://github.com/oddgrd/covegg-19'
        target='_blank'
        rel='noreferrer'
      >
        <FontAwesomeIcon icon={faGithub} /> Issues and feedback
      </a>
    </div>
  );
};
