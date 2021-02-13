import React, {useContext, useState} from 'react';
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
import settingsIcon from "../assets/icons/settings.svg";
import SentryTracking from "../utilities/SentryTracking";

type Props = {
  board: Board | null;
};

const BoardCard: React.FC<Props> = (props: Props) => {
  const { account } = useContext(AuthenticationContext);
  const history = useHistory();
  const [isOpenActions, setIsOpenActions] = useState(false);

  const handleEditButtonClick = () => {
    history.push('/edit-board', {
      board: props.board
    } as BoardLocationState);
  };

  const handleDeleteButtonClick = () => {
    if (!account || !props.board) {
      SentryTracking.exception('処理中に問題があたったため、ボードの削除処理は中断されました。');
      return;
    }
    if (!confirm('ボードを削除しますがよろしいですか？')) {
      return;
    }
    BoardsService.remove(account.token, props.board.boardId)
      .catch(error => {
        SentryTracking.exception('ボード削除に失敗しました。');
        SentryTracking.exception(error);
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
                {(account && account.id && account.id == props.board.ownerAccountId) && (
                  <div className="board-card__action-area">
                    <div className="board-card__toggle" onClick={() => setIsOpenActions(!isOpenActions)}>
                      <img alt="設定" title="編集/削除のメニューを開閉をします。" src={settingsIcon} />
                    </div>
                    {isOpenActions && (
                      <ul className="board-card__actions">
                        <li onClick={() => handleEditButtonClick()}>編集</li>
                        <li onClick={() => handleDeleteButtonClick()}>削除</li>
                      </ul>
                    )}
                  </div>
                )}
                <time className="board-card__date">{formatYMD(Dayjs(props.board.createdAt))}</time>
              </div>
              <div
                className="md board-card__body"
                dangerouslySetInnerHTML={convertMarkdownTextToHTML(props.board.body)}
              />
            </div>
          )
          : <CompactLoading />
        }
      </ShadowBox>
    </div>
  );
}

export default BoardCard;
