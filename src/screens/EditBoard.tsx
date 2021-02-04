import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {setDocumentTitle} from "../utilities/DocumentTitle";
import ArticleInner from "../components/ArticleInner";
import ArticleSection from "../components/ArticleSection";
import BoardForm from "../components/BoardForm";
import {Board, BoardLocationState} from "../libs/models/Board";
import '../styles/screens/page-edit-board.scss';

const EditBoard: React.FC = () => {
  const location = useLocation<BoardLocationState>();
  const history = useHistory();
  const [board, setBoard] = useState<Board | undefined>();

  useEffect(() => {
    setDocumentTitle('ボード編集・削除');

    if (location.state && location.state.board) {
      setBoard(location.state.board);
    } else {
      // ボード詳細ページから遷移していないパターンであるため、ダッシュボード画面へ飛ばす.
      history.replace('/dashboard');
    }
  }, []);

  const handleClick = () => {
    if (!confirm('ボードを削除しますがよろしいですか？')) {
      return;
    }
    // 削除する処理.
  };

  return (
    <ArticleInner>
      <div className="page-edit-board">
        <h1>ボード編集・削除</h1>
        <ArticleSection wider={true}>
          <BoardForm board={board} />
        </ArticleSection>
        <ArticleSection wider={true}>
          <div className="page-edit-board__delete-action">
            <p>以下のボタンをクリックするとボードを削除します。<br />削除後はダッシュボードへ遷移します。</p>
            <button className="is-red" type="button" onClick={handleClick}>削除</button>
          </div>
        </ArticleSection>
      </div>
    </ArticleInner>
  );
}

export default EditBoard;
