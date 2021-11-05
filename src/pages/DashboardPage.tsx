import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '~/hooks/usePageTitle'
import BoardList from '~/components/BoardList'
import searchIcon from '~/assets/icons/search-form.svg'
import boardIcon from '~/assets/icons/board-button.svg'
import { selectAccount } from '~/stores/account/selector'
import '~/styles/pages/page-dashboard.scss'

const DashboardPage: React.FC = () => {
  usePageTitle('ダッシュボード')
  const account = useSelector(selectAccount)
  const navigate = useNavigate()

  return (
    <div className='page-dashboard'>
      <div className='page-dashboard__links'>
        <button type='button' className='is-black' onClick={() => navigate('/search')}>
          <img
            aria-hidden='true'
            alt='ボード一覧・検索画面に遷移'
            title='ボード一覧・検索画面に遷移します。'
            src={searchIcon}
          />
          ボードを探す
        </button>
        <button type='button' className='is-black' onClick={() => navigate('/create-board')}>
          <img aria-hidden='true' alt='ボード作成画面に遷移' title='ボード作成画面に遷移します。' src={boardIcon} />
          ボードを作る
        </button>
      </div>

      <h2>作成したボード</h2>
      <div className='page-dashboard__board-list'>
        <BoardList accountId={account?.id} />
      </div>
    </div>
  )
}

export default DashboardPage
