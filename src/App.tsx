import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './layouts/Header';
import Router from './layouts/Router';
import Footer from './layouts/Footer';
import ScrollToTop from './layouts/ScrollToTop';
import FullWideLoading from './components/FullWideLoading';
import { useModalFixedScroll } from './hooks/useModal';
import { useAuth } from './hooks/useAuth';
import './styles/layouts/main.scss';

const App: React.FC = () => {
  useModalFixedScroll();
  const [isLoading, error] = useAuth();

  if (error) {
    console.error(error);
  }

  return (
    <BrowserRouter>
      {isLoading ? (
        <FullWideLoading />
      ) : (
        <>
          <Header />
          <main className='main'>
            <div className='main__inner'>
              <Router />
            </div>
          </main>
          <ScrollToTop />
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
