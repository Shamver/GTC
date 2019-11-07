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
  
`;

const MainRow = styled(Row)`
  
`;

const MenuContainerCol = styled(Col)`
  border : 1px solid green;
`;

const MenuWrapper = styled(Row)`
  border : 1px solid red;
`;

const MenuCol = styled(Col)`
  padding: 1px 0px;
  border : 1px solid black;
`;

const MenuTop = styled.div`

`;

const Content = () => (
  <MainContainer>
    <MainRow>
      <MenuContainerCol xs="2">
        <MenuWrapper>
          <MenuCol xs={12}>
            <MenuTop>
              <FontAwesomeIcon icon={faFlag} />&nbsp;&nbsp; 공지사항
            </MenuTop>
          </MenuCol>
          <MenuCol xs={12}>
            <MenuTop>
              <FontAwesomeIcon icon={faList} />&nbsp;&nbsp; 전체글 보기
            </MenuTop>
          </MenuCol>
          <MenuCol xs={12}>
            <MenuTop>
              <FontAwesomeIcon icon={faGlobeAsia} />&nbsp;&nbsp; 자유 게시판 
            </MenuTop>
          </MenuCol>
        </MenuWrapper>
      </MenuContainerCol>
    </MainRow>
  </MainContainer>
);

export default Content;
