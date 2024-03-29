import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import searchIcon from '~/assets/icons/search.svg'
import '~/styles/layouts/navigation-actions.scss'
import { useChangeLocation } from '~/hooks/useChangeLocation'

const NavigationActions: React.FC = () => {
  const [open, setOpen] = useState(false)
  // パスが変わったときに、メニューを閉じる
  useChangeLocation(() => setOpen(false))

  const actions = [
    { link: '/dashboard', label: 'ダッシュボード', icon: 'dashboard' },
    { link: '/create-board', label: 'ボード作成', icon: 'board' },
    { link: '/sign-out', label: 'サインアウト', icon: 'sign-out' },
  ]

  return (
    <div className='navigation-actions'>
      <Link to='/search' className='navigation-actions__search'>
        <img alt='ボードを探す' title='ボードを探す' src={searchIcon} />
      </Link>

      <div className='navigation-actions__container'>
        <div
          aria-label='アクションメニューの開閉'
          aria-hidden='true'
          onClick={() => setOpen(!open)}
          className={clsx(['navigation-actions__toggle', { 'is-open': open }])}
        >
          <span />
          <span />
          <span />
        </div>
        {open && (
          <ul className='navigation-actions__items'>
            {actions.map((action) => {
              return (
                <li key={action.icon} className='navigation-actions__item'>
                  <Link
                    to={action.link}
                    className={clsx(['navigation-actions__item-link', `navigation-actions__item-link--${action.icon}`])}
                  >
                    {action.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default NavigationActions
