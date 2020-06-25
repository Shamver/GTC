import React, { memo } from 'react';
import { PaginationItem } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';

const ProfilePaginationList = observer(({ rows, index, req, count, postStart}) => {
  const min = postStart;
  console.log(postStart)
  let max = min + 5 - 1;
  max = max > count ? count : max;
  const arr = new Array(max);

  // const min = (index - 3) <= 0 ? 1 : index - 3;
  // let max = (index + 3) > rows ? rows : index + 3;
  // max = min > max ? min : max;
  // const arr = new Array((max - min) + 1 < 0 ? 0 : (max - min) + 3);

  if (index > 1) {
    arr.push(
      <CustomPaginationItem key={0}>
        <CustomLink className="page-link" activeClassName="active" onClick={() => req(index - 1)}>
          ＜
        </CustomLink>
      </CustomPaginationItem>,
    );
  }

  for (let i = min; i <= max; i += 1) {
    arr.push(
      <CustomPaginationItem active={i === index} key={i}>
        <CustomLink className="page-link" activeClassName="active" onClick={() => req(i)}>
          {i}
        </CustomLink>
      </CustomPaginationItem>,
    );
  }

  if (index < count) {
    arr.push(
      <CustomPaginationItem key={-1}>
        <CustomLink className="page-link" activeClassName="active" onClick={() => req(index + 1)}>
          ＞
        </CustomLink>
      </CustomPaginationItem>,
    );
  }

  return arr;
});

const ModalPagination = ({ rows, pageIndex, req, count, postStart }) => (
  <PaginationListWrap>
    <ProfilePaginationList rows={rows} index={pageIndex} req={req} count={count} postStart={postStart} />
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

export default memo(ModalPagination);
