import React, { memo } from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const PointRouter = () => (
  <>
    <AuthRouter exact Component={Contents.MyPoint} level={1} path="/mypoint" noPagination />
    <AuthRouter exact Component={Contents.MyPoint} level={1} path="/mypoint/page/:currentPage" />
  </>
);

export default memo(PointRouter);
