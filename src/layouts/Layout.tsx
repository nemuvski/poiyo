import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/layouts/Header'
import ScrollToTop from '~/layouts/ScrollToTop'
import Footer from '~/layouts/Footer'
import '~/styles/layouts/main.scss'

const Layout: React.FC = () => (
  <>
    <Header />
    <main className='main'>
      <div className='main__inner'>
        <Outlet />
      </div>
    </main>
    <ScrollToTop />
    <Footer />
  </>
)

export default Layout
