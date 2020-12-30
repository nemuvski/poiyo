import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../styles/layouts/navigation.scss';

const Navigation: React.FC = (): ReactElement => {
  return (
    <nav role="navigation" aria-label="header-navigation" className='navigation'>
      <ul className="navigation__actions">
        <li className="navigation__action">
          <Link to="/enter" className="navigation__link">
            サインイン
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
