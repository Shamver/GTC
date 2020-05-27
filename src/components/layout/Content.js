import React, {
  Suspense, lazy, useEffect, memo,
} from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react';
import Contents from '../Content';
import Loading from '../util/Loading';
import ScrollToTop from './ScrollToTop';
import useStores from '../../stores/useStores';

const Home = lazy(() => import('../Content/Home'));
const Posting = lazy(() => import('../Content/Board/Post/Posting'));
const Alert = lazy(() => import('../util/Alert'));
const Sign = lazy(() => import('../util/Sign'));
const ConfirmAlert = lazy(() => import('../util/ConfirmAlert'));
const Report = lazy(() => import('../util/Report'));

const Content = () => {
  const { UserStore, UtilLoadingStore } = useStores();
  const { checkPermission, userData } = UserStore;
  const { loading } = UtilLoadingStore;

  useEffect(() => {
  }, [userData]);

  return (
    <>
      { !!loading && (<Loading />)}
      <BorderedDiv loading={loading}>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
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
              <Route exact path="/daily" render={() => <Contents.Daily />} />
            ) : null }

            { checkPermission(0) ? (
              <Route exact path="/advertise" render={() => <Contents.Advertise />} />
            ) : null }

            { checkPermission(2) ? (
              <Route exact path="/code" render={() => <Contents.Code />} />
            ) : null }

            <Route exact path="/" render={() => <Home />} />

            {/* Test Component */}
            <Route exact path="/test" render={() => <Contents.Test />} />

            <Route exact path="/search" render={() => <Contents.Search />} />

            {/* Smile Icon */}

            {/* BOARD */}
            <Route exact path="/:board" render={({ match }) => <Contents.Board path={match.params.board} noPagination />} />
            <Route exact path="/:board/page/:currentPage" render={({ match }) => <Contents.Board path={match.params.board} currentPage={match.params.currentPage} />} />
            <Route exact path="/post/:id" render={({ match }) => <Contents.PostView match={match} />} />
            <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
            <Route exact path="/:board/modify/:id" render={({ match }) => <Posting match={match} isModify />} />
          </Switch>
          <Alert />
          <Sign />
          <Report />
          <ConfirmAlert />
          <ToastContainerCustom
            position="bottom-left"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </Suspense>
      </BorderedDiv>
    </>
  );
};

const BorderedDiv = styled.div`
  margin-bottom : 20px;
  display : ${(props) => (props.loading ? 'none' : 'block')};
`;

const ToastContainerCustom = styled(ToastContainer)`
  & .Toastify__toast-body {
    font-family: 'Jeju Gothic', sans-serif !important;
    padding : 10px !important;
  }
  width : auto !important;
`;

export default memo(observer(Content));
