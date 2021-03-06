import React, { memo } from 'react';
import { Row, Button } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import MyAccountReadForm from './MyAccountReadForm';
import MyAccountEditForm from './MyAccountEditForm';

const MyAccountContent = () => {
  const { ComponentMyAccountStore, UserStore } = useStores();
  const { isAllValidationChecked, disabled } = ComponentMyAccountStore;
  const { updateInfo } = UserStore;

  return (
    <FormWrapper>
      <Row>
        <MyAccountReadForm />
        <MyAccountEditForm />
      </Row>
      <FormButton color="danger" onClick={updateInfo} disabled={!isAllValidationChecked || disabled}>수정</FormButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  padding: 25px;
  @media (max-width: 1200px) {
    padding: 0px;
  }
`;

const FormButton = styled(Button)`
  text-transform: uppercase;
  outline: 0;
  background: #DC3545;;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
`;

export default memo(observer(MyAccountContent));
