import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccount } from '~/stores/account/selector'
import { firebaseSignIn } from '~/utilities/FirebaseAuth'
import NavigationActions from '~/layouts/NavigationActions'

const Navigation: React.FC = () => {
  const account = useSelector(selectAccount)

  return (
    <nav role='navigation' aria-label='header-navigation' className='navigation'>
      {account ? <NavigationActions /> : <button onClick={() => firebaseSignIn()}>サインイン</button>}
    </nav>
  )
}

export default Navigation
