import React from 'react'
import clsx from 'clsx'
import '~/styles/components/article-section.scss'

type Props = {
  wider?: boolean
}

const ArticleSection: React.FC<Props> = ({ wider, children }) => {
  return <div className={clsx(['article-section', { 'is-wider': wider }])}>{children}</div>
}

export default ArticleSection
