import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import Loading from '../../util/Loading';

import NewAlertHeader from './NewAlertHeader';
import NewAlertData from './NewAlertData';

import useStores from '../../../stores/useStores';

const NewAlert = () => {
  const { UserAlertStore, UtilLoadingStore, UtilStore } = useStores();

  const {
    onDeleteAlert, onClickAlert, alertList,
  } = UserAlertStore;

  const {
    loading, setLoading,
  } = UtilLoadingStore;

  const {
    loginCheck,
  } = UtilStore;

  useEffect(() => {
    loginCheck();

    return () => {
      setLoading(true);
    };
  }, [loginCheck, setLoading]);

  const Alerts = alertList.map((v) => (NewAlertData(v, onClickAlert, onDeleteAlert)));

  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <MainContainer>
      <NewAlertHeader />
      {Alerts.length === 0 ? '새로운 알림이 없습니다.' : Alerts}
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 1rem !important;
`;

export default observer(NewAlert);
