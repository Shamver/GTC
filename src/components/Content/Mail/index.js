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
      <h4>쪽지 보관함</h4>
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
