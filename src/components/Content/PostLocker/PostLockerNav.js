import React, { memo } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const PostLockerNav = () => {
  const { ComponentPostLockerStore } = useStores();
  const { activeTab, onActive } = ComponentPostLockerStore;

  return (
    <Nav tabs>
      <NavItem>
        <NavLinkBtn
          className={activeTab === 'myPost' ? 'active' : ''}
          onClick={onActive}
          name="myPost"
        >
          내가 쓴 글
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={activeTab === 'myReply' ? 'active' : ''}
          onClick={onActive}
          name="myReply"
        >
          내가 쓴 댓글
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={activeTab === 'favorite' ? 'active' : ''}
          onClick={onActive}
          name="favorite"
        >
          즐겨찾은 게시물
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

export default memo(observer(PostLockerNav));
