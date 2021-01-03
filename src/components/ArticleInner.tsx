import React, { ReactElement } from 'react';
import '../styles/components/article-inner.scss';

type Props = {
  children?: React.ReactNode;
}

const ArticleInner: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <div className="article-inner">
      {props.children}
    </div>
  );
}

export default ArticleInner;