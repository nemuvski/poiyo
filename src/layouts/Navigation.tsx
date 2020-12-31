import React, { ReactElement, useContext } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import '../styles/layouts/navigation.scss';

const Navigation: React.FC = (): ReactElement => {
  const { account, signIn, signOut } = useContext(AuthenticationContext);

  return (
    <nav role="navigation" aria-label="header-navigation" className='navigation'>
      <ul className="navigation__actions">
        <li className="navigation__action">
          <button onClick={() => account ? signOut() : signIn()} className="navigation__link">
            {account ? 'サインアウト' : 'サインイン'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
