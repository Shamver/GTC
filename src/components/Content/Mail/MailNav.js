import React from 'react';
import {
  Nav, NavItem, NavLink,
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const MailNav = () => {
  const { ComponentMailStore } = useStores();
  const { activeTab, onActive } = ComponentMailStore;

  return (
    <Nav tabs>
      <NavItem>
        <NavLinkBtn
          className={(activeTab === 'get' ? 'active' : '')}
          onClick={onActive}
          name="get"
        >
          받은 쪽지
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={(activeTab === 'sent' ? 'active' : '')}
          onClick={onActive}
          name="sent"
        >
          보낸 쪽지
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={(activeTab === 'send' ? 'active' : '')}
          onClick={onActive}
          name="send"
        >
          쪽지 보내기
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

export default MailNav;
