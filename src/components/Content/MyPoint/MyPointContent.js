import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import * as Proptypes from 'prop-types';
import MyPointTable from './MyPointTable';
import useStores from '../../../stores/useStores';
import PointPagination from './Pagination';

const MyPointContent = ({ currentPage, noPagination }) => {
  const { UserPointStore, UtilStore } = useStores();
  const { loginCheck } = UtilStore;
  const { pointList, totalPoint, getPoint } = UserPointStore;

  useEffect(() => {
    if (loginCheck()) {
      getPoint(currentPage);
    }
  }, [loginCheck, getPoint, currentPage]);

  return (
    <>
      <p>현재 보유중인 포인트는 <b>{totalPoint}</b> 점, 포인트는 다양한 활동을 하여 얻을 수 있어요.</p>
      <MyPointTable currentPage={currentPage} noPagination={noPagination} />
      {pointList.length > 0 ? (<PointPagination currentPage={currentPage} noPagination={noPagination} />) : ''}
    </>
  );
};

MyPointContent.propTypes = {
  currentPage: Proptypes.string,
  noPagination: Proptypes.bool,
};

MyPointContent.defaultProps = {
  currentPage: '1',
  noPagination: false,
};

export default observer(MyPointContent);
