import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {setDocumentTitle} from "../utilities/DocumentTitle";
import BoardList from "../components/BoardList";
import searchIcon from '../assets/icons/search-form.svg';
import '../styles/screens/page-search.scss';
import AnalyticsTracking from "../utilities/AnalyticsTracking";

type SearchFormFields = {
  keyword: string;
};

const Search: React.FC = () => {
  const {
    handleSubmit,
    formState,
    register,
  } = useForm();

  const [keyword, setKeyword] = useState('');

  const onSubmit = (data: SearchFormFields) => {
    setKeyword(data.keyword);
    AnalyticsTracking.search(data.keyword);
  };

  useEffect(() => {
    setDocumentTitle('ボードを探す');
  }, []);

  return (
    <div className="page-search">
      <form
        className="page-search__form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          name="keyword"
          maxLength={200}
          tabIndex={0}
          ref={register()}
          placeholder="ボードのタイトルで探す"
          className="page-search__form-keyword"
        />
        <button
          type="submit"
          className="page-search__form-submit is-black"
          disabled={formState.isSubmitting}
        >
          <img src={searchIcon} alt="検索" />
        </button>
      </form>

      <BoardList keyword={keyword} />
    </div>
  );
}

export default Search;
