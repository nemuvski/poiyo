import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePageTitle } from '~/hooks/usePageTitle'
import ArticleInner from '~/components/ArticleInner'
import ArticleSection from '~/components/ArticleSection'
import BoardForm from '~/components/BoardForm'
import { Board, BoardLocationState } from '~/models/Board'

const EditBoardPage: React.FC = () => {
  usePageTitle('ボード編集')
  const location = useLocation()
  const navigate = useNavigate()
  const [board, setBoard] = useState<Board | undefined>()

  useEffect(() => {
    const state: BoardLocationState | undefined = location.state as BoardLocationState | undefined
    if (state && state.board) {
      setBoard(state.board)
    } else {
      // ボード詳細ページから遷移していないパターンであるため、ダッシュボード画面へ飛ばす.
      navigate('/dashboard', { replace: true })
    }
  }, [location, navigate])

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
