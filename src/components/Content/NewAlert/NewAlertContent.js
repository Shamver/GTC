import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import Loading from '../../util/Loading';
import NewAlertData from './NewAlertData';

import useStores from '../../../stores/useStores';

const NewAlertContent = () => {
  const { UserAlertStore, UtilLoadingStore } = useStores();
  const { onDeleteAlert, onClickAlert, alertList } = UserAlertStore;
  const { loading } = UtilLoadingStore;

  const Alerts = alertList.map((v) => (NewAlertData(v, onClickAlert, onDeleteAlert)));
  return (
    <>
      <Loading loading={loading} />
      <Div loading={loading}>
        {Alerts.length === 0 ? '새로운 알림이 없습니다.' : Alerts}
      </Div>
    </>
  );
};

const Div = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
`;

export default observer(NewAlertContent);
