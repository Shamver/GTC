import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';
import MyAccountContent from './MyAccountContent';

const MyAccount = () => {
  const {
    ComponentMyAccountStore, UtilStore, UtilLoadingStore,
  } = useStores();
  const {
    setDefaultValue,
  } = ComponentMyAccountStore;
  const { loginCheck } = UtilStore;
  const { doLoading } = UtilLoadingStore;

  doLoading();

  useEffect(() => {
    if (loginCheck()) {
      setDefaultValue();
    }
  }, [setDefaultValue, loginCheck]);

  return (
    <MainContainer>
      <h3>내 정보 수정</h3>
      <MyAccountContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 1rem !important;
`;

export default observer(MyAccount);
