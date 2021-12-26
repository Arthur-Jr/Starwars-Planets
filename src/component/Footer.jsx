import React from 'react';
import gitIcon from '../Images/gitHubIcon.svg';
import linkedinIcon from '../Images/linkedinIcon.svg';

function Footer() {
  function openSocial(url) {
    window.open(url, '_blank');
  }

  return (
    <footer className="main-footer" data-testid="footer">
      <button
        type="button"
        onClick={ () => openSocial('https://github.com/Arthur-Jr') }
        data-testid="social-icon"
      >
        <img src={ gitIcon } alt="github icon" />
      </button>

      <button
        type="button"
        onClick={ () => openSocial('https://www.linkedin.com/in/arthur-jr/') }
        data-testid="social-icon"
      >
        <img src={ linkedinIcon } alt="linkedin icon" />
      </button>
    </footer>
  );
}

export default Footer;
