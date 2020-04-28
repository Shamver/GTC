import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import FavoriteDropdown from './FavoriteDropdown';
import PlayDropdown from './PlayDropdown';
import LatelyDropdown from './LatelyDropdown';

const SidebarContent = () => (
  <>
    <HeaderWrapper>
      <TopWrapper>
        <LeftSpan>
          <TopIcon icon={faBars} />
        </LeftSpan>
        <RightSpan>
          <FontAwesomeIcon icon={faUser} /> 로그인
        </RightSpan>
      </TopWrapper>
      <br />
      <LatelyDropdown />
      <FavoriteDropdown />
      <PlayDropdown />
      <br />
    </HeaderWrapper>
    <MiddleLabel>
      GTC 전체 메뉴
    </MiddleLabel>
    <BottomMenu>
      <MarginlessRow>
        <Col xs="6">
          전체 글 보기
          <Hr />
          <StylelessUl>
            <MarginList>자유게시판</MarginList>
            <MarginList>아이템 거래</MarginList>
            <MarginList>월드락 거래</MarginList>
            <MarginList>신고 게시판</MarginList>
          </StylelessUl>
        </Col>
        <Col xs="6">
          공지사항
          <Hr />
          <StylelessUl>
            <MarginList>질문 & 답변</MarginList>
            <MarginList>자주 묻는 질문</MarginList>
            <MarginList>1:1 문의</MarginList>
          </StylelessUl>
        </Col>
      </MarginlessRow>
    </BottomMenu>
  </>
);

const MarginList = styled.li`
  margin : 5px 0px;
`;

const StylelessUl = styled.ul`
  list-style: none;
  padding: 0px !important;
`;

const MarginlessRow = styled(Row)`
  margin : 0 !important; 
`;

const Hr = styled.hr`
  background-color : #f3f2f0;
`;

const BottomMenu = styled.div`
  font-size : 16px;
`;

const MiddleLabel = styled.div`
  background-color : white;
  color : black;
  padding: 5px 12px;
  margin-bottom : 10px;
  font-size : 16px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.5);
`;

const TopIcon = styled(FontAwesomeIcon)`
  vertical-align : top;
`;

const TopWrapper = styled.div`
  margin-bottom : 20px;
`;

const LeftSpan = styled.span`
  font-size : 22px;
  float: left;
`;

const RightSpan = styled.span`
  float: right;
`;

const HeaderWrapper = styled.div`
  font-size : 16px;
  padding : 10px;
`;

export default SidebarContent;
