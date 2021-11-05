import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '~/hooks/usePageTitle'
import ArticleInner from '~/components/ArticleInner'
import notFound from '~/assets/not-found.svg'
import { selectAccount } from '~/stores/account/selector'
import '~/styles/pages/page-not-found.scss'

const NotFoundPage: React.FC = () => {
  usePageTitle('ページが見つかりません')
  const navigate = useNavigate()
  const account = useSelector(selectAccount)

  return (
    <div className='page-not-found'>
      <ArticleInner>
        <h1>お探しのものが見つかりませんでした。</h1>
        <p className='page-not-found__container'>
          <img className='page-not-found__image' alt='何も見つかりませんでした。' src={notFound} />
        </p>
        <p className='page-not-found__container'>
          探してみましたが、見つかりませんでした。
          <br />
          一時的にアクセスできない状況か、移動もしくは削除された可能性があります。
        </p>
        <p className='page-not-found__container'>
          <button type='button' onClick={() => navigate(!account ? '/' : '/dashboard', { replace: true })}>
            {!account ? 'トップページへ' : 'ダッシュボードへ'}
          </button>
        </p>
      </ArticleInner>
    </div>
  )
}

export default NotFoundPage
