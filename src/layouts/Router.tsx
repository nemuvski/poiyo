import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { ModalProvider } from '../contexts/ModalContext';
import { CommentListProvider } from '../contexts/CommentListContext';
import FrontPage from '../pages/FrontPage';
import CreateBoardPage from '../pages/CreateBoardPage';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';
import SignOutPage from '../pages/SignOutPage';
import NotFoundPage from '../pages/NotFoundPage';
import BoardDetailPage from '../pages/BoardDetailPage';
import SearchPage from '../pages/SearchPage';
import EditBoardPage from '../pages/EditBoardPage';
import DashboardPage from '../pages/DashboardPage';
import HelpPage from '../pages/HelpPage';

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
        <Route exact path='/help' component={HelpPage} />
        <Route exact path='/terms' component={TermsPage} />
        <Route exact path='/privacy' component={PrivacyPage} />
        <Route exact path='/sign-out' component={SignOutPage} />
        <Route exact path='/search' render={() => (!account ? <Redirect to='/' /> : <SearchPage />)} />
        <Route exact path='/create-board' render={() => (!account ? <Redirect to='/' /> : <CreateBoardPage />)} />
        <Route exact path='/edit-board' render={() => (!account ? <Redirect to='/' /> : <EditBoardPage />)} />
        <Route exact path='/dashboard' render={() => (!account ? <Redirect to='/' /> : <DashboardPage />)} />
        <Route
          path='/board/:bid'
          render={(props) =>
            !account ? (
              <Redirect to='/' />
            ) : (
              <CommentListProvider>
                <BoardDetailPage {...props} />
              </CommentListProvider>
            )
          }
        />
        <Route exact path='/' render={() => (account ? <Redirect to='/dashboard' /> : <FrontPage />)} />
        <Route component={NotFoundPage} />
      </Switch>
    </ModalProvider>
  );
};

export default Router;
