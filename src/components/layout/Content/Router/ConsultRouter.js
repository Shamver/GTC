import React from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const ConsultRouter = () => (
  <>
    <AuthRouter exact Component={Contents.Consult} level={1} path="/consult" noPagination />
    <AuthRouter exact Component={Contents.Consult} level={1} path="/consult/:currentTab" noPagination />
    <AuthRouter exact Component={Contents.Consult} level={1} path="/consult/:currentTab/page/:currentPage" />
  </>
);

export default ConsultRouter;
