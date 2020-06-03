import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Contents from '../Content';
import Loading from '../util/Loading';
import ScrollToTop from './ScrollToTop';

import PrivacyPolicy from './Footer/PrivacyPolicy';
import TermOfService from './Footer/TermOfService';

const Home = lazy(() => import('../Content/Home'));
const Posting = lazy(() => import('../Content/Board/Post/Posting'));
const Alert = lazy(() => import('../util/Alert'));
const Sign = lazy(() => import('../util/Sign'));
const ConfirmAlert = lazy(() => import('../util/ConfirmAlert'));
const Report = lazy(() => import('../util/Report'));
const ProfileModal = lazy(() => import('../util/ProfileModal'));

const Content = () => (
  <BorderedDiv>
    <Suspense fallback={<Loading loading={1} />}>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/postlocker" render={() => <Contents.PostLocker />} />
        <Route exact path="/newalert" render={() => <Contents.NewAlert />} />
        <Route exact path="/setting" render={() => <Contents.Setting />} />
        <Route exact path="/myaccount" render={() => <Contents.MyAccount />} />
        <Route exact path="/mypoint" render={() => <Contents.MyPoint noPagination />} />
        <Route exact path="/mypoint/page/:currentPage" render={({ match }) => <Contents.MyPoint currentPage={match.params.currentPage} />} />
        <Route exact path="/mail" render={() => <Contents.Mail />} />
        <Route exact path="/code" render={() => <Contents.Code />} />

        <Route exact path="/search" render={() => <Contents.Search />} />

        <Route exact path="/advertising" render={() => <Contents.Advertising />} />
        <Route exact path="/team" render={() => <Contents.Team />} />

        {/* Smile Icon */}
        <Route exact path="/daily" render={() => <Contents.Daily />} />
        <Route exact path="/advertise" render={() => <Contents.Advertise />} />

        {/* BOARD */}
        <Route exact path="/:board" render={({ match }) => <Contents.Board path={match.params.board} noPagination />} />
        <Route exact path="/:board/best" render={({ match }) => <Contents.Board path={match} noPagination />} />
        <Route exact path="/:board/page/:currentPage" render={({ match }) => <Contents.Board path={match.params.board} currentPage={match.params.currentPage} />} />
        <Route exact path="/post/:id" render={({ match }) => <Contents.PostView match={match} />} />
        <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
        <Route exact path="/:board/modify/:id" render={({ match }) => <Posting match={match} isModify />} />
      </Switch>
      <ProfileModal />
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
      <PrivacyPolicy />
      <TermOfService />
    </Suspense>
  </BorderedDiv>
);

const BorderedDiv = styled.div`
  margin-bottom : 20px;
`;

const ToastContainerCustom = styled(ToastContainer)`
  & .Toastify__toast-body {
    font-family: 'Jeju Gothic', sans-serif !important;
    padding : 10px !important;
  }
  
  width : auto !important;
 
`;

export default Content;
