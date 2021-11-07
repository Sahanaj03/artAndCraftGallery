import * as Route from 'constants/routes';
import logo from 'images/logo-full.png';
import reva from 'images/reva.png';
import React from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const Footer = () => {
  const {pathname} = useLocation();

  const visibleOnlyPath = [Route.HOME, Route.SHOP];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <a href="https://reva.edu.in" target="_blank" rel="noopener noreferrer">
          <img alt="Reva University logo" className="footer-logo" src={reva} />
        </a>
      </div>
      <div className="footer-col-2">
        <img alt="Footer logo" className="footer-logo" src={logo} />
        <h5>
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
      <div className="footer-col-3">
        <strong>
          <h5>Soujanya Sh</h5>
          <h5>Shriti Sonar</h5>
          <h5>Sahana J</h5>
          <h5>Shreeya KN</h5>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
