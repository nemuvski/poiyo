import React, { ReactElement, useContext, useCallback } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import '../styles/layouts/navigation.scss';

const Navigation: React.FC = (): ReactElement => {
  const { account, signIn, signOut } = useContext(AuthenticationContext);

  const handleClick = useCallback(() => {
    if (account) {
      signOut();
    } else {
      signIn();
    }
  }, [account])

  return (
    <nav role="navigation" aria-label="header-navigation" className='navigation'>
      <ul className="navigation__actions">
        <li className="navigation__action">
          <button onClick={handleClick}>
            {account ? 'サインアウト' : 'サインイン'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
