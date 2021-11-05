import React from 'react'
import '../styles/components/article-inner.scss'

type Props = {
  children?: React.ReactNode
}

const ArticleInner: React.FC<Props> = ({ children }) => {
  return <div className='article-inner'>{children}</div>
}

export default ArticleInner
