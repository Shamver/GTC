import React, { memo } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const ConsultNav = () => {
  const activeTab = 'send';
  return (
    <Nav tabs>
      <NavItem>
        <NavLinkBtn className={activeTab === 'send' ? 'active' : ''} name="send">
          문의 하기
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn className={activeTab === 'sent' ? 'active' : ''} name="sent">
          문의 내역
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

export default memo(observer(ConsultNav));
