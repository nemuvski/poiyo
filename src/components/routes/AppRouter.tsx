import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import Layout from '~/layouts/Layout'
import PublicRoute from '~/components/routes/PublicRoute'
import PrivateRoute from '~/components/routes/PrivateRoute'

// Public
const FrontPage = React.lazy(() => import('~/pages/FrontPage'))
// Private
const DashboardPage = React.lazy(() => import('~/pages/DashboardPage'))
const SignOutPage = React.lazy(() => import('~/pages/SignOutPage'))
const SearchPage = React.lazy(() => import('~/pages/SearchPage'))
const CreateBoardPage = React.lazy(() => import('~/pages/CreateBoardPage'))
const BoardDetailPage = React.lazy(() => import('~/pages/BoardDetailPage'))
const EditBoardPage = React.lazy(() => import('~/pages/EditBoardPage'))
// Common
const HelpPage = React.lazy(() => import('~/pages/HelpPage'))
const TermsPage = React.lazy(() => import('~/pages/TermsPage'))
const PrivacyPage = React.lazy(() => import('~/pages/PrivacyPage'))
const NotFoundPage = React.lazy(() => import('~/pages/NotFoundPage'))

const publicRoute: RouteObject = {
  element: <PublicRoute />,
  children: [
    {
      path: '/',
      element: <FrontPage />,
    },
  ],
}

const privateRoute: RouteObject = {
  element: <PrivateRoute />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardPage />,
    },
    {
      path: '/sign-out',
      element: <SignOutPage />,
    },
    {
      path: '/search',
      element: <SearchPage />,
    },
    {
      path: '/create-board',
      element: <CreateBoardPage />,
    },
    {
      path: '/board/:bid',
      element: <BoardDetailPage />,
    },
    {
      path: '/edit-board',
      element: <EditBoardPage />,
    },
  ],
}

const AppRouter: React.FC = () => {
  const routeElement = useRoutes([
    {
      element: <Layout />,
      children: [
        publicRoute,
        privateRoute,
        {
          path: '/help',
          element: <HelpPage />,
        },
        {
          path: '/terms',
          element: <TermsPage />,
        },
        {
          path: '/privacy',
          element: <PrivacyPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ])

  return <>{routeElement}</>
}

export default AppRouter
