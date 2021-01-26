import React, {useEffect} from 'react';
import {setDocumentTitle} from "../utilities/DocumentTitle";

const Search: React.FC = () => {
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
