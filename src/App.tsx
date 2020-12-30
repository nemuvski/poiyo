import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <Switch>
          <Route path="/enter">
            <p>Enter</p>
          </Route>
          <Route path="/">
            <p>Home</p>
          </Route>
        </Switch>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
