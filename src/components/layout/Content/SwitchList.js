import React, { useEffect, memo } from 'react';
import { Switch } from 'react-router';
import { observer } from 'mobx-react';
import Contents from '../../Content';
import useStores from '../../../stores/useStores';
import AuthRouter from './AuthRouter';
import Router from './Router';

const SwitchList = () => {
  const { UserStore } = useStores();
  const { userData } = UserStore;

  useEffect(() => {
  }, [userData]);

  return (
    <Switch>
      <AuthRouter exact Component={Contents.Mail} level={1} path="/mail" />
      <AuthRouter exact Component={Contents.PostLocker} level={1} path="/postlocker" />
      <AuthRouter exact Component={Contents.Setting} level={1} path="/setting" />
      <AuthRouter exact Component={Contents.NewAlert} level={1} path="/newalert" />
      <AuthRouter exact Component={Contents.MyAccount} level={1} path="/myaccount" />
      <AuthRouter exact Component={Contents.Daily} level={1} path="/daily" />
      <AuthRouter exact Component={Contents.Advertise} level={1} path="/advertise" />
      <AuthRouter exact Component={Contents.Code} level={3} path="/code" />
      <AuthRouter exact Component={Contents.Test} level={3} path="/test" />
      <AuthRouter exact Component={Contents.Home} level={0} path="/" />

      {/* --------------------------- Pointer Router Component --------------------------- */}
      <AuthRouter exact Component={Router.PointRouter} level={1} path="/mypoint" />

      {/* ---------------------------- Search Router Component --------------------------- */}
      <AuthRouter exact Component={Router.SearchRouter} level={1} path="/search" />

      {/* ---------------------------- Board Router Component ---------------------------- */}
      <AuthRouter exact Component={Router.BoardRouter} level={0} path="/:board" />

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

      {/*
        <Route exact path="/:board" render={({ match, location }) => <Contents.Board
        path={match.params.board}
        location={location} />} />
        <Route exact path="/:board/page/:currentPage" render={({ match, location }) =>
        <Contents.Board path={match.params.board}
        isPagination currentPage={match.params.currentPage} location={location} />} />

        { RouterAuthCheck(0) ? (
          <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
        ) : null }

        { RouterAuthCheck(0) ? (
          <Route exact path="/:board/modify/:id" render={({ match }) => <Posting
          match={match}
          isModify />} />
        ) : null }

        { RouterAuthCheck(0) ? (
          <Route exact path="/post/:id" render={({ match, location }) => <Contents.PostView
          match={match}
          location={location} />} />
        ) : null }
      */}
    </Switch>
  );
};

export default memo(observer(SwitchList));
