import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import Front from '../screens/Front';
import CreateBoard from "../screens/CreateBoard";
import Terms from '../screens/Terms';
import Privacy from '../screens/Privacy';
import SignOut from "../screens/SignOut";
import NotFound from "../screens/NotFound";
import '../styles/layouts/main.scss';
import BoardDetail from "../screens/BoardDetail";
import Search from "../screens/Search";

const Main: React.FC = () => {
  const { account } = useContext(AuthenticationContext);

  return (
    <main className="main">
      <div className="main__inner">
        <Switch>
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/sign-out" component={SignOut} />
          <Route exact path="/search" render={() => !account
            ? <Redirect to="/" />
            : <Search />
          } />
          <Route exact path="/create-board" render={() => !account
            ? <Redirect to="/" />
            : <CreateBoard />
          } />
          <Route exact path="/dashboard" render={() => !account
            ? <Redirect to="/" />
            : <p>Dashboard</p>
          } />
          <Route path="/board/:bid" render={props => !account
            ? <Redirect to="/" />
            : <BoardDetail {...props} />
          }/>
          <Route exact path="/" render={() => account
            ? <Redirect to="/dashboard" />
            : <Front />
          } />
          <Route component={NotFound} />
        </Switch>
      </div>
    </main>
  );
}

export default Main;
