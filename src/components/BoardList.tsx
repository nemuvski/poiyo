import React, { useEffect, useState } from 'react'
import { Board, buildBoardQueryParams } from '~/models/Board'
import BoardItem from '~/components/BoardItem'
import CompactLoading from '~/components/CompactLoading'
import SentryTracking from '~/utilities/SentryTracking'
import notFound from '~/assets/not-found.svg'
import { useGetBoardsLazyQuery } from '~/stores/board/api'
import '~/styles/components/board-list.scss'

type Props = {
  keyword?: string
  accountId?: string
}

const BoardList: React.FC<Props> = ({ accountId, keyword }) => {
  const [getBoardsTrigger, { data: fetchedData, isLoading, isFetching, error }] = useGetBoardsLazyQuery()
  const [boardList, setBoardList] = useState<Array<Board> | null>(null)
  const [nextPage, setNextPage] = useState(-1)
  const [clickedMoreButton, setClickedMoreButton] = useState(false)

  // 初期表示、または引数のkeyword, accountIdが変わった時の処理
  useEffect(() => {
    setBoardList(null)
    getBoardsTrigger(buildBoardQueryParams(1, accountId, keyword))
  }, [keyword, accountId, getBoardsTrigger])

  // ボード取得時にエラーが発生した場合の処理
  useEffect(() => {
    if (error) {
      setBoardList(null)
      setNextPage(-1)
      SentryTracking.exception('ボードデータの取得時にエラーが発生しました。')
    }
  }, [error])

  // 取得したデータが変わった時の処理
  useEffect(() => {
    if (fetchedData) {
      setBoardList(boardList && clickedMoreButton ? boardList.concat(fetchedData.items) : fetchedData.items)
      setNextPage(fetchedData.nextPage ?? -1)
      setClickedMoreButton(false)
    }
  }, [fetchedData, boardList, clickedMoreButton])

  return (
    <div className='board-list'>
      {boardList &&
        (boardList.length === 0 ? (
          <p className='board-list__not-found'>
            <img alt='何も見つかりませんでした。' src={notFound} />
            ボードが見つかりませんでした。
          </p>
        ) : (
          boardList.map((board) => {
            return <BoardItem key={board.boardId} board={board} />
          })
        ))}
      {(isLoading || isFetching) && <CompactLoading />}
      {boardList && nextPage > 0 && (
        <div className='board-list__more'>
          <button
            type='button'
            disabled={isFetching}
            onClick={() => {
              setClickedMoreButton(true)
              getBoardsTrigger(buildBoardQueryParams(nextPage, accountId, keyword))
            }}
          >
            さらにボードを読み込む
          </button>
        </div>
      )}
    </div>
  )
}

export default BoardList
