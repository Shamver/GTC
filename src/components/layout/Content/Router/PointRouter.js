import React from 'react';
import { Switch } from 'react-router';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const PointRouter = () => (
  <Switch>
    <AuthRouter exact Component={Contents.Home} level={1} path="/" />
    <AuthRouter exact Component={Contents.Home} level={1} path="/" />
  </Switch>
);

export default PointRouter;

{/* RouterAuthCheck(0) ? (
        <Route exact path="/mypoint" render={() => <Contents.MyPoint noPagination />} />
      ) : null */}

{/* RouterAuthCheck(0) ? (
        <Route exact path="/mypoint/page/:currentPage" render={({ match }) =>
        <Contents.MyPoint currentPage={match.params.currentPage} />} />
      ) : null */}