import React, { useEffect, lazy, memo } from 'react';
import { Route, Switch } from 'react-router';
import { observer } from 'mobx-react';
import Contents from '../../Content';
import useStores from '../../../stores/useStores';

const Home = lazy(() => import('../../Content/Home'));
const Posting = lazy(() => import('../../Content/Board/Post/Posting'));

const SwitchList = () => {
  const { UserStore } = useStores();
  const { checkPermission, userData } = UserStore;

  useEffect(() => {
  }, [userData]);

  return (
    <Switch>
      { checkPermission(0) ? (
        <Route exact path="/mail" render={() => <Contents.Mail />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/postlocker" render={() => <Contents.PostLocker />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/setting" render={() => <Contents.Setting />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/newalert" render={() => <Contents.NewAlert />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/myaccount" render={() => <Contents.MyAccount />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/mypoint" render={() => <Contents.MyPoint noPagination />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/mypoint/page/:currentPage" render={({ match }) => <Contents.MyPoint currentPage={match.params.currentPage} />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/daily" render={() => <Contents.Daily />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/advertise" render={() => <Contents.Advertise />} />
      ) : null }

      { checkPermission(2) ? (
        <Route exact path="/code" render={() => <Contents.Code />} />
      ) : null }

      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/search" render={() => <Contents.Search />} />

      {/* ------------------------------- Test Component ------------------------------- */}
      <Route exact path="/test" render={() => <Contents.Test />} />

      {/* ------------------------------- BOARD ------------------------------- */}
      <Route exact path="/:board" render={({ match }) => <Contents.Board path={match.params.board} noPagination />} />
      <Route exact path="/:board/page/:currentPage" render={({ match }) => <Contents.Board path={match.params.board} currentPage={match.params.currentPage} />} />

      { checkPermission(0) ? (
        <Route exact path="/post/:id" render={({ match }) => <Contents.PostView match={match} />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
      ) : null }

      { checkPermission(0) ? (
        <Route exact path="/:board/modify/:id" render={({ match }) => <Posting match={match} isModify />} />
      ) : null }
    </Switch>
  );
};

export default memo(observer(SwitchList));
