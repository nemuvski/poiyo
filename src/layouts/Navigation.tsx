import React from 'react';
import NavigationActions from './NavigationActions';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';
import { firebaseSignIn } from '../utilities/FirebaseAuth';

const Navigation: React.FC = () => {
  const account = useSelector(selectAccount);

  return (
    <nav role='navigation' aria-label='header-navigation' className='navigation'>
      {account ? <NavigationActions /> : <button onClick={() => firebaseSignIn()}>サインイン</button>}
    </nav>
  );
};

export default Navigation;
