import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import FavoriteDropdown from './FavoriteDropdown';
import PlayDropdown from './PlayDropdown';
import LatelyDropdown from './LatelyDropdown';

const SidebarContent = () => (
  <HeaderWrapper>
    <LeftSpan>
      <FontAwesomeIcon icon={faBars} />
    </LeftSpan>
    <RightSpan>
      <FontAwesomeIcon icon={faUser} /> 로그인
    </RightSpan>
    <br/>
    <LatelyDropdown />
    <FavoriteDropdown />
    <PlayDropdown />
  </HeaderWrapper>
);

const LeftSpan = styled.span`
  float: left;
`;

const RightSpan = styled.span`
  float: right;
`;

const HeaderWrapper = styled.div`
  padding : 10px;
`;

export default SidebarContent;
