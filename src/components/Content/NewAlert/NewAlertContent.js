import React, { memo } from 'react';
import { observer } from 'mobx-react';
import NewAlertData from './NewAlertData';
import useStores from '../../../stores/useStores';

const NewAlertContent = () => {
  const { UserAlertStore } = useStores();
  const { alertList } = UserAlertStore;

  const Alerts = alertList.map((v) => <NewAlertData data={v} />);
  return (
    <div>
      {Alerts.length === 0 ? '새로운 알림이 없습니다.' : Alerts}
    </div>
  );
};

export default memo(observer(NewAlertContent));
