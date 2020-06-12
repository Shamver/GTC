import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import PostList from './Post/PostList';
import useStores from '../../../stores/useStores';

const BoardContent = ({ isFooter }) => {
  const { BoardStore } = useStores();
  const { currentBoardPath } = BoardStore;

  return (
    <>
      <HeaderDiv>
        <NavLink activeClassName="active" to={`/${currentBoardPath}`}>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink activeClassName="active" to={`/${currentBoardPath}/freedom`}>자유</NavLink>
        <NavLink activeClassName="active" to={`/${currentBoardPath}/talk`}>잡담</NavLink>
        <NavLink activeClassName="active" to={`/${currentBoardPath}/toron`}>토론</NavLink>
        <NavLink activeClassName="active" to={`/${currentBoardPath}/gunhee`}>건의</NavLink>
      </HeaderDiv>
      <ManginessTable bordered hover size="sm">
        <tbody>
          {!isFooter && (<PostList isNotice />)}
          <PostList />
        </tbody>
      </ManginessTable>
    </>
  );
};

BoardContent.propTypes = {
  isFooter: Proptypes.bool,
};

BoardContent.defaultProps = {
  isFooter: false,
};

const ManginessTable = styled(Table)`
  margin : 0px !important;
  margin-top : 0px !important;
  border : none !important;
  
  & td:first-child {
    border-left : none;
  }
  
  & td:last-child {
    border-right : none;
  }
  
  & tr:hover {
    background-color : #fff7d9 !important;
  }
`;

const HeaderDiv = styled.div`
  border-top : 2px solid #DC3545;
  background-color : #ffd7d4;
  margin-top : 40px;

  & > a {
    display: inline-block;
    padding: 8px 18.3px;
    background-color : #ffd7d4;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    color : black;
  }
  
  & > a:hover {
    background-color : white;
    text-decoration: none;
    color : black;
  } 
  
  & > a.active {
    background-color : white;
  }
  
`;


export default memo(observer(BoardContent));
