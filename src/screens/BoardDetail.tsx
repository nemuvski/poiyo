import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps, useLocation} from "react-router-dom";
import {setDocumentTitle} from "../utilities/DocumentTitle";
import {Board, BoardLocationState} from "../libs/models/Board";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import BoardsService from "../libs/services/BoardsService";
import FullWideLoading from "../components/FullWideLoading";
import NotFound from "./NotFound";

type Params = {
  bid: string;
}
type Props = RouteComponentProps<Params>;

const BoardDetail: React.FC<Props> = (props: Props) => {
  const location = useLocation<BoardLocationState>();
  const {account} = useContext(AuthenticationContext);
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

  // ここでboardがかわるタイミングで実行される副作用を定義しておくか.

  return (
    <>
      {loading && <FullWideLoading />}
      {board
        ? (
          <div className="page-board-detail">
            <h1>{board.title}</h1>
          </div>
        )
        : <NotFound />
      }
    </>
  );
}

export default BoardDetail;
