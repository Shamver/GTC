import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

import DailyHeader from './DailyHeader';
import DailyContent from './DailyContent';

const Daily = () => {
  const {
    UtilLoadingStore, EventDailyStore, UtilStore,
  } = useStores();
  const { doLoading } = UtilLoadingStore;
  const { getDailyList, getDailyLast } = EventDailyStore;
  const { loginCheck } = UtilStore;

  doLoading();

  useEffect(() => {
    getDailyList();
    if (loginCheck()) {
      getDailyLast();
    }
  }, [getDailyLast, getDailyList, loginCheck]);

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

export default observer(Daily);
