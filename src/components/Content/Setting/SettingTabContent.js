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
  const { activeTab } = ComponentSettingStore;
  const { loading } = UtilLoadingStore;

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
