import React, { useState } from 'react';
import styled from 'styled-components';
import {
  InputGroup, InputGroupAddon, Button, Input,
  Container, Row, Col, Badge,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { faFlag, faList, faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import { faClock, faSmile, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainContainer = styled(Container)`
  padding : 0px !important;
`;

const MenuWrapper = styled(Row)`
  border : 1px solid red;
  margin : 0 !important;
`;

const MenuRow = styled(Row)`
  padding: 0px 0px;
  margin : 0 !important;
  border : 1px solid black;
  width : 100%;
`;

const MenuDiv = styled.div`
  padding: 2px 10px;
`;

const Category = () => (
  <MainContainer>
    <MenuWrapper>
      <MenuRow>
        <MenuDiv>
          <FontAwesomeIcon icon={faFlag} />&nbsp;&nbsp; 공지사항
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FontAwesomeIcon icon={faList} />&nbsp;&nbsp; 전체글 보기
        </MenuDiv>
      </MenuRow>
      <MenuRow>
        <MenuDiv>
          <FontAwesomeIcon icon={faGlobeAsia} />&nbsp;&nbsp; 자유 게시판
        </MenuDiv>
      </MenuRow>
    </MenuWrapper>
  </MainContainer>
);

export default Category;
