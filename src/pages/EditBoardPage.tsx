import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { setDocumentTitle } from '~/utilities/DocumentTitle'
import ArticleInner from '~/components/ArticleInner'
import ArticleSection from '~/components/ArticleSection'
import BoardForm from '~/components/BoardForm'
import { Board, BoardLocationState } from '~/models/Board'

const EditBoardPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [board, setBoard] = useState<Board | undefined>()

  useEffect(() => {
    setDocumentTitle('ボード編集')

    const state: BoardLocationState | undefined = location.state
    if (state && state.board) {
      setBoard(location.state.board)
    } else {
      // ボード詳細ページから遷移していないパターンであるため、ダッシュボード画面へ飛ばす.
      navigate('/dashboard', { replace: true })
    }
  }, [])

  return (
    <ArticleInner>
      <div className='page-edit-board'>
        <h1>ボード編集</h1>
        <ArticleSection wider={true}>
          <BoardForm board={board} />
        </ArticleSection>
      </div>
    </ArticleInner>
  )
}

export default EditBoardPage
