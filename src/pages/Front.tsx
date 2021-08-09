import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import ArticleInner from '../components/ArticleInner';
import ArticleSection from '../components/ArticleSection';
import keyVisual from '../assets/key-visual.svg';
import googleIcon from '../assets/icons/google.svg';
import boardIcon from '../assets/icons/board-feature.svg';
import searchIcon from '../assets/icons/search-feature.svg';
import penIcon from '../assets/icons/pen-feature.svg';
import '../styles/pages/page-front.scss';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import NewsList from '../components/NewsList';

const Front: React.FC = () => {
  const { signIn } = useContext(AuthenticationContext);

  useEffect(() => {
    setDocumentTitle('Poiyo（ぽいよ） - 匿名掲示板コミュニティサイト', false);
  }, []);

  return (
    <ArticleInner>
      <div className='page-front'>
        <ArticleSection>
          <div className='page-front__container'>
            <div className='page-front__summary'>
              <p>
                <strong>Poiyo</strong>（ぽいよ）は1つの話題ごとに、みんなでコメントし合うコミュニティサービスです。
              </p>
              <p>
                「ちょっと知っていること」や「これってどういうことなんだろう」といったことなどを投稿し、コメントでやりとりしましょう。
              </p>
              <p>匿名で気軽にご利用いただけます！</p>
            </div>
            <img src={keyVisual} alt='Poiyo' className='page-front__key-visual' />
          </div>
        </ArticleSection>

        <ArticleSection>
          <h2>お知らせ</h2>
          <NewsList />
        </ArticleSection>

        <ArticleSection>
          <h2>はじめ方は簡単！</h2>
          <p>
            Googleアカウントでご利用できます。 新規作成、サインインのどちらも以下のボタンから行えます。
            <br />
            <Link to='/privacy'>プライバシーポリシー</Link>、<Link to='/terms'>利用規約</Link>
            に同意した上でサインインしてください。
          </p>
          <div className='page-front__signin-wrapper'>
            <button onClick={() => signIn()} className='is-white page-front__signin-button'>
              <img src={googleIcon} alt='Google' />
              <span>Googleでサインイン</span>
            </button>
          </div>
        </ArticleSection>

        <ArticleSection>
          <h2>使い方も簡単！</h2>
          <div className='page-front__features'>
            <div className='page-front__feature'>
              <div className='page-front__feature-icon'>
                <img src={boardIcon} alt='ボード' />
              </div>
              <div className='page-front__feature-description'>
                <span className='page-front__feature-label'>ボードを作成</span>
                <p>話題にしたいことを記入して、ボードを作成しましょう。</p>
              </div>
            </div>
            <div className='page-front__feature'>
              <div className='page-front__feature-icon'>
                <img src={searchIcon} alt='検索' />
              </div>
              <div className='page-front__feature-description'>
                <span className='page-front__feature-label'>ボードを探す</span>
                <p>気になる話題のボードを探しましょう。</p>
              </div>
            </div>
            <div className='page-front__feature'>
              <div className='page-front__feature-icon'>
                <img src={penIcon} alt='コメント' />
              </div>
              <div className='page-front__feature-description'>
                <span className='page-front__feature-label'>ボードにコメント</span>
                <p>気になる話題のボードにコメントをして、交流しましょう。</p>
              </div>
            </div>
          </div>
        </ArticleSection>
      </div>
    </ArticleInner>
  );
};

export default Front;
