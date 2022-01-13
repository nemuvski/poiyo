import React from 'react'
import { useRoutes } from 'react-router-dom'
import Layout from '~/layouts/Layout'

const FrontPage = React.lazy(() => import('~/pages/FrontPage'))
const HelpPage = React.lazy(() => import('~/pages/HelpPage'))
const TermsPage = React.lazy(() => import('~/pages/TermsPage'))
const PrivacyPage = React.lazy(() => import('~/pages/PrivacyPage'))
const NotFoundPage = React.lazy(() => import('~/pages/NotFoundPage'))

const AppRouter: React.FC = () => {
  const routeElement = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <FrontPage />,
        },
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
