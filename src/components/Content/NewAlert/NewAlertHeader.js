import React from 'react';

import styled from 'styled-components';

import { Button } from 'reactstrap';

import useStores from '../../../stores/useStores';

const NewAlertHeader = () => {
  const {
    UtilAlertStore, UserAlertStore,
  } = useStores();

  const {
    toggleConfirmAlert,
  } = UtilAlertStore;

  const {
    onReadAlertAll,
  } = UserAlertStore;

  return (
    <NotifyHeader>
      <FlexDiv>
        <H4>내 알림</H4>
        <Hr width={120} />
      </FlexDiv>
      <ReadAll>
        <ReadAllButton onClick={() => { toggleConfirmAlert('모두 읽음 처리 하시겠습니까?', onReadAlertAll); }}>
          모두 읽음 처리
        </ReadAllButton>
      </ReadAll>
    </NotifyHeader>
  );
};

const NotifyHeader = styled.div`
  width: 100%;
  display: flex;
`;

const FlexDiv = styled.div`
  flex: 1;
`;

const H4 = styled.h4`
  padding: 0 !important;
  margin: 0 !important;
`;

const Hr = styled.hr`
  margin-top: 22px;
  margin-bottom: 20px;
  margin-left: 0;
  border: 0;
  border-top: 1px solid #eee;
`;

const ReadAll = styled.div`
  flex: none;
  width: 140px;
  text-align: right;
`;

const ReadAllButton = styled(Button)`
  background-color: white !important;
  color: black !important;
  border-color: #ccc !important;
  
  &:hover {
    background-color: #e6e6e6 !important;
    border-color: #adadad !important;
  }
`;

export default NewAlertHeader;
