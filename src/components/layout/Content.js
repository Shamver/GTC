import React from 'react';
import { Switch, Route } from 'react-router';
import Main from '../Content/Main';
import Posting from '../Content/Posting';
import PostList from '../Content/PostList';

const Content = ({ history }) => (
  <Switch>
    <Route exact path="/" history={history} render={() => <Main />} />
    <Route exact path="/tempPost" history={history} render={() => <Posting />} />
    <Route exact path="/tempBoard" history={history} render={() => <PostList />} />
  </Switch>
);

export default Content;
