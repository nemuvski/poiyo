import React, {useContext} from 'react';
import {Board} from "../libs/models/Board";
import Dayjs, {formatYMD} from '../libs/common/Dayjs';
import '../styles/components/board-item.scss';
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import CompactLoading from "./CompactLoading";
import '../styles/components/board-card.scss';
import ShadowBox from "./ShadowBox";

type Props = {
  board: Board | null;
};

const BoardCard: React.FC<Props> = (props: Props) => {
  const { account } = useContext(AuthenticationContext);
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
              <div className="board-card__body">{props.board.body}</div>

              {(account && account.id && account.id == props.board.ownerAccountId) && (
                <div className="board-card__actions">
                  <button type="button">ボードを編集</button>
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
