import React, { ReactElement, useContext, useCallback } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import keyVisual from '../assets/key-visual.svg';
import googleIcon from '../assets/google-icon.svg';
import '../styles/screens/page-front.scss';

const Front: React.FC = (): ReactElement => {
  const { signIn } = useContext(AuthenticationContext);

  const handleSignIn = useCallback(() => {
    signIn();
  }, []);

  return (
    <div className="page-front">
      <section className="page-front__section">
        <h2>「ぽいよ」な情報共有コミュニティ</h2>
        <div className="page-front__container">
          <div>
            <p>
              話題ごとにスレッドをたてて、知っていることや感想・意見などを投稿しましょう！
            </p>
          </div>
          <img src={keyVisual} className="page-front__key-visual" />
        </div>
      </section>
      <section className="page-front__section">
        <h2>特徴</h2>
        <ul>
          <li>匿名</li>
          <li>スレッド単位</li>
        </ul>
      </section>
      <section className="page-front__section">
        <h2>はじめかたは簡単！</h2>
        <p>
          Googleアカウントでご利用できます。
        </p>
        <p>
          新規作成、サインインのどちらも以下のボタンから行えます。<br />
          利用規約、プライバシーポリシーに同意した上でサインインしてください。
        </p>
        <div className="page-front__signin-wrapper">
          <button onClick={handleSignIn} className="is-white page-front__signin-button">
            <img src={googleIcon} alt="Google" />
            <span>Googleアカウントでサインイン</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Front;
