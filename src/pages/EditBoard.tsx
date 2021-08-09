import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import ArticleInner from '../components/ArticleInner';
import ArticleSection from '../components/ArticleSection';
import BoardForm from '../components/BoardForm';
import { Board, BoardLocationState } from '../libs/models/Board';

const EditBoard: React.FC = () => {
  const location = useLocation<BoardLocationState>();
  const history = useHistory();
  const [board, setBoard] = useState<Board | undefined>();

  useEffect(() => {
    setDocumentTitle('ボード編集');

    if (location.state && location.state.board) {
      setBoard(location.state.board);
    } else {
      // ボード詳細ページから遷移していないパターンであるため、ダッシュボード画面へ飛ばす.
      history.replace('/dashboard');
    }
  }, []);

  return (
    <ArticleInner>
      <div className='page-edit-board'>
        <h1>ボード編集</h1>
        <ArticleSection wider={true}>
          <BoardForm board={board} />
        </ArticleSection>
      </div>
    </ArticleInner>
  );
};

export default EditBoard;
