import React from 'react';
import { Switch, Route } from 'react-router';
import Main from '../Content/Main';
import Posting from '../Content/Posting';

const Content = ({ history }) => (
  <Switch>
    <Route exact path="/" history={history} render={Main} />
    <Route exact path="/tempPost" history={history} render={Posting} />
  </Switch>
);
export default Content;
