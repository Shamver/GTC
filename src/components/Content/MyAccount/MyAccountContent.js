import React, { memo } from 'react';
import {
  Row, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';
import Loading from '../../util/Loading';
import MyAccountReadForm from './MyAccountReadForm';
import MyAccountEditForm from './MyAccountEditForm';

const MyAccountContent = () => {
  const {
    ComponentMyAccountStore, UserStore, UtilLoadingStore,
  } = useStores();
  const {
    isAllValidationChecked, disabled,
  } = ComponentMyAccountStore;
  const { updateInfo } = UserStore;
  const { loading } = UtilLoadingStore;

  return (
    <>
      <Loading loading={loading} />
      <FormWrapper loading={loading}>
        <Row>
          <MyAccountReadForm />
          <MyAccountEditForm />
        </Row>
        <FormButton color="danger" onClick={updateInfo} disabled={!isAllValidationChecked || disabled}>수정</FormButton>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
  padding: 25px;
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
