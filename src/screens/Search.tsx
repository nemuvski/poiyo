import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {setDocumentTitle} from "../utilities/DocumentTitle";
import BoardsService from "../libs/services/BoardsService";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import {Boards} from "../libs/models/Board";
import BoardList from "../components/BoardList";
import searchIcon from '../assets/icons/search-form.svg';

type SearchFormFields = {
  keyword: string;
};

const Search: React.FC = () => {
  const {
    handleSubmit,
    formState,
  } = useForm();
  const { account } = useContext(AuthenticationContext);
  const [resource, setResource] = useState<Boards | null>(null);

  const getBoards = async (keyword: string, page = 1) => {
    try {
      if (!(account && account.token)) {
        console.error('アカウント情報がないため、検索できませんでした。');
        return;
      }
      const responseBoards = await BoardsService.getByKeyword(account.token, keyword, page);
      setResource(responseBoards);
    } catch(error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: SearchFormFields) => {
    console.log(data);
    await getBoards(data.keyword);
  };

  useEffect(() => {
    setDocumentTitle('ボードを探す');

    // コンポーネントがアンマウントされた後に実行されることを防ぐためのフラグ.
    let unmounted = false;
    const initResource = async () => {
      // 初期化処理は空文字(つまり、キーワード制限なし)で取得する.
      if (!unmounted) {
        await getBoards('');
      }
    };
    initResource();
    return () => {
      unmounted = true;
    };
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
      <BoardList resource={resource} />
    </div>
  );
}

export default Search;
