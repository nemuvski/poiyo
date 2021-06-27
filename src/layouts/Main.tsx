import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import Front from '../screens/Front';
import CreateBoard from '../screens/CreateBoard';
import Terms from '../screens/Terms';
import Privacy from '../screens/Privacy';
import SignOut from '../screens/SignOut';
import NotFound from '../screens/NotFound';
import '../styles/layouts/main.scss';
import BoardDetail from '../screens/BoardDetail';
import Search from '../screens/Search';
import EditBoard from '../screens/EditBoard';
import { ModalProvider } from '../contexts/ModalContext';
import { CommentListProvider } from '../contexts/CommentListContext';
import Dashboard from '../screens/Dashboard';
import Help from '../screens/Help';
import AnalyticsTracking from '../utilities/AnalyticsTracking';

const Main: React.FC = () => {
  const { account } = useContext(AuthenticationContext);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = history.listen(() => {
      // パスが変わったらスクロール位置を先頭にする.
      window.scrollTo(0, 0);
      AnalyticsTracking.screenView(window.location.pathname);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className='main'>
      <div className='main__inner'>
        <ModalProvider>
          <Switch>
            <Route exact path='/help' component={Help} />
            <Route exact path='/terms' component={Terms} />
            <Route exact path='/privacy' component={Privacy} />
            <Route exact path='/sign-out' component={SignOut} />
            <Route exact path='/search' render={() => (!account ? <Redirect to='/' /> : <Search />)} />
            <Route exact path='/create-board' render={() => (!account ? <Redirect to='/' /> : <CreateBoard />)} />
            <Route exact path='/edit-board' render={() => (!account ? <Redirect to='/' /> : <EditBoard />)} />
            <Route exact path='/dashboard' render={() => (!account ? <Redirect to='/' /> : <Dashboard />)} />
            <Route
              path='/board/:bid'
              render={(props) =>
                !account ? (
                  <Redirect to='/' />
                ) : (
                  <CommentListProvider>
                    <BoardDetail {...props} />
                  </CommentListProvider>
                )
              }
            />
            <Route exact path='/' render={() => (account ? <Redirect to='/dashboard' /> : <Front />)} />
            <Route component={NotFound} />
          </Switch>
        </ModalProvider>
      </div>
    </main>
  );
};

export default Main;
