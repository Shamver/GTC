import React, { useEffect, memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import MailNav from './MailNav';
import MailTabContent from './MailTabContent';

const Setting = () => {
  const { ComponentMailStore, UtilLoadingStore, UserMailStore } = useStores();
  const { activeTab } = ComponentMailStore;
  const { loadingProcess } = UtilLoadingStore;
  const { getMail, getSentMail } = UserMailStore;

  useEffect(() => {
    loadingProcess([
      getMail,
      getSentMail,
    ]);
  }, [loadingProcess, activeTab, getMail, getSentMail]);

  return (
    <MainContainer>
      <h4>쪽지 보관함</h4>
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

export default memo(observer(Setting));
