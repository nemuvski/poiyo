import React, {ReactElement, useContext, useCallback, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import ArticleInner from '../components/ArticleInner';
import keyVisual from '../assets/key-visual.svg';
import googleIcon from '../assets/icons/google.svg';
import boardIcon from '../assets/icons/board.svg';
import searchIcon from '../assets/icons/search.svg';
import penIcon from '../assets/icons/pen.svg';
import '../styles/screens/page-front.scss';
import {setDocumentTitle} from "../utilities/DocumentTitle";

const Front: React.FC = (): ReactElement => {
  const { signIn } = useContext(AuthenticationContext);

  const handleSignIn = useCallback(() => {
    signIn();
  }, []);

  useEffect(() => {
    setDocumentTitle('Poiyo', false);
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
            <img src={keyVisual} alt="Poiyo" className="page-front__key-visual" />
          </div>
        </section>
        <section className="page-front__section">
          <h2>はじめ方は簡単！</h2>
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
          <h2>使い方も簡単！</h2>
          <div className="page-front__features">
            <div className="page-front__feature">
              <div className="page-front__feature-icon">
                <img src={boardIcon} alt="ボード" />
              </div>
              <div className="page-front__feature-description">
                <span className="page-front__feature-label">ボードを作成</span>
                <p>話題にしたいことを記入して、ボードを作成しましょう。</p>
              </div>
            </div>
            <div className="page-front__feature">
              <div className="page-front__feature-icon">
                <img src={searchIcon} alt="検索" />
              </div>
              <div className="page-front__feature-description">
                <span className="page-front__feature-label">ボードを探す</span>
                <p>気になる話題のボードを探しましょう。</p>
              </div>
            </div>
            <div className="page-front__feature">
              <div className="page-front__feature-icon">
                <img src={penIcon} alt="コメント" />
              </div>
              <div className="page-front__feature-description">
                <span className="page-front__feature-label">ボードにコメント</span>
                <p>気になる話題のボードにコメントをして、交流しましょう。</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleInner>
  );
}

export default Front;
