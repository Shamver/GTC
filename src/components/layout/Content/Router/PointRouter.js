import React from 'react';
import AuthRouter from '../AuthRouter';
import Contents from '../../../Content';

const PointRouter = (props) => {
  console.log(props);
  return (
    <>
      <AuthRouter exact Component={Contents.MyPoint} level={1} path="/mypoint/page/:currentPage" />
      <AuthRouter exact Component={Contents.MyPoint} level={1} path="/mypoint" noPagination />
    </>
  );
};

export default PointRouter;
