import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

import SettingNav from './SettingNav';
import SettingTabContent from './SettingTabContent';

const Setting = () => {
  const {
    UserIgnoreStore, ComponentSettingStore, UtilStore, UtilLoadingStore,
  } = useStores();

  const { getIgnore } = UserIgnoreStore;
  const { activeTab } = ComponentSettingStore;
  const { loginCheck } = UtilStore;
  const { doLoading } = UtilLoadingStore;

  doLoading();

  useEffect(() => {
    if (loginCheck()) {
      getIgnore();
    }
  }, [loginCheck, getIgnore, activeTab]);

  return (
    <MainContainer>
      <SettingNav />
      <SettingTabContent />
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
