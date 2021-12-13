import React from 'react'
import { useSelector } from 'react-redux'
import { selectFullWideLoading } from '~/stores/fullWideLoading/selector'
import AppRouter from '~/components/routes/AppRouter'
import FullWideLoading from '~/components/FullWideLoading'
import { useChangeLocation } from '~/hooks/useChangeLocation'
import { useFixedScroll } from '~/hooks/useFixedScroll'
import { useAuth } from '~/hooks/useAuth'
import { useSetUpSentry } from '~/hooks/useSetUpSentry'

const App: React.FC = () => {
  useFixedScroll()
  useAuth()
  useSetUpSentry()
  // パスが変わった時、スクロール位置を先頭にする
  useChangeLocation(() => window.scrollTo(0, 0))

  const isLoading = useSelector(selectFullWideLoading)
  if (isLoading) {
    return <FullWideLoading />
  }

  return (
    <React.Suspense fallback={<FullWideLoading />}>
      <AppRouter />
    </React.Suspense>
  )
}

export default App
