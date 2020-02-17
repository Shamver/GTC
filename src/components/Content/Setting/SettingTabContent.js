import React from 'react';
import {
  TabContent,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

import SettingIgnore from './SettingIgnore';
import SettingWithdrawal from './SettingWithdrawal';

import Loading from '../../util/Loading';

const SettingTabContent = () => {
  const { ComponentSettingStore, UtilLoadingStore } = useStores();
  const { loading } = UtilLoadingStore;
  const { activeTab } = ComponentSettingStore;

  return (
    <>
      <Loading loading={loading} />
      <Div loading={loading}>
        <TabContent activeTab={activeTab}>
          <SettingIgnore />
          <SettingWithdrawal />
        </TabContent>
      </Div>
    </>
  );
};

const Div = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
`;

export default observer(SettingTabContent);
