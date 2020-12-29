import React, { ReactElement } from 'react';
import '../styles/components/header.scss';
import logo from '../assets/logo.svg';

const Header: React.FC = (): ReactElement => {
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__logo">
          <img src={logo} alt="Poiyo" className="header__logo-image" />
        </h1>
      </div>
    </header>
  );
}

export default Header;
