import React from 'react';
import { Switch } from 'react-router';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const PointRouter = () => (
  <Switch>
    <AuthRouter exact Component={Contents.MyPoint} level={1} path="/mypoint" noPagination />
    <AuthRouter exact Component={Contents.MyPoint} level={1} path="/mypoint/page/:currentPage" />
  </Switch>
);

export default PointRouter;