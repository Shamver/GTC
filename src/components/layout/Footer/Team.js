import React, { memo } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';

const Team = () => (
  <MainContainer>
    <h3>관리자 모집</h3>
    <Description>
      <p>사무실: 강남 한복판</p>
      <p>연봉: 기본급 8천만원</p>
      <p>복지: 말하는대로</p>
      <p>주 3시간 근무제</p>
      <p>자율 출퇴근</p>
    </Description>
  </MainContainer>
);

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 1rem !important;
`;

const Description = styled.div`
  & p{
    font-weight: 300;
    font-size: 15px;
  }
`;

export default memo(Team);
