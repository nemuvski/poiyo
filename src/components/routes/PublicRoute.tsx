import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAccount } from '~/stores/account/selector'

type Props = {
  redirectPath?: string
}

const PublicRoute: React.FC<Props> = ({ redirectPath = '/dashboard', children }) => {
  const account = useSelector(selectAccount)
  return account ? <Navigate replace to={redirectPath} /> : <>{children}</>
}

export default PublicRoute
