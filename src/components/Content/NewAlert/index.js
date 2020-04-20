import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import NewAlertHeader from './NewAlertHeader';
import NewAlertContent from './NewAlertContent';

import useStores from '../../../stores/useStores';

const NewAlert = () => {
  const { UtilLoadingStore, UtilStore } = useStores();
  const { doLoading } = UtilLoadingStore;
  const { loginCheck } = UtilStore;

  doLoading();

  useEffect(() => {
    loginCheck();
  }, [loginCheck]);

  return (
    <MainContainer>
      <NewAlertHeader />
      <NewAlertContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)\`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 1rem !important;
`;

export default observer(NewAlert);
