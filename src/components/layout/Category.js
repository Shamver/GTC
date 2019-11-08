import React, { useState } from 'react';
import styled from 'styled-components';
import {
  InputGroup, InputGroupAddon, Button, Input,
  Container, Row, Col, Badge,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import {
  faBars, faFlag, faList, faGlobeAsia, faTshirt, faLock, faQuestion, faComments, faAt,
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faSmile, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainContainer = styled(Container)`
  padding : 0px !important;
`;

const MenuWrapper = styled(Row)`
  margin : 0 !important;
`;

const MenuRow = styled(Row)`
  padding: 0px 0px;
  margin : 0 !important;
  width : 100%;
  margin-bottom: 3px !important;
  transition: all 0.2s;
  &:hover {
    background-color: #ffd7d4;
    cursor: pointer;
  }
`;

const MenuDiv = styled.div`
  padding: 3px 13px;
  font-weight: 300;
`;

const MenuRowTop = styled(MenuRow)`
  background-color: #DC3545;
  &:hover {
    background-color: #DC3545;
    cursor: default;
  }
`;

const MenuDivTop = styled(MenuDiv)`
  font-weight: bold; 
  color: white;
`;

const FaiPink = styled(FontAwesomeIcon)`
  color: #f57c73;
`;

const Category = () => (
  <MainContainer>
    <MenuWrapper>
      <MenuRowTop>
        <MenuDivTop>
          <FontAwesomeIcon icon={faBars} className="fa-fw" />&nbsp;&nbsp; GTC 전체 메뉴
        </MenuDivTop>
      </MenuRowTop>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faFlag} className="fa-fw" />&nbsp;&nbsp; 공지사항
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faList} className="fa-fw" />&nbsp;&nbsp; 전체글 보기
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faGlobeAsia} className="fa-fw" />&nbsp;&nbsp; 자유 게시판
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faTshirt} className="fa-fw" />&nbsp;&nbsp; 아이템 거래
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faLock} className="fa-fw" />&nbsp;&nbsp; 월드락 거래
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faComments} className="fa-fw" />&nbsp;&nbsp; 질문&답변
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faQuestion} className="fa-fw" />&nbsp;&nbsp; 자주 묻는 질문
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FaiPink icon={faAt} className="fa-fw" />&nbsp;&nbsp; 1:1 문의
        </MenuDiv>
      </MenuRow>
    </MenuWrapper>
  </MainContainer>
);

export default Category;
