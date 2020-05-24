import React from 'react';
import { PaginationItem } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';

const ProfilePaginationList = observer(({ rows, index, req }) => {
  const arr = new Array(rows);

  for (let i = 1; i <= rows; i += 1) {
    arr.push(
      <CustomPaginationItem active={i === index} key={i}>
        <CustomLink className="page-link" activeClassName="active" onClick={() => req(i)}>
          {i}
        </CustomLink>
      </CustomPaginationItem>,
    );
  }

  return arr;
});

const ModalPagination = ({ rows, pageIndex, req }) => (
  <PaginationListWrap>
    <ProfilePaginationList rows={rows} index={pageIndex} req={req} />
  </PaginationListWrap>
);

ModalPagination.propTypes = {
  rows: Proptypes.number,
  pageIndex: Proptypes.number,
  req: Proptypes.func,
};

ModalPagination.defaultProps = {
  rows: 1,
  pageIndex: 1,
  req: 'req(1)',
};

const PaginationListWrap = styled.ul`
  padding: 0;
  margin: 0 auto;
  text-align: center;
  
  & .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #DC3545;
    border-color: #DC3545;
  }
`;

const CustomPaginationItem = styled(PaginationItem)`
  list-style: none;
  display: inline-block;
  
  & .page-link {
    z-index: 1;
    color: #DC3545;
    cursor: pointer;
  }
  
  & .page-link:hover {
    z-index: 1;
    color: #DC3545;
    cursor: pointer;
  }
`;

const CustomLink = styled.span`
  text-decoration: none;
`;

export default ModalPagination;
