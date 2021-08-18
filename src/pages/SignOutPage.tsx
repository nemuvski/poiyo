import React, { useEffect } from 'react';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import { signOut } from '../utilities/FirebaseAuth';
import { useFullWideLoading } from '../hooks/useFullWideLoading';
import ArticleInner from '../components/ArticleInner';

const SignOutPage: React.FC = () => {
  const { setFullWideLoading } = useFullWideLoading(true);

  useEffect(() => {
    setDocumentTitle('サインアウト');
    // サインアウト処理
    signOut().finally(() => {
      setFullWideLoading(false);
    });
  }, []);

  return (
    <ArticleInner>
      <h1>サインアウト</h1>

      <p>サインアウト中です。そのままお待ち下さい。</p>
    </ArticleInner>
  );
};

export default SignOutPage;
