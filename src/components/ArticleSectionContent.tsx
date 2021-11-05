import React from 'react'
import '~/styles/components/article-section-content.scss'

type Props = {
  children?: React.ReactNode
}

const ArticleSectionContent: React.FC<Props> = ({ children }) => {
  return <div className='article-section-content'>{children}</div>
}

export default ArticleSectionContent
