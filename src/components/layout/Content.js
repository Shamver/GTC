import React from 'react';
import { Switch, Route } from 'react-router';
import Main from '../Content/Main';
import Posting from '../Content/Posting';
import PostList from '../Content/PostList';
import Alert from '../util/Alert';

const Content = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/tempPost" render={() => <Posting />} />
      <Route exact path="/tempBoard" render={() => <PostList />} />
    </Switch>
    <Alert />
  </>
);

export default Content;
