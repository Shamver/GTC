import React, {memo, useEffect, useLayoutEffect} from 'react';
import styled from 'styled-components';
import WorkOnAdvertise from './WorkOnAdvertise';
import AdvertiseForm from './AdvertiseForm';
import useStores from '../../../stores/useStores';

const Advertise = () => {
  const { UtilLoadingStore } = useStores();
  const { loadingProcess, startLoading } = UtilLoadingStore;
  useEffect(() => {
    console.log('렌더링 완료!');
    loadingProcess([]);
  }, [loadingProcess]);

  useLayoutEffect(() => {
    startLoading();
    console.log('로딩이시작되었습니다.');
  }, []);

  return (
    <BoardWrapper>
      <TableWrapper>
        <AdvertiseForm />
        <hr />
        <h5>현재 진행중인 광고</h5>
        <WorkOnAdvertise />
      </TableWrapper>
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 14px !important;
`;

export default memo(Advertise);
