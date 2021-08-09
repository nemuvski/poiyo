import React, { useEffect } from 'react';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import { signOut } from '../libs/services/FirebaseAuthService';
import FullWideLoading from '../components/FullWideLoading';

const SignOutPage: React.FC = () => {
  useEffect(() => {
    setDocumentTitle('サインアウト');
    // サインアウト処理
    signOut();
  }, []);

  return <FullWideLoading />;
};

export default SignOutPage;
