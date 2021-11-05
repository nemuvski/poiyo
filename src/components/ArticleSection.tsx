import React from 'react'
import clsx from 'clsx'
import '~/styles/components/article-section.scss'

type Props = {
  children?: React.ReactNode
  wider?: boolean
}

const ArticleSection: React.FC<Props> = (props: Props) => {
  return <div className={clsx(['article-section', { 'is-wider': props.wider }])}>{props.children}</div>
}

export default ArticleSection
