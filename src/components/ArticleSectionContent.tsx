import React from 'react';
import '../styles/components/article-section-content.scss';

type Props = {
  children?: React.ReactNode;
};

const ArticleSectionContent: React.FC<Props> = (props: Props) => {
  return <div className='article-section-content'>{props.children}</div>;
};

export default ArticleSectionContent;
