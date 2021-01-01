import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import { showLoading } from './utilities/loading';

// 最初にLoadingを表示しておく.
showLoading();

const App: React.FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <AuthenticationProvider>
          <Header />
          <Main />
        </AuthenticationProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
