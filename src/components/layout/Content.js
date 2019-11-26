import React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import Main from '../Content/Main';
import Posting from '../Content/Posting';
// import PostList from '../Content/PostList';
import Alert from '../util/Alert';
import Sign from '../util/Sign';
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
      <Route exact path="/free" render={() => <Contents.FreeBoard />} />
      <Route exact path="/posts/:postId" render={() => <Contents.FreeBoard />} />
    </Switch>
    <Alert />
    <Sign />
  </BorderedDiv>
);


export default Content;
