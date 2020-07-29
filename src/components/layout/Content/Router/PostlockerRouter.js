import React from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const PostlockerRouter = () => (
  <>
    <AuthRouter exact Component={Contents.PostLocker} level={1} path="/postlocker" noPagination />
    <AuthRouter exact Component={Contents.PostLocker} level={1} path="/postlocker/:currentTab" noPagination />
    <AuthRouter exact Component={Contents.PostLocker} level={1} path="/postlocker/:currentTab/:currentPage" isPagination />
  </>
);

export default PostlockerRouter;
