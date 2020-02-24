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
    ComponentMailStore, UtilStore, UtilLoadingStore, UserMailStore,
  } = useStores();

  const { activeTab } = ComponentMailStore;
  const { loginCheck } = UtilStore;
  const { doLoading } = UtilLoadingStore;
  const { getMail, getSentMail } = UserMailStore;

  doLoading();

  useEffect(() => {
    if (loginCheck()) {
      getMail();
      getSentMail();
    }
  }, [loginCheck, activeTab, getMail, getSentMail]);

  return (
    <MainContainer>
      <MailNav />
      <MailTabContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 14px !important;
`;

export default observer(Setting);
