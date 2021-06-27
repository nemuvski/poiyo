import React, { useContext } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import NavigationActions from './NavigationActions';

const Navigation: React.FC = () => {
  const { account, signIn } = useContext(AuthenticationContext);

  return (
    <nav role='navigation' aria-label='header-navigation' className='navigation'>
      {account ? <NavigationActions /> : <button onClick={() => signIn()}>サインイン</button>}
    </nav>
  );
};

export default Navigation;
