import React from 'react';
import {
  Nav, NavItem, NavLink,
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const SettingNav = () => {
  const { ComponentSettingStore } = useStores();
  const { activeTab, onActive } = ComponentSettingStore;

  return (
    <Nav tabs>
      <NavItem>
        <NavLinkBtn
          className={(activeTab === 'ignore' ? 'active' : '')}
          onClick={onActive}
          name="ignore"
        >
          차단 목록
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={(activeTab === 'withdrawal' ? 'active' : '')}
          onClick={onActive}
          name="withdrawal"
        >
          회원탈퇴
        </NavLinkBtn>
      </NavItem>
    </Nav>
  );
};

const NavLinkBtn = styled(NavLink)`
  padding: 10px 15px !important;
  border: 1px solid transparent !important;
  margin-right: 2px;
  
  &:hover {
    cursor: pointer;
    border-color: #eee #eee #ddd;
    background-color: #eee;
  }
  
  &.active {
    cursor: default;
    border: 1px solid #c9c9c9 !important;
    border-bottom-color: transparent !important;
  }
`;

export default SettingNav;
