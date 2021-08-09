import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import Header from './layouts/Header';
import Router from './layouts/Router';
import Footer from './layouts/Footer';
import ScrollToTop from './layouts/ScrollToTop';
import './styles/layouts/main.scss';

const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Header />
        <main className='main'>
          <div className='main__inner'>
            <Router />
          </div>
        </main>
      </AuthenticationProvider>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
