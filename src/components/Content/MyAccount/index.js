import React, { useLayoutEffect, memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import MyAccountContent from './MyAccountContent';

const MyAccount = () => {
  const {
    ComponentMyAccountStore, UtilLoadingStore, UserStore, SystemCodeStore,
  } = useStores();
  const { setDefaultValue, setUserGenderCodeList } = ComponentMyAccountStore;
  const { getCodeComponent } = SystemCodeStore;
  const { getIsCanChangeGtNickname } = UserStore;
  const { loadingProcess } = UtilLoadingStore;


  useLayoutEffect(() => {
    loadingProcess([
      setDefaultValue,
      getIsCanChangeGtNickname,
      () => getCodeComponent('GENDER_CODE', setUserGenderCodeList),
    ]);
  }, [
    loadingProcess, setDefaultValue, getIsCanChangeGtNickname,
    getCodeComponent, setUserGenderCodeList,
  ]);

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

export default memo(observer(MyAccount));
