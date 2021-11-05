import React from 'react'
import '~/styles/components/article-inner.scss'

const ArticleInner: React.FC = ({ children }) => {
  return <div className='article-inner'>{children}</div>
}

export default ArticleInner
