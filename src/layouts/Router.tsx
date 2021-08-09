import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { ModalProvider } from '../contexts/ModalContext';
import { CommentListProvider } from '../contexts/CommentListContext';
import Front from '../pages/Front';
import CreateBoard from '../pages/CreateBoard';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import SignOut from '../pages/SignOut';
import NotFound from '../pages/NotFound';
import BoardDetail from '../pages/BoardDetail';
import Search from '../pages/Search';
import EditBoard from '../pages/EditBoard';
import Dashboard from '../pages/Dashboard';
import Help from '../pages/Help';

const Router: React.FC = () => {
  const { account } = useContext(AuthenticationContext);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = history.listen(() => {
      // パスが変わったらスクロール位置を先頭にする.
      window.scrollTo(0, 0);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
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
  );
};

export default Router;
