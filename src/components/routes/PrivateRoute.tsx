import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAccount } from '~/stores/account/selector'

type Props = {
  redirectPath?: string
}

const PrivateRoute: React.FC<Props> = ({ redirectPath = '/' }) => {
  const account = useSelector(selectAccount)
  return account ? <Outlet /> : <Navigate replace to={redirectPath} />
}

export default PrivateRoute
