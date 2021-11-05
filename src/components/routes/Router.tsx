import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FrontPage from '~/pages/FrontPage'
import CreateBoardPage from '~/pages/CreateBoardPage'
import TermsPage from '~/pages/TermsPage'
import PrivacyPage from '~/pages/PrivacyPage'
import SignOutPage from '~/pages/SignOutPage'
import NotFoundPage from '~/pages/NotFoundPage'
import BoardDetailPage from '~/pages/BoardDetailPage'
import SearchPage from '~/pages/SearchPage'
import EditBoardPage from '~/pages/EditBoardPage'
import DashboardPage from '~/pages/DashboardPage'
import HelpPage from '~/pages/HelpPage'
import PublicRoute from '~/components/routes/PublicRoute'
import PrivateRoute from '~/components/routes/PrivateRoute'

const Router: React.FC = () => (
  <Routes>
    <Route
      path='/'
      element={
        <PublicRoute>
          <FrontPage />
        </PublicRoute>
      }
    />
    <Route
      path='/dashboard'
      element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
    />
    <Route
      path='/sign-out'
      element={
        <PrivateRoute>
          <SignOutPage />
        </PrivateRoute>
      }
    />
    <Route
      path='/search'
      element={
        <PrivateRoute>
          <SearchPage />
        </PrivateRoute>
      }
    />
    <Route
      path='/create-board'
      element={
        <PrivateRoute>
          <CreateBoardPage />
        </PrivateRoute>
      }
    />
    <Route
      path='/board/:bid'
      element={
        <PrivateRoute>
          <BoardDetailPage />
        </PrivateRoute>
      }
    />
    <Route
      path='/edit-board'
      element={
        <PrivateRoute>
          <EditBoardPage />
        </PrivateRoute>
      }
    />
    <Route path='/help' element={<HelpPage />} />
    <Route path='/terms' element={<TermsPage />} />
    <Route path='/privacy' element={<PrivacyPage />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
)

export default Router
