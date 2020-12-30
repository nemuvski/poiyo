import React, { ReactElement } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

const App: React.FC = (): ReactElement => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
