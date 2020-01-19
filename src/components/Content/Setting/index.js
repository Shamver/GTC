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

  const { getDataIgnore } = UserIgnoreStore;
  const { activeTab } = ComponentSettingStore;
  const { loginCheck } = UtilStore;
  const { doLoading } = UtilLoadingStore;

  useEffect(() => {
    if (loginCheck()) {
      doLoading();
      getDataIgnore();
    }
  }, [loginCheck, getDataIgnore, activeTab, doLoading]);

  return (
    <MainContainer>
      <SettingNav />
      <SettingTabContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 14px !important;
`;

export default observer(Setting);
