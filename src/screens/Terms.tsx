import React, {useEffect} from 'react';
import {setDocumentTitle} from "../utilities/DocumentTitle";

const Terms: React.FC = () => {
  useEffect(() => {
    setDocumentTitle('利用規約');
  }, []);

  return (
    <article>
      <h1>利用規約</h1>
    </article>
  );
}

export default Terms;
