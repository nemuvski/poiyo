import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import ScrollToTop from "./layouts/ScrollToTop";

const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Header />
        <Main />
      </AuthenticationProvider>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
