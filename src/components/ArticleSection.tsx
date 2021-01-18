import React, { ReactElement } from 'react';
import '../styles/components/article-section.scss';

type Props = {
  children?: React.ReactNode;
}

const ArticleSection: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <div className="article-section">
      {props.children}
    </div>
  );
}

export default ArticleSection;
