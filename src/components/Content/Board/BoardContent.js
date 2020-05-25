import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import PostList from './Post/PostList';

const BoardContent = ({ path, currentPage }) => (
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
          <PostList path={path} currentPage={currentPage} />
        </tbody>
      </ManginessTable>
    </Div>
  </>
);

BoardContent.propTypes = {
  path: Proptypes.string.isRequired,
  currentPage: Proptypes.string,
};

BoardContent.defaultProps = {
  currentPage: null,
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


export default observer(BoardContent);
