import React, { memo } from 'react';
import {
  TabPane, Button, Input,
} from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const MailSend = () => {
  const { UserMailStore } = useStores();
  const {
    mailForm, onChangeValue, sendMail,
  } = UserMailStore;
  const { mailTo, mailText } = mailForm;

  return (
    <TabPane tabId="send">
      <SendWrapper>
        <TitleText><b>GTC 닉네임</b></TitleText>
        <Input type="text" placeholder="GTC 닉네임 입력" name="mailTo" value={mailTo} onChange={onChangeValue} />
        <SubText>GTC에 가입되어 있는 아이디에만 쪽지 전송이 가능합니다.</SubText>
        <TitleText><b>쪽지 내용</b></TitleText>
        <Input type="textarea" placeholder="쪽지 내용을 입력하세요" name="mailText" value={mailText} onChange={onChangeValue} />
        <SendBtn color="danger" onClick={sendMail}>
          <FontAwesomeIcon icon={faTelegramPlane} size="lg" /> 쪽지 보내기
        </SendBtn>
      </SendWrapper>
    </TabPane>
  );
};

const SendBtn = styled(Button)`
  padding: 6px 12px !important;
  margin-top: 16px;
`;

const TitleText = styled.p`
  margin-bottom: 6px;
`;

const SubText = styled.p`
  margin-top: 6px;
  color: #737373;
`;

const SendWrapper = styled.div`
  padding-top: 8px;
`;

export default memo(observer(MailSend));
