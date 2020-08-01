import React from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const ConsultRouter = () => (
  <>
    <AuthRouter exact Component={Contents.ConsultUser} level={1} path="/consult" noPagination />
  </>
);

export default ConsultRouter;
