import React, { useEffect } from 'react'
import { setDocumentTitle } from '../utilities/DocumentTitle'
import { useHistory } from 'react-router-dom'
import ArticleInner from '../components/ArticleInner'
import notFound from '../assets/not-found.svg'
import { useSelector } from 'react-redux'
import { selectAccount } from '../stores/account/selector'
import '../styles/pages/page-not-found.scss'

const NotFoundPage: React.FC = () => {
  const account = useSelector(selectAccount)
  const history = useHistory()

  useEffect(() => {
    setDocumentTitle('ページが見つかりません')
  }, [])

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
          <button type='button' onClick={() => history.replace(!account ? '/' : '/dashboard')}>
            {!account ? 'トップページへ' : 'ダッシュボードへ'}
          </button>
        </p>
      </ArticleInner>
    </div>
  )
}

export default NotFoundPage
