import React from 'react';
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';
import styled from 'styled-components';

const BoardPagination = () => (
  <PaginationCustom>
    <PaginationItem active>
      <PaginationLink href="#">
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">
        3
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">
        4
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink next href="#" />
    </PaginationItem>
  </PaginationCustom>
);

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
  
  & .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #DC3545;
    border-color: #DC3545;
  }
`;

export default BoardPagination;
