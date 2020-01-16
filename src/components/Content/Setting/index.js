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
    UserIgnoreStore, ComponentSettingStore,
  } = useStores();

  const {
    getDataIgnore,
  } = UserIgnoreStore;

  const {
    activeTab,
  } = ComponentSettingStore;

  useEffect(() => {
    getDataIgnore();
  }, [getDataIgnore, activeTab]);

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
