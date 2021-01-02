import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../styles/layouts/footer.scss';

const Footer: React.FC = (): ReactElement => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__container">
          <div className="footer__logo">
            <Link to="/"><img src={logo} alt="Poiyo" /></Link>
          </div>
          <nav className="footer__navigation">
            <ul>
              <li><Link to="/terms">利用規約</Link></li>
              <li><Link to="/privacy">プライバシーポリシー</Link></li>
            </ul>
          </nav>
        </div>
        <p className="footer__copyright">© 2021 Poiyo</p>
      </div>
    </footer>
  );
}

export default Footer;
