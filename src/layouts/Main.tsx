import React, { useContext, ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import '../styles/layouts/main.scss';

const Main: React.FC = (): ReactElement => {
  const { account } = useContext(AuthenticationContext);

  return (
    <main className="main">
      <div className="main__inner">
        <Switch>
          <Route path="/dashboard">
            {!account ? <Redirect to="/" /> : <p>Dashboard</p>}
          </Route>
          <Route path="/">
            {account ? <Redirect to="/dashboard" /> : <p>Home</p>}
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default Main;
