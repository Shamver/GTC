import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Contents from '../Content';
import Loading from '../util/Loading';

const Main = lazy(() => import('../Content/Main'));
const Posting = lazy(() => import('../Content/Board/Post/Posting'));
const Alert = lazy(() => import('../util/Alert'));
const Sign = lazy(() => import('../util/Sign'));
const ConfirmAlert = lazy(() => import('../util/ConfirmAlert'));
const Report = lazy(() => import('../util/Report'));

const Content = () => (
  <BorderedDiv>
    <Suspense fallback={<Loading loading />}>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/postlocker" render={() => <Contents.PostLocker />} />
        <Route exact path="/newalert" render={() => <Contents.NewAlert />} />
        <Route exact path="/setting" render={() => <Contents.Setting />} />
        <Route exact path="/myaccount" render={() => <Contents.MyAccount />} />
        <Route exact path="/mypoint" render={() => <Contents.MyPoint noPagination />} />
        <Route exact path="/mypoint/page/:currentPage" render={({ match }) => <Contents.MyPoint currentPage={match.params.currentPage} />} />
        <Route exact path="/mail" render={() => <Contents.Mail />} />

        {/* BOARD */}
        <Route exact path="/:board" render={({ match }) => <Contents.Board path={match.params.board} noPagination />} />
        <Route exact path="/:board/page/:currentPage" render={({ match }) => <Contents.Board path={match.params.board} currentPage={match.params.currentPage} />} />

        <Route exact path="/post/:id" render={({ match }) => <Contents.PostView match={match} />} />

        <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
      </Switch>
      <Alert />
      <Sign />
      <Report />
      <ConfirmAlert />
      <ToastContainerCustom
        position="bottom-left"
        autoClose={3000}
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
);

const BorderedDiv = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  margin-bottom : 20px;
`;

const ToastContainerCustom = styled(ToastContainer)`
  & .Toastify__toast-body {
    font-family : 'NanumSquareRound', sans-serif !important
  }
  
  width : 380px !important;
 
`;

export default Content;
