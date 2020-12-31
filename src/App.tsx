import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './contexts/LoadingContext';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

const App: React.FC = (): ReactElement => {
  return (
    <AuthenticationProvider>
      <LoadingProvider>
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </LoadingProvider>
    </AuthenticationProvider>
  );
}

export default App;
