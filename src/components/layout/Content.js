import React from 'react';
import { Switch, Route } from 'react-router';
import Main from '../Content/Main';
import Posting from '../Content/Posting';
import PostList from '../Content/PostList';
import Alert from '../util/Alert';

const Content = ({ history }) => (
  <Switch>
    <Route exact path="/" history={history} render={() => <Main />} />
    <Route exact path="/tempPost" history={history} render={() => <Posting />} />
    <Route exact path="/tempBoard" history={history} render={() => <PostList />} />
    <Alert />
  </Switch>

);

export default Content;
