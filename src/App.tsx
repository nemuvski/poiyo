import React from 'react'
import { useChangeLocation } from '~/hooks/useChangeLocation'
import Header from '~/layouts/Header'
import Router from '~/components/routes/Router'
import Footer from '~/layouts/Footer'
import ScrollToTop from '~/layouts/ScrollToTop'
import FullWideLoading from '~/components/FullWideLoading'
import { useFixedScroll } from '~/hooks/useFixedScroll'
import { useAuth } from '~/hooks/useAuth'
import { useSetUpSentry } from '~/hooks/useSetUpSentry'
import '~/styles/layouts/main.scss'

const App: React.FC = () => {
  useFixedScroll()
  useAuth()
  useSetUpSentry()
  // パスが変わった時、スクロール位置を先頭にする
  useChangeLocation(() => window.scrollTo(0, 0))

  return (
    <>
      <FullWideLoading />
      <Header />
      <main className='main'>
        <div className='main__inner'>
          <Router />
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  )
}

export default App
