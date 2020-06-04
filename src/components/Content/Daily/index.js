import React, { memo, useLayoutEffect } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import DailyHeader from './DailyHeader';
import DailyContent from './DailyContent';

const Daily = () => {
  const { UtilLoadingStore, EventDailyStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { getDailyList, getDailyLast } = EventDailyStore;

  useLayoutEffect(() => {
    loadingProcess([
      getDailyList,
      getDailyLast,
    ]);
  }, [loadingProcess, getDailyList, getDailyLast]);

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
