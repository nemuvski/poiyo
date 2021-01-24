import React, {ReactElement, useEffect} from 'react';
import {setDocumentTitle} from "../utilities/DocumentTitle";

const Search: React.FC = (): ReactElement => {
  useEffect(() => {
    setDocumentTitle('ボードを探す');
  }, []);

  return (
    <div className="page-search">
      TEST
    </div>
  );
}

export default Search;
