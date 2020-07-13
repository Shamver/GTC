import React, { memo } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const PostLockerNav = ({ currentTab }) => {
  const { ComponentPostLockerStore } = useStores();
  const { onActive } = ComponentPostLockerStore;

  return (
    <Nav tabs>
      <NavItem>
        <NavLinkBtn
          className={currentTab === 'myPost' ? 'active' : ''}
          onClick={onActive}
          name="myPost"
        >
          내가 쓴 글
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={currentTab === 'myReply' ? 'active' : ''}
          onClick={onActive}
          name="myReply"
        >
          내가 쓴 댓글
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={currentTab === 'favorite' ? 'active' : ''}
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

PostLockerNav.propTypes = {
  currentTab: Proptypes.string,
};

PostLockerNav.defaultProps = {
  currentTab: 'myPost',
};

export default memo(observer(PostLockerNav));
