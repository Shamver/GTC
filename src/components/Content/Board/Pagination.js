import * as Proptypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Pagination } from 'reactstrap';
import { observer } from 'mobx-react';
import PaginationList from './PaginationList';

const BoardPagination = ({ noPagination }) => (
  <PaginationCustom>
    <PaginationList noPagination={noPagination} />
  </PaginationCustom>
);

BoardPagination.propTypes = {
  noPagination: Proptypes.bool,
};

BoardPagination.defaultProps = {
  noPagination: false,
};

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

export default memo(observer(BoardPagination));
