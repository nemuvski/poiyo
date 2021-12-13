import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAccount } from '~/stores/account/selector'

type Props = {
  redirectPath?: string
}

const PublicRoute: React.FC<Props> = ({ redirectPath = '/dashboard' }) => {
  const account = useSelector(selectAccount)
  return account ? <Navigate replace to={redirectPath} /> : <Outlet />
}

export default PublicRoute
