import React from 'react'
import { usePageTitle } from '~/hooks/usePageTitle'
import ArticleInner from '~/components/ArticleInner'
import ArticleSection from '~/components/ArticleSection'
import BoardForm from '~/components/BoardForm'
import '~/styles/pages/page-create-board.scss'

const CreateBoardPage: React.FC = () => {
  usePageTitle('ボード作成')

  return (
    <ArticleInner>
      <div className='page-create-board'>
        <h1>ボード作成</h1>
        <ArticleSection wider={true}>
          <p className='page-create-board__description'>話題にしたいことを記入して、ボードを作成しましょう。</p>
          <BoardForm />
        </ArticleSection>
      </div>
    </ArticleInner>
  )
}

export default CreateBoardPage
