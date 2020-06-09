import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import SettingIgnore from './SettingIgnore';
import SettingWithdrawal from './SettingWithdrawal';

const SettingTabContent = () => {
  const { ComponentSettingStore } = useStores();
  const { activeTab } = ComponentSettingStore;

  return (
    <TabContent activeTab={activeTab}>
      <SettingIgnore />
      <SettingWithdrawal />
    </TabContent>
  );
};

export default memo(observer(SettingTabContent));
