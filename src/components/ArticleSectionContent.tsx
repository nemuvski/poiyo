import React from 'react'
import '~/styles/components/article-section-content.scss'

const ArticleSectionContent: React.FC = ({ children }) => {
  return <div className='article-section-content'>{children}</div>
}

export default ArticleSectionContent
