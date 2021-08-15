import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccount } from './stores/account/selector';
import Header from './layouts/Header';
import Router from './layouts/Router';
import Footer from './layouts/Footer';
import ScrollToTop from './layouts/ScrollToTop';
import FullWideLoading from './components/FullWideLoading';
import { useFixedScroll } from './hooks/useFixedScroll';
import { useAuth } from './hooks/useAuth';
import Sentry from './libs/Sentry';
import './styles/layouts/main.scss';

const App: React.FC = () => {
  useFixedScroll();
  const { error } = useAuth();
  const account = useSelector(selectAccount);

  useEffect(() => {
    Sentry.configureScope((scope) => {
      scope.setUser({ id: account ? account.id : undefined });
    });
  }, [account]);

  if (error) {
    console.error(error);
  }

  return (
    <BrowserRouter>
      <FullWideLoading />
      <Header />
      <main className='main'>
        <div className='main__inner'>
          <Router />
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
