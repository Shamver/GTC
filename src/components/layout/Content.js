import React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import Main from '../Content/Main';
import Posting from '../Content/Posting';
import Alert from '../util/Alert';
import Sign from '../util/Sign';
import ConfirmAlert from '../util/ConfirmAlert';
import Contents from '../Content';

const BorderedDiv = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
`;

const Content = () => (
  <BorderedDiv>
    <Switch>
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/:board/post" render={({ match }) => <Posting match={match} />} />
      <Route exact path="/free" render={({ location }) => <Contents.FreeBoard pathname={location.pathname} />} />
      <Route exact path="/settings" render={() => <Contents.Settings />} />
      <Route exact path="/postlocker" render={() => <Contents.PostLocker />} />
      <Route exact path="/post/:id" render={({ match }) => <Contents.PostView match={match} />} />
      <Route exact path="/newalert" render={() => <Contents.NewAlert />} />
    </Switch>
    <Alert />
    <Sign />
    <ConfirmAlert />
    <br />
  </BorderedDiv>

);


export default Content;
