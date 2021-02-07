import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps, useLocation} from "react-router-dom";
import {setDocumentTitle} from "../utilities/DocumentTitle";
import {Board, BoardLocationState} from "../libs/models/Board";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import BoardsService from "../libs/services/BoardsService";
import FullWideLoading from "../components/FullWideLoading";
import NotFound from "./NotFound";
import '../styles/screens/page-board-detail.scss';
import BoardCard from "../components/BoardCard";
import Modal from "../components/Modal";
import {ModalContext} from "../contexts/ModalContext";
import commentIcon from "../assets/icons/comment.svg";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

type Params = {
  bid: string;
}
type Props = RouteComponentProps<Params>;

const BoardDetail: React.FC<Props> = (props: Props) => {
  const location = useLocation<BoardLocationState>();
  const {account} = useContext(AuthenticationContext);
  const {openModal} = useContext(ModalContext);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    setDocumentTitle('ボード');

    // ボード情報を取得する処理.
    const fetchBoard = async (boardId: string) => {
      try {
        if (account && account.id) {
          const boardData = await BoardsService.getSingle(account.token, boardId);
          if (boardData) {
            setBoard(boardData);
          }
        }
      } catch (error) {
        console.error('ボード情報の取得に失敗しました。');
        console.error(error);
      }
    }

    // 表示するボード情報を取得.
    if (location.state && location.state.board) {
      setBoard(location.state.board);
      setLoading(false);
    }
    // ボードがLocationStateで渡ってきていない場合はパスのボードIDでボード情報を取得.
    else if (props.match.params && props.match.params.bid) {
      // 関数側でboardはセットされる.
      fetchBoard(props.match.params.bid).finally(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className="page-board-detail">
      {loading && <FullWideLoading />}
      {board
        ? (
          <>
            <div className="page-board-detail__inner">
              <div className="page-board-detail__card">
                <BoardCard board={board} />
              </div>
              <div className="page-board-detail__comment-list">
                <button
                  type="button"
                  className="page-board-detail__comment-button is-black"
                  onClick={() => openModal()}
                >
                  <img aria-hidden="true" alt="コメント" title="コメントのフォームを開きます。" src={commentIcon} />
                  ボードにコメントする
                </button>

                <CommentList board={board} />
              </div>
            </div>

            <button
              type="button"
              className="page-board-detail__fixed-comment-button is-black"
              onClick={() => openModal()}
            >
              <img aria-hidden="true" alt="コメント" title="コメントのフォームを開きます。" src={commentIcon} />
            </button>

            <Modal>
              <CommentForm
                board={board}
                afterCreated={(comment) => {
                  console.log(comment);
                }}
                afterUpdated={(comment) => {
                  console.log(comment);
                }}
              />
            </Modal>
          </>
        )
        : <NotFound />
      }
    </div>
  );
}

export default BoardDetail;
