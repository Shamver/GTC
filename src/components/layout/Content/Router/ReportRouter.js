import React from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const ReportRouter = () => (
  <>
    <AuthRouter exact Component={Contents.Report} level={3} path="/report" noPagination />
    <AuthRouter exact Component={Contents.Report} level={3} path="/report/:activeTab/:currentPage" />
  </>
);

export default ReportRouter;
