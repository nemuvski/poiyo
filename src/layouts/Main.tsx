import React, { useContext, ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import Front from '../screens/Front';
import CreateBoard from "../screens/CreateBoard";
import Terms from '../screens/Terms';
import Privacy from '../screens/Privacy';
import SignOut from "../screens/SignOut";
import NotFound from "../screens/NotFound";
import '../styles/layouts/main.scss';

const Main: React.FC = (): ReactElement => {
  const { account } = useContext(AuthenticationContext);

  return (
    <main className="main">
      <div className="main__inner">
        <Switch>
          <Route exact path="/create-board"><CreateBoard /></Route>
          <Route exact path="/dashboard">
            {!account ? <Redirect to="/" /> : <p>Dashboard</p>}
          </Route>
          <Route exact path="/terms"><Terms /></Route>
          <Route exact path="/privacy"><Privacy /></Route>
          <Route exact path="/sign-out"><SignOut /></Route>
          <Route exact path="/">
            {account ? <Redirect to="/dashboard" /> : <Front />}
          </Route>
          <Route><NotFound /></Route>
        </Switch>
      </div>
    </main>
  );
}

export default Main;
