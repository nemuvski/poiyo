import React, { useEffect } from 'react';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import ArticleInner from '../components/ArticleInner';
import ArticleSection from '../components/ArticleSection';
import BoardForm from '../components/BoardForm';
import '../styles/screens/page-create-board.scss';

const CreateBoard: React.FC = () => {
  useEffect(() => {
    setDocumentTitle('ボード作成');
  }, []);

  return (
    <ArticleInner>
      <div className='page-create-board'>
        <h1>ボード作成</h1>
        <ArticleSection wider={true}>
          <p className='page-create-board__description'>話題にしたいことを記入して、ボードを作成しましょう。</p>
          <BoardForm />
        </ArticleSection>
      </div>
    </ArticleInner>
  );
};

export default CreateBoard;
