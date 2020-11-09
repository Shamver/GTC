import React, { memo } from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const SearchRouter = () => (
  <>
    <AuthRouter exact Component={Contents.Search} level={1} path="/search" />
    <AuthRouter exact Component={Contents.Search} level={1} path="/search/page/:currentPage" isPagination />
  </>
);

export default memo(SearchRouter);
