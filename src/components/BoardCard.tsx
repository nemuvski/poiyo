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
                  <button type="button" onClick={handleEditButtonClick}>ボードを編集</button>
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
