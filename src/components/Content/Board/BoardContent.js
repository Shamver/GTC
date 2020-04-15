import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

import Loading from '../../util/Loading';
import PostList from './Post/PostList';
import Post from './Post';

const BoardContent = ({ path, currentPage }) => {
  const { UtilLoadingStore } = useStores();
  const { loading, doLoading } = UtilLoadingStore;

  useEffect(() => {
    doLoading();
  }, [doLoading]);

  const tempData = {
    id: 1,
    title: '공지 채팅창 제재 기준입니다. (2018. 10. 19)',
    writer: '배진영',
    type: 'notice',
    date: '01-28',
    categoryName: '공지',
    recommendCount: 0,
    replyCount: 0,
  };

  return (
    <>
      <Loading loading={loading} />
      <Div loading={loading}>
        <HeaderDiv>
          <NavLink activeClassName="active" to={`/${path}`}>
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
          <NavLink activeClassName="active" to={`/${path}/freedom`}>자유</NavLink>
          <NavLink activeClassName="active" to={`/${path}/talk`}>잡담</NavLink>
          <NavLink activeClassName="active" to={`/${path}/toron`}>토론</NavLink>
          <NavLink activeClassName="active" to={`/${path}/gunhee`}>건의</NavLink>
        </HeaderDiv>
        <ManginessTableNoBorder bordered hover size="sm">
          <tbody>
            <Post data={tempData} index={-1} />
          </tbody>
        </ManginessTableNoBorder>
        <ManginessTable bordered hover size="sm">
          <tbody>
            <PostList path={path} currentPage={currentPage} />
          </tbody>
        </ManginessTable>
      </Div>
    </>
  );
};

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
    background-color : #fafafa !important;
  }
`;


const ManginessTableNoBorder = styled(ManginessTable)`
  & tr,td {
    border-bottom: none !important;
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
