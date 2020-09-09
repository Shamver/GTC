import React, { memo } from 'react';
import Contents from '../../../Content';
import AuthRouter from '../AuthRouter';

const BoardRouter = () => (
  <>
    <AuthRouter exact Component={Contents.Board} level={0} path="/:board" />
    <AuthRouter exact Component={Contents.Board} level={0} path="/:board/page/:page" isPagination />
    <AuthRouter exact Component={Contents.Board} level={0} path="/:board/:category" isPagination />
    <AuthRouter exact Component={Contents.Board} level={0} path="/:board/:category/page/:page" isPagination />
  </>
);

export default memo(BoardRouter);
