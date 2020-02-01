import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import MyPointTable from './MyPointTable';
import useStores from '../../../stores/useStores';

const MyPoint = () => {
  const { UserPointStore, UtilStore } = useStores();

  const { loginCheck } = UtilStore;

  const { totalPoint, getPointData } = UserPointStore;

  useEffect(() => {
    if (loginCheck()) {
      getPointData();
    }
  }, [loginCheck, getPointData]);

  return (
    <MainContainer>
      <h4>포인트 내역</h4>
      <p>현재 보유중인 포인트는 <b>{totalPoint}</b> 점, 포인트는 다양한 활동을 하여 얻을 수 있어요.</p>
      <MyPointTable />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 1rem !important;
`;

export default observer(MyPoint);
