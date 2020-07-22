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

const CategoryLink = ({
  currentBoardPath,
  categories,
  category,
}) => {
  const { name, path } = categories[category.code];
  return (<NavLink activeClassName="active" to={`/${currentBoardPath}/${path}`}>{name}</NavLink>);
};

CategoryLink.propTypes = {
  currentBoardPath: Proptypes.string,
  categories: Proptypes.shape({
    name: Proptypes.string,
    path: Proptypes.string,
  }).isRequired,
  category: Proptypes.string,
};

CategoryLink.defaultProps = {
  currentBoardPath: 'free',
  category: 'freedom',
};

const BoardContent = ({ isFooter }) => {
  const { BoardStore } = useStores();
  const { currentBoardPath, categories, currentBoardCategories } = BoardStore;

  const categoryLinks = currentBoardCategories.map(
    (v) => (
      <CategoryLink
        currentBoardPath={currentBoardPath}
        categories={categories}
        category={v}
        key={v}
      />
    ),
  );

  return (
    <>
      <HeaderDiv>
        <NavLink activeClassName="active" to={`/${currentBoardPath}`}>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        { categoryLinks }
      </HeaderDiv>
      <ManginessTable bordered hover size="sm">
        <tbody>
          {!isFooter && <PostList isNotice />}
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
  table-layout: fixed;
  
  & td:first-child {
    border-left : none;
  }
  
  & td:last-child {
    border-right : none;
  }
  
  @media (max-width: 992px) {
    & td:last-child {
      border-left : none;
    }
    & td:first-child {
      border-right : none;
    }
  }
`;

const HeaderDiv = styled.div`
  border-top: 2px solid #DC3545;
  background-color: #ffd7d4;
  margin-top: 40px;
  
  @media (max-width: 992px) {
    margin-top: 15px;
  }

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
