import React, { memo } from 'react';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';

const Board = ({ data }) => {
  const { BoardPostStore } = useStores();
  const { searchOff } = BoardPostStore;

  return (
    <MenuLink to="/notice" onClick={searchOff} activeClassName="active">
      <MenuDiv>
        <FaiPink icon={faFlag} className="fa-fw" />&nbsp;&nbsp; 공지사항
      </MenuDiv>
    </MenuLink>
  );
};

const MenuLink = styled(NavLink)`
  color: black;
  padding: 2px 0px;
  margin : 0 !important;
  width : 100%;
  margin-bottom: 0px !important;
  transition: all 0.18s;
  border-bottom : 1px solid #e6e6e6;
  
  &:hover {
    background-color: #ffc8c4;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
  &.active {
    background-color : #ffd7d4;
  }
`;

const MenuDiv = styled.div`
  padding: 3px 13px;
`;

const FaiPink = styled(FontAwesomeIcon)`
  color: #f57c73;
`;

export default memo(observer(Board));
