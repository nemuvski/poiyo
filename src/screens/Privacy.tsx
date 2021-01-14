import React, {ReactElement, useEffect} from 'react';
import {setDocumentTitle} from "../utilities/DocumentTitle";

const Privacy: React.FC = (): ReactElement => {
  useEffect(() => {
    setDocumentTitle('プライバシーポリシー');
  }, []);

  return (
    <article>
      <h1>プライバシーポリシー</h1>
    </article>
  );
}

export default Privacy;
