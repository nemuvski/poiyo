import React, {useEffect, useState} from 'react';
import {RouteComponentProps, useLocation} from "react-router-dom";
import {setDocumentTitle} from "../utilities/DocumentTitle";
import {BoardLocationState} from "../libs/models/Board";
import FullWideLoading from "../components/FullWideLoading";

type Params = {
  bid: string;
}
type Props = RouteComponentProps<Params>;

const BoardDetail: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation<BoardLocationState>();

  useEffect(() => {
    setDocumentTitle('ボード');

    const boardId = props.match.params.bid;
    let board = null;

    // 表示するボード情報を取得.
    if (location.state && location.state.board) {
      board = location.state.board;
      console.log(board);
      setLoading(false);
    }
    // ボードがLocationStateで渡ってきていない場合はパスのボードIDでボード情報を取得.
    else if (boardId) {
      // 処理.
      console.log(boardId);
    }
    // パスにボードIDがなければ、404ページへ飛ばす. (?)
    else {
      // 処理.
    }
  }, []);

  return (
    <div className="page-board-detail">
      {loading
        ? <FullWideLoading />
        : <h1>ボード</h1>
      }
    </div>
  );
}

export default BoardDetail;
