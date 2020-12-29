import React, { ReactElement } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = (): ReactElement => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
