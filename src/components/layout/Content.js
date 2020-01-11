import React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Main from '../Content/Main';
import Posting from '../Content/Board/Post/Posting';
import Alert from '../util/Alert';
import Sign from '../util/Sign';
import ConfirmAlert from '../util/ConfirmAlert';
import Contents from '../Content';


const BorderedDiv = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  margin-bottom : 20px;
`;

const Content = () => (
  <BorderedDiv>
    <Switch>
      <Route exact path="/" render={() => <Main />} />

      <Route exact path="/notice" render={({ location }) => <Contents.Board path={location.pathname} />} />
      <Route exact path="/free" render={({ location }) => <Contents.Board path={location.pathname} />} />
      <Route exact path="/trade" render={({ location }) => <Contents.Board path={location.pathname} />} />
      <Route exact path="/cash" render={({ location }) => <Contents.Board path={location.pathname} />} />
      <Route exact path="/crime" render={({ location }) => <Contents.Board path={location.pathname} />} />
      <Route exact path="/qna" render={({ location }) => <Contents.Board path={location.pathname} />} />


      <Route exact path="/settings" render={() => <Contents.Settings />} />
      <Route exact path="/postlocker" render={() => <Contents.PostLocker />} />
      <Route exact path="/post/:id" render={({ match }) => <Contents.PostView match={match} />} />
      <Route exact path="/newalert" render={() => <Contents.NewAlert />} />

      <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
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
