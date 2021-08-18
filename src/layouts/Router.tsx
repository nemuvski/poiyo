import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';

const Router: React.FC = () => {
  const history = useHistory();
  const account = useSelector(selectAccount);

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
    <Switch>
      <Route exact path='/help' component={HelpPage} />
      <Route exact path='/terms' component={TermsPage} />
      <Route exact path='/privacy' component={PrivacyPage} />
      <Route exact path='/sign-out' render={() => (!account ? <Redirect to='/' /> : <SignOutPage />)} />
      <Route exact path='/search' render={() => (!account ? <Redirect to='/' /> : <SearchPage />)} />
      <Route exact path='/create-board' render={() => (!account ? <Redirect to='/' /> : <CreateBoardPage />)} />
      <Route exact path='/edit-board' render={() => (!account ? <Redirect to='/' /> : <EditBoardPage />)} />
      <Route exact path='/dashboard' render={() => (!account ? <Redirect to='/' /> : <DashboardPage />)} />
      <Route path='/board/:bid' render={() => (!account ? <Redirect to='/' /> : <BoardDetailPage />)} />
      <Route exact path='/' render={() => (account ? <Redirect to='/dashboard' /> : <FrontPage />)} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Router;
