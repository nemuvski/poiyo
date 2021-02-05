import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {setDocumentTitle} from "../utilities/DocumentTitle";
import ArticleInner from "../components/ArticleInner";
import ArticleSection from "../components/ArticleSection";
import BoardForm from "../components/BoardForm";
import {Board, BoardLocationState} from "../libs/models/Board";
import '../styles/screens/page-edit-board.scss';
import BoardsService from "../libs/services/BoardsService";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import FullWideLoading from "../components/FullWideLoading";

const EditBoard: React.FC = () => {
  const location = useLocation<BoardLocationState>();
  const history = useHistory();
  const [board, setBoard] = useState<Board | undefined>();
  const { account } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);

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
    if (!account || !board) {
      console.error('問題が発生したため、処理を中断しダッシュボードへ遷移します。');
      history.replace('/dashboard');
      return;
    }
    if (!confirm('ボードを削除しますがよろしいですか？')) {
      return;
    }
    setLoading(true);
    BoardsService.remove(account.token, board.boardId)
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        history.replace('/dashboard');
        setLoading(false);
      });
  };

  return (
    <ArticleInner>
      {loading && <FullWideLoading />}

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
