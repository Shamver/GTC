import React, { useEffect, lazy, memo } from 'react';
import { Route, Switch } from 'react-router';
import { observer } from 'mobx-react';
import Contents from '../../Content';
import useStores from '../../../stores/useStores';
import AuthRouter from './AuthRouter';
import Router from './Router';

const Home = lazy(() => import('../../Content/Home'));
const Posting = lazy(() => import('../../Content/Board/Posting'));

const SwitchList = () => {
  const { UserStore } = useStores();
  const { RouterAuthCheck, userData } = UserStore;

  useEffect(() => {
  }, [userData]);

  return (
    <Switch>
      <AuthRouter exact Component={Contents.Mail} level={0} path="/mail" />
      <AuthRouter exact Component={Contents.PostLocker} level={0} path="/postlocker" />
      <AuthRouter exact Component={Contents.Setting} level={0} path="/setting" />
      <AuthRouter exact Component={Contents.NewAlert} level={0} path="/newalert" />
      <AuthRouter exact Component={Contents.MyAccount} level={0} path="/myaccount" />
      <AuthRouter exact Component={Contents.Daily} level={0} path="/daily" />
      <AuthRouter exact Component={Contents.Advertise} level={0} path="/advertise" />
      <AuthRouter exact Component={Contents.Code} level={0} path="/code" />

      {/* 포인트 이중 라우터 */}
      <AuthRouter exact Component={Router.PointRouter} level={0} path="/mypoint" />

      {/* 서치 이중 라우터 */}
      <AuthRouter exact Component={Contents.Search} level={0} path="/search" />

      <AuthRouter exact Component={Contents.Home} level={0} path="/" />

      {/* ------------------------------- Test Component ------------------------------- */}
      <AuthRouter exact Component={Contents.Test} level={0} path="/test" />


      {/* RouterAuthCheck(0) ? (
        <Route exact path="/mypoint" render={() => <Contents.MyPoint noPagination />} />
      ) : null */}

      {/* RouterAuthCheck(0) ? (
        <Route exact path="/mypoint/page/:currentPage" render={({ match }) =>
        <Contents.MyPoint currentPage={match.params.currentPage} />} />
      ) : null */}

      {/* RouterAuthCheck(0) ? (
        <Route exact path="/search" render={({ location }) => <Contents.Search
        location={location} />} />
      ) : null */}

      {/* RouterAuthCheck(0) ? (
        <Route exact path="/search/page/:currentPage" render={({ match, location }) =>
        <Contents.Search currentPage={match.params.currentPage} isPagination
         location={location} />} />
      ) : null */}

      {/* ------------------------------- BOARD ------------------------------- */}
      <Route exact path="/:board" render={({ match, location }) => <Contents.Board path={match.params.board} location={location} />} />
      <Route exact path="/:board/page/:currentPage" render={({ match, location }) => <Contents.Board path={match.params.board} isPagination currentPage={match.params.currentPage} location={location} />} />

      { RouterAuthCheck(0) ? (
        <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
      ) : null }

      { RouterAuthCheck(0) ? (
        <Route exact path="/:board/modify/:id" render={({ match }) => <Posting match={match} isModify />} />
      ) : null }

      { RouterAuthCheck(0) ? (
        <Route exact path="/post/:id" render={({ match, location }) => <Contents.PostView match={match} location={location} />} />
      ) : null }
    </Switch>
  );
};

export default memo(observer(SwitchList));
