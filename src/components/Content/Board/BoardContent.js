import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import PostList from './Post/PostList';

const BoardContent = ({
  path, currentPage, isFooter, query,
}) => (
  <>
    <Div>
      <HeaderDiv>
        <NavLink activeClassName="active" to={`/${path}`}>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink activeClassName="active" to={`/${path}/freedom`}>자유</NavLink>
        <NavLink activeClassName="active" to={`/${path}/talk`}>잡담</NavLink>
        <NavLink activeClassName="active" to={`/${path}/toron`}>토론</NavLink>
        <NavLink activeClassName="active" to={`/${path}/gunhee`}>건의</NavLink>
      </HeaderDiv>
      <ManginessTable bordered hover size="sm">
        <tbody>
          { !isFooter ? (<PostList path={path} isNotice />) : '' }
          <PostList path={path} currentPage={currentPage} query={query} />
        </tbody>
      </ManginessTable>
    </Div>
  </>
);

BoardContent.propTypes = {
  path: Proptypes.string.isRequired,
  currentPage: Proptypes.string,
  isFooter: Proptypes.bool.isRequired,
  query: Proptypes.shape({
    filter_mode: Proptypes.bool,
  }),
};

BoardContent.defaultProps = {
  currentPage: null,
  query: '{filter_mode : false}',
};

const Div = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
`;

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
<<<<<<< HEAD
    background-color : #fff7d9 !important;
=======
    background-color : #fff7d9;
>>>>>>> feat/notice
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


export default observer(BoardContent);
