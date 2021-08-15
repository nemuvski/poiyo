import React from 'react';
import NavigationActions from './NavigationActions';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';
import FirebaseAuthService from '../services/FirebaseAuthService';

const Navigation: React.FC = () => {
  const account = useSelector(selectAccount);

  return (
    <nav role='navigation' aria-label='header-navigation' className='navigation'>
      {account ? <NavigationActions /> : <button onClick={() => FirebaseAuthService.signIn()}>サインイン</button>}
    </nav>
  );
};

export default Navigation;
