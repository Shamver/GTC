import React from 'react';
import {
  TabPane, CustomInput, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import useStores from '../../../stores/useStores';

const SettingWithdrawal = () => {
  const {
    ComponentSettingStore, UserStore2, UtilAlertStore,
  } = useStores();

  const {
    withdrawal,
  } = UserStore2;

  const {
    onClickWithdrawal, isCheckedWithdrawal,
  } = ComponentSettingStore;

  const {
    toggleConfirmAlert,
  } = UtilAlertStore;

  return (
    <TabPane tabId="withdrawal">
      <WithdrawalWrapper>
        <h3>GTC 회원탈퇴 안내</h3>
        <Hr width={120} />
        <div>
          <P>
            <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
            회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해 주세요.
          </P>
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} />&nbsp;
            탈퇴 후, 30일 동안 재가입이 불가능하며 당연히 로그인도 불가능합니다.
          </p>
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} />&nbsp;
            탈퇴일을 기준으로 30일 이후에 재가입이 가능합니다.
          </p>
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} />&nbsp;
            탈퇴일 기준 30일 이후에는 개인정보와 관련된 데이터가 모두 삭제됩니다.
          </p>
        </div>
        <Hr width={120} />
        <CustomInput
          type="checkbox"
          id="withdrawalIsChecked"
          name="withdrawalIsChecked"
          onClick={onClickWithdrawal}
          label="위 내용을 충분히 이해했으며, 회원탈퇴를 진행하겠습니다."
        />
        <br />
        <Button
          color="danger"
          onClick={() => {
            isCheckedWithdrawal(() => {
              toggleConfirmAlert('정말 삭제하시겠어요?', () => {
                withdrawal();
              });
            });
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> 회원탈퇴
        </Button>
      </WithdrawalWrapper>
    </TabPane>
  );
};

const WithdrawalWrapper = styled.div`
  padding-top: 8px;
`;

const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  margin-left: 0px;
`;

const P = styled.p`
  color: #c00;
`;

export default SettingWithdrawal;
