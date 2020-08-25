import React, { useEffect, memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import SettingNav from './SettingNav';
import SettingTabContent from './SettingTabContent';
import FontTest from "../../util/FontTest";

const Setting = () => {
  const { UserIgnoreStore, UtilLoadingStore } = useStores();
  const { getIgnore } = UserIgnoreStore;
  const { loadingProcess } = UtilLoadingStore;

  useEffect(() => {
    loadingProcess([
      getIgnore,
    ]);
  }, [loadingProcess, getIgnore]);

  return (
    <MainContainer>
      <FontTest />
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

export default memo(observer(Setting));
