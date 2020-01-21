import React from 'react';
import {
  TabContent,
} from 'reactstrap';

import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

import SettingIgnore from './SettingIgnore';
import SettingWithdrawal from './SettingWithdrawal';

import Loading from '../../util/Loading';

const SettingTabContent = () => {
  const { ComponentSettingStore, UtilLoadingStore } = useStores();
  const { loading } = UtilLoadingStore;
  const { activeTab } = ComponentSettingStore;

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <TabContent activeTab={activeTab}>
      <SettingIgnore />
      <SettingWithdrawal />
    </TabContent>
  );
};

export default observer(SettingTabContent);
