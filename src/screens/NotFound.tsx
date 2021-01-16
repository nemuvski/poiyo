import React, {ReactElement, useEffect} from 'react';
import {setDocumentTitle} from "../utilities/DocumentTitle";
import {Link} from "react-router-dom";
import ArticleInner from "../components/ArticleInner";

const NotFound: React.FC = (): ReactElement => {
  useEffect(() => {
    setDocumentTitle('ページが見つかりません');
  }, []);

  return (
    <ArticleInner>
      <h1>お探しのページが見つかりませんでした。</h1>
      <p>お探しのページは一時的にアクセスできない状況か、移動もしくは削除された可能性があります。</p>
      <Link to="/">トップページへ</Link>
    </ArticleInner>
  );
}

export default NotFound;
