import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import SwitchRoute from './layouts/SwitchRoute';

const App: React.FC = (): ReactElement => {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Header />
        <Main>
          <SwitchRoute />
        </Main>
        <Footer />
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
