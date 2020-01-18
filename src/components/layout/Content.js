import React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Main from '../Content/Main';
import Posting from '../Content/Posting';
import Alert from '../util/Alert';
import Sign from '../util/Sign';
import ConfirmAlert from '../util/ConfirmAlert';
import Contents from '../Content';
import 'react-toastify/dist/ReactToastify.css';

const BorderedDiv = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  margin-bottom : 20px;
`;

const Content = () => (
  <BorderedDiv>
    <Switch>
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
      <Route exact path="/free" render={({ location }) => <Contents.FreeBoard pathname={location.pathname} />} />
      <Route exact path="/setting" render={() => <Contents.Setting />} />
      <Route exact path="/postlocker" render={() => <Contents.PostLocker />} />
      <Route exact path="/post/:id" render={({ match }) => <Contents.PostView match={match} />} />
      <Route exact path="/newalert" render={() => <Contents.NewAlert />} />
    </Switch>
    <Alert />
    <Sign />
    <ConfirmAlert />
    <ToastContainer
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
  </BorderedDiv>
);


export default Content;
