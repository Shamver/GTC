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

const MainRow = styled(Row)`
  
`;

const MenuContainerCol = styled(Col)`
  border : 1px solid green;
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

const MenuTop = styled.div`

`;

const Content = () => (
  <MainContainer>
    <MenuWrapper>
      <MenuRow>
        <FontAwesomeIcon icon={faFlag} />&nbsp;&nbsp; 공지사항
      </MenuRow>
      <MenuRow>
        <FontAwesomeIcon icon={faList} />&nbsp;&nbsp; 전체글 보기
      </MenuRow>
      <MenuRow>
        <FontAwesomeIcon icon={faGlobeAsia} />&nbsp;&nbsp; 자유 게시판
      </MenuRow>
    </MenuWrapper>
  </MainContainer>
);

export default Content;
