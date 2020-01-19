import React from 'react';
import {
  TabContent,
} from 'reactstrap';

import useStores from '../../../stores/useStores';

import SettingIgnore from './SettingIgnore';
import SettingWithdrawal from './SettingWithdrawal';

import Loading from '../../util/Loading';

const SettingTabContent = () => {
  const {
    ComponentSettingStore, UtilLoadingStore,
  } = useStores();

  const {
    activeTab,
  } = ComponentSettingStore;
  const { loading } = UtilLoadingStore;

  console.log(loading);

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

export default SettingTabContent;
