import React, {useContext} from 'react';
import {Board, BoardLocationState} from "../libs/models/Board";
import Dayjs, {formatYMD} from '../libs/common/Dayjs';
import '../styles/components/board-item.scss';
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import CompactLoading from "./CompactLoading";
import '../styles/components/board-card.scss';
import ShadowBox from "./ShadowBox";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";
import {useHistory} from "react-router-dom";
import BoardsService from "../libs/services/BoardsService";

type Props = {
  board: Board | null;
};

const BoardCard: React.FC<Props> = (props: Props) => {
  const { account } = useContext(AuthenticationContext);
  const history = useHistory();

  const handleEditButtonClick = () => {
    history.push('/edit-board', {
      board: props.board
    } as BoardLocationState);
  };

  const handleDeleteButtonClick = () => {
    if (!account || !props.board) {
      console.error('問題が発生したため処理を中断し、ダッシュボードへ遷移します。');
      history.replace('/dashboard');
      return;
    }
    if (!confirm('ボードを削除しますがよろしいですか？')) {
      return;
    }
    BoardsService.remove(account.token, props.board.boardId)
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        history.replace('/search');
      });
  };

  return (
    <div className="board-card">
      <ShadowBox>
        {props.board
          ? (
            <div className="board-card__inner">
              <h1 className="board-card__title">{props.board.title}</h1>
              <div className="board-card__meta">
                <time className="board-card__date">{formatYMD(Dayjs(props.board.createdAt))}</time>
              </div>
              <div
                className="md board-card__body"
                dangerouslySetInnerHTML={convertMarkdownTextToHTML(props.board.body)}
              />

              {(account && account.id && account.id == props.board.ownerAccountId) && (
                <div className="board-card__actions">
                  <button className="is-red" type="button" onClick={handleDeleteButtonClick}>削除</button>
                  <button type="button" onClick={handleEditButtonClick}>編集</button>
                </div>
              )}
            </div>
          )
          : <CompactLoading />
        }
      </ShadowBox>
    </div>
  );
}

export default BoardCard;
