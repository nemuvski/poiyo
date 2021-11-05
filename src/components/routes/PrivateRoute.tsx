import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAccount } from '~/stores/account/selector'

type Props = {
  redirectPath?: string
}

const PrivateRoute: React.FC<Props> = ({ redirectPath = '/', children }) => {
  const account = useSelector(selectAccount)
  return account ? <>{children}</> : <Navigate replace to={redirectPath} />
}

export default PrivateRoute
