import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import BoardList from '../components/BoardList';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import searchIcon from '../assets/icons/search-form.svg';
import boardIcon from '../assets/icons/board-button.svg';
import '../styles/pages/page-dashboard.scss';

const Dashboard: React.FC = () => {
  const { account } = useContext(AuthenticationContext);
  const history = useHistory();

  useEffect(() => {
    setDocumentTitle('ダッシュボード');
  }, []);

  return (
    <div className='page-dashboard'>
      <div className='page-dashboard__links'>
        <button type='button' className='is-black' onClick={() => history.push('/search')}>
          <img
            aria-hidden='true'
            alt='ボード一覧・検索画面に遷移'
            title='ボード一覧・検索画面に遷移します。'
            src={searchIcon}
          />
          ボードを探す
        </button>
        <button type='button' className='is-black' onClick={() => history.push('/create-board')}>
          <img aria-hidden='true' alt='ボード作成画面に遷移' title='ボード作成画面に遷移します。' src={boardIcon} />
          ボードを作る
        </button>
      </div>

      <h2>作成したボード</h2>
      <div className='page-dashboard__board-list'>
        <BoardList accountId={account?.id} />
      </div>
    </div>
  );
};

export default Dashboard;
