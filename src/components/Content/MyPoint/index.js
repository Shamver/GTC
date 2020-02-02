import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import * as Proptypes from 'prop-types';
import MyPointTable from './MyPointTable';
import useStores from '../../../stores/useStores';
import PointPagination from './Pagination';

const MyPoint = observer(({ currentPage, noPagination }) => {
  const { UserPointStore, UtilStore, UtilLoadingStore } = useStores();
  const { loginCheck } = UtilStore;
  const { doLoading } = UtilLoadingStore;
  const { pointList, totalPoint, getPointData } = UserPointStore;

  doLoading();

  useEffect(() => {
    if (loginCheck()) {
      getPointData(currentPage);
    }
  }, [loginCheck, getPointData, currentPage]);

  return (
    <MainContainer>
      <h4>포인트 내역</h4>
      <p>현재 보유중인 포인트는 <b>{totalPoint}</b> 점, 포인트는 다양한 활동을 하여 얻을 수 있어요.</p>
      <MyPointTable currentPage={currentPage} noPagination={noPagination} />
      {pointList.length > 0 ? (<PointPagination currentPage={currentPage} noPagination={noPagination} />) : ''}
    </MainContainer>
  );
});

MyPoint.propTypes = {
  currentPage: Proptypes.string,
  noPagination: Proptypes.bool,
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 1rem !important;
`;

export default MyPoint;
