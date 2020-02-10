import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

import MailNav from './MailNav';
import MailTabContent from './MailTabContent';

const Setting = () => {
  const {
    ComponentMailStore, UtilStore, UtilLoadingStore,
  } = useStores();

  const { activeTab } = ComponentMailStore;
  const { loginCheck } = UtilStore;
  const { doLoading } = UtilLoadingStore;

  doLoading();

  useEffect(() => {
    if (loginCheck()) {
      // getIgnore();
    }
  }, [loginCheck, activeTab]);

  return (
    <MainContainer>
      <MailNav />
      <MailTabContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 14px !important;
`;

export default observer(Setting);
