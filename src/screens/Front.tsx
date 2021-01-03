import React, { ReactElement, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import ArticleInner from '../components/ArticleInner';
import keyVisual from '../assets/key-visual.svg';
import googleIcon from '../assets/icons/google.svg';
import '../styles/screens/page-front.scss';

const Front: React.FC = (): ReactElement => {
  const { signIn } = useContext(AuthenticationContext);

  const handleSignIn = useCallback(() => {
    signIn();
  }, []);

  return (
    <ArticleInner>
      <div className="page-front">
        <section className="page-front__section">
          <div className="page-front__container">
            <div className="page-front__summary">
              <p><strong>Poiyo</strong>（ぽいよ）は1つの話題ごとに、みんなでコメントし合うコミュニティサービスです。</p>
              <p>「ちょっと知っていること」や「これってどういうことなんだろう」といったことなどを投稿し、みんなからコメントをもらうことで知見を広げていきましょう。</p>
            </div>
            <img src={keyVisual} className="page-front__key-visual" />
          </div>
        </section>
        <section className="page-front__section">
          <h2>はじめかたは簡単！</h2>
          <p>
            Googleアカウントでご利用できます。
            新規作成、サインインのどちらも以下のボタンから行えます。<br />
            <Link to="/privacy">プライバシーポリシー</Link>、<Link to="/terms">利用規約</Link>に同意した上でサインインしてください。
          </p>
          <div className="page-front__signin-wrapper">
            <button onClick={handleSignIn} className="is-white page-front__signin-button">
              <img src={googleIcon} alt="Google" />
              <span>Googleでサインイン</span>
            </button>
          </div>
        </section>
        <section className="page-front__section">
          <h2>特徴</h2>
          <ul>
            <li>匿名</li>
            <li>ボード単位</li>
          </ul>
        </section>
      </div>
    </ArticleInner>
  );
}

export default Front;
