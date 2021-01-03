import React, { ReactElement, useContext, useCallback } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import keyVisual from '../assets/key-visual.svg';

const Front: React.FC = (): ReactElement => {
  const { signIn } = useContext(AuthenticationContext);

  const handleSignIn = useCallback(() => {
    signIn();
  }, []);

  return (
    <>
      <section>
        <div>
          <p>
            Googleアカウントでサインインができます！
          </p>
          <p>
            新規作成、サインインのどちらも以下のボタンから行えます。<br />
            利用規約、プライバシーポリシーに同意した上でサインインしてください。
          </p>
        </div>
        <div><img src={keyVisual} /></div>
      </section>
      <section>
        <h2>はじめかたは簡単！</h2>
        <p>
          Googleアカウントでご利用できます。
        </p>
        <p>
          新規作成、サインインのどちらも以下のボタンから行えます。<br />
          利用規約、プライバシーポリシーに同意した上でサインインしてください。
        </p>
        <div>
          <button onClick={handleSignIn} className="button">
            サインイン
          </button>
        </div>
      </section>
    </>
  );
}

export default Front;
