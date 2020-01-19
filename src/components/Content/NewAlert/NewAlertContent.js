import React from 'react';
import { observer } from 'mobx-react';

import Loading from '../../util/Loading';
import NewAlertData from './NewAlertData';

import useStores from '../../../stores/useStores';

const NewAlertContent = () => {
  const { UserAlertStore, UtilLoadingStore } = useStores();
  const { onDeleteAlert, onClickAlert, alertList } = UserAlertStore;
  const { loading } = UtilLoadingStore;

  const Alerts = alertList.map((v) => (NewAlertData(v, onClickAlert, onDeleteAlert)));

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      {Alerts.length === 0 ? '새로운 알림이 없습니다.' : Alerts}
    </>
  );
};

export default observer(NewAlertContent);
