import React from 'react';
import '../styles/components/article-section.scss';

type Props = {
  children?: React.ReactNode;
}

const ArticleSection: React.FC<Props> = (props: Props) => {
  return (
    <div className="article-section">
      {props.children}
    </div>
  );
}

export default ArticleSection;
