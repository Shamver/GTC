import React from 'react';
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BoardPagination = ({ path, noPagination }) => (
  <PaginationCustom>
    <PaginationItem active={noPagination}>
      <CustomLink className="page-link" activeClassName="active" to={'/'.concat(path).concat('/page/1')}>
        1
      </CustomLink>
    </PaginationItem>
    <PaginationItem>
      <CustomLink className="page-link" activeClassName="active" to={'/'.concat(path).concat('/page/2')}>
        2
      </CustomLink>
    </PaginationItem>
    <PaginationItem>
      <CustomLink className="page-link" activeClassName="active" to={'/'.concat(path).concat('/page/3')}>
        3
      </CustomLink>
    </PaginationItem>
    <PaginationItem>
      <CustomLink className="page-link" activeClassName="active" to={'/'.concat(path).concat('/page/4')}>
        4
      </CustomLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink next href="#" />
    </PaginationItem>
  </PaginationCustom>
);

BoardPagination.propTypes = {
  path: Proptypes.string.isRequired,
  noPagination: Proptypes.bool,
};

BoardPagination.defaultProps = {
  noPagination: false,
};


const CustomLink = styled(NavLink)`
  &.active {
    z-index: 1;
    color: #fff !important;
    background-color: #DC3545;
    border-color: #DC3545;
  }
  
  &.active:hover {
    background-color: #DC3545;
    border-color: #DC3545;
  } 
`;


const PaginationCustom = styled(Pagination)`
  color : #DC3545;
  width : max-content;
  margin : 0 auto;
  margin-top : 20px;
  
  & ul {
    margin : 0px;
  }
  
  & .page-link {
    color: #DC3545;
  }
  
  & .page-link:hover {
    color: #DC3545;
  } 
  
  & .page-link:focus {
    box-shadow: none;
  } 
  
  & .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #DC3545;
    border-color: #DC3545;
  }
`;

export default BoardPagination;
