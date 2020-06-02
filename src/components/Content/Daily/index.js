import React, {useEffect, memo, useLayoutEffect} from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import DailyHeader from './DailyHeader';
import DailyContent from './DailyContent';

const Daily = () => {
  const { UtilLoadingStore, EventDailyStore } = useStores();
  const { loadingProcess, startLoading } = UtilLoadingStore;
  const { getDailyList, getDailyLast } = EventDailyStore;

  useEffect(() => {

  }, [loadingProcess, getDailyList, getDailyLast]);

  useLayoutEffect(() => {
    loadingProcess([
      getDailyList,
      getDailyLast,
    ]);
    console.log('로딩이시작되었습니다.');
  }, []);
  console.log('render start!');

  return (
    <MainContainer>
      <DailyHeader />
      <DailyContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 14px !important;
`;

export default memo(observer(Daily));
