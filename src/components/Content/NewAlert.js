import React, { useEffect } from 'react';
import {
  Container, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStores from '../../stores/useStores';

const MainContainer = styled(Container)`
  background-color: white;
  padding: 1rem !important;
`;

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

const AlertWrapper = styled.div`
  padding: 6px 8px;
  border-bottom: 1px solid #dddfe2;
  display: flex;
  width: 100%;
  
  &:hover {
    background: linear-gradient(rgba(29,33,41,.04),rgba(29,33,41,.04));
  }
`;

const AlertBox = styled.div`
  flex: 1;
`;

const AlertActionBox = styled.div`
  width: 80px;
  text-align: right;
`;

const Atag = styled.a`
  display: block;
  text-decoration: none !important;
  color: #666 !important;
`;

const DateSpan = styled.span`
  font-size: 0.8rem;
  color: #a9a;
`;

const DeleteA = styled.a`
  color: #333;
  text-decoration: none;
  padding: 4px 8px;
`;

const NewAlert = () => {
  const {} = useStores();

  useEffect(() => {
  }, []);

  return (
    <MainContainer>
      <NotifyHeader>
        <FlexDiv>
          <H4>내 알림</H4>
          <Hr width={120} />
        </FlexDiv>
        <ReadAll>
          <ReadAllButton>
						모두 읽음 처리
          </ReadAllButton>
        </ReadAll>
      </NotifyHeader>
      <AlertWrapper>
        <AlertBox>
          <Atag href="#">
            <strong>인욱쿤</strong>님이 <strong>인벤 앞 한 장 정리 짤</strong>에 새 댓글을 달았습니다: 표정 곱창났네 ㅋㅋ
          </Atag>
          <DateSpan>2달 전</DateSpan>
        </AlertBox>
        <AlertActionBox>
          <DeleteA href="#">
            <FontAwesomeIcon icon={faTimes} />
          </DeleteA>
        </AlertActionBox>
      </AlertWrapper>
    </MainContainer>
  );
};

export default observer(NewAlert);
