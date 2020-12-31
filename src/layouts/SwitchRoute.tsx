import React, { ReactElement, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

const SwitchRoute: React.FC = (): ReactElement => {
  const { account } = useContext(AuthenticationContext);

  return (
    <Switch>
      <Route path="/dashboard">
        {!account ? <Redirect to="/" /> : <p>Dashboard</p>}
      </Route>
      <Route path="/">
        {account ? <Redirect to="/dashboard" /> : <p>Home</p>}
      </Route>
    </Switch>
  );
}

export default SwitchRoute;
