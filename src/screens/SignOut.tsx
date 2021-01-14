import React, {ReactElement, useContext, useEffect} from 'react';
import FullWideLoading from "../components/FullWideLoading";
import {AuthenticationContext} from "../contexts/AuthenticationContext";

const SignOut: React.FC = (): ReactElement => {
  const { signOut } = useContext(AuthenticationContext);

  useEffect(() => {
    // サインアウト実行後に、フロントページにリダイレクトする.
    signOut();
  }, []);

  return (
    <FullWideLoading />
  );
}

export default SignOut;
