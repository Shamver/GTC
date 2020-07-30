import React from 'react';
import Contents from '../../../Content';
import AuthRouter from '../AuthRouter';

const BoardRouter = () => (
  <>
    <AuthRouter exact Component={Contents.Board} level={0} path="/:board" />
    <AuthRouter exact Component={Contents.Board} level={0} path="/:board/page/:currentPage" isPagination />
    <AuthRouter exact Component={Contents.Board} level={0} path="/:board/page/:currentPage/:currentCategory" isPagination />

    <AuthRouter exact Component={Contents.Posting} level={1} path="/:board/post" />
    <AuthRouter exact Component={Contents.Posting} level={1} path="/:board/modify/:id" isModify />
  </>
);

export default BoardRouter;
