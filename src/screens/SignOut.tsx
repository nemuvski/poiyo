import React, {useContext, useEffect} from 'react';
import FullWideLoading from "../components/FullWideLoading";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import {setDocumentTitle} from "../utilities/DocumentTitle";

const SignOut: React.FC = () => {
  const { signOut } = useContext(AuthenticationContext);

  useEffect(() => {
    setDocumentTitle('サインアウト');
    // サインアウト実行後に、フロントページにリダイレクトする.
    signOut();
  }, []);

  return (
    <FullWideLoading />
  );
}

export default SignOut;
