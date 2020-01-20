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
  const { doLoading, setLoading } = UtilLoadingStore;
  const { loginCheck } = UtilStore;

  useEffect(() => {
    if (loginCheck()) {
      doLoading();
    }

    return () => {
      setLoading(true);
    };
  }, [loginCheck, doLoading, setLoading]);

  return (
    <MainContainer>
      <NewAlertHeader />
      <NewAlertContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 1rem !important;
`;

export default observer(NewAlert);
