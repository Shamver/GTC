import React from 'react';
import {
  TabPane, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const MailSend = () => {


  return (
    <TabPane tabId="send">
      <SendWrapper>
        <p>GTC 닉네임</p>
        <input type="text" />
        <p>GTC에 가입되어 있는 아이디에만 쪽지 전송이 가능합니다.</p>
        <br />
        <p>쪽지 내용</p>
        <input type="textarea" />
        <Button
          color="primary"
          onClick={() => {}}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> 쪽지 보내기
        </Button>
      </SendWrapper>
    </TabPane>
  );
};

const SendWrapper = styled.div`
  padding-top: 8px;
`;

export default MailSend;
