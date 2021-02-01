import React, {useContext, useEffect} from 'react';
import {setDocumentTitle} from "../utilities/DocumentTitle";
import {useHistory} from "react-router-dom";
import ArticleInner from "../components/ArticleInner";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import notFound from '../assets/not-found.svg';
import '../styles/screens/page-not-found.scss';

const NotFound: React.FC = () => {
  const { account } = useContext(AuthenticationContext);
  const history = useHistory();

  useEffect(() => {
    setDocumentTitle('ページが見つかりません');
  }, []);

  return (
    <div className="page-not-found">
      <ArticleInner>
        <h1>お探しのものが見つかりませんでした。</h1>
        <p className="page-not-found__container">
          <img className="page-not-found__image" alt="何も見つかりませんでした。" src={notFound} />
        </p>
        <p className="page-not-found__container">
          探してみましたが、見つかりませんでした。<br />
          一時的にアクセスできない状況か、移動もしくは削除された可能性があります。
        </p>
        <p className="page-not-found__container">
          <button type="button" onClick={() => history.push(!account ? '/' : '/dashboard')}>
            {!account ? 'トップページへ' : 'ダッシュボードへ'}
          </button>
        </p>
      </ArticleInner>
    </div>
  );
}

export default NotFound;
