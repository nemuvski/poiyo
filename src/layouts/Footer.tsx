import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import koredanaLogo from '../assets/icons/koredana.svg';
import '../styles/layouts/footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__container">
          <div className="footer__brand">
            <Link to="/"><img src={logo} alt="Poiyo" /></Link>
          </div>
          <nav className="footer__navigation">
            <ul>
              <li><Link to="/terms">利用規約</Link></li>
              <li><Link to="/privacy">プライバシーポリシー</Link></li>
              <li><Link to="/help">ヘルプ</Link></li>
              <li>
                <a href="https://koredana.info/" target="_blank" rel="noreferrer noopener">
                  <img src={koredanaLogo} alt="コレ棚" className="footer__koredana-logo" />
                  管理人のブログ
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="footer__copyright">© 2021 Poiyo</p>
      </div>
    </footer>
  );
}

export default Footer;
