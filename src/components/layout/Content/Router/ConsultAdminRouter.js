import React from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const ConsultAdminRouter = () => (
  <>
    <AuthRouter exact Component={Contents.Consult} level={2} path="/consult/:currentTab" noPagination />
    <AuthRouter exact Component={Contents.Consult} level={2} path="/consult/:currentTab/page/:currentPage" />
  </>
);

export default ConsultAdminRouter;
