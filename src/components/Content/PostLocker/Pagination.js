import React, { memo, useEffect } from 'react';
import { PaginationItem, Pagination } from 'reactstrap';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const PaginationList = ({
  currentPage, noPagination, maxPage, path,
}) => {
  const currentPageNum = parseInt(currentPage, 0);
  const min = (currentPageNum - 3) <= 0 ? 1 : currentPageNum - 3;
  const max = (currentPageNum + 3) > maxPage ? maxPage : currentPageNum + 3;
  const array = new Array((max - min) + 1 < 0 ? 0 : (max - min) + 1);

  if (currentPage > 1) {
    array.push(
      <PaginationItem key={0}>
        <CustomLink className="page-link" activeClassName="active" to={`/postlocker/${path}/${currentPageNum - 1}`}>
          <SmallSpan>
            ＜
          </SmallSpan>
        </CustomLink>
      </PaginationItem>,
    );
  }

  for (let i = min; i <= max; i += 1) {
    array.push(
      <PaginationItem active={i === 1 && noPagination} key={i}>
        <CustomLink className="page-link" activeClassName="active" to={`/postlocker/${path}/${i}`}>
          {i}
        </CustomLink>
      </PaginationItem>,
    );
  }

  if (currentPageNum !== maxPage) {
    array.push(
      <PaginationItem key={-1}>
        <CustomLink className="page-link" activeClassName="active" to={`/postlocker/${path}/${currentPageNum + 1}`}>
          <SmallSpan>
            ＞
          </SmallSpan>
        </CustomLink>
      </PaginationItem>,
    );
  }

  // 추후 max 값 조정후 추가
  return array;
};

PaginationList.propTypes = {
  currentPage: Proptypes.string,
  noPagination: Proptypes.bool,
};

PaginationList.defaultProps = {
  noPagination: false,
  currentPage: '1',
};


const PostLockerPagination = ({
  noPagination, currentPage, maxPage, path,
}) => {
  const { UserPointStore } = useStores();
  const { currentPointMaxPage } = UserPointStore;

  useEffect(() => {

  }, [currentPointMaxPage]);

  return (
    <PaginationCustom>
      <PaginationList
        currentPage={currentPage}
        noPagination={noPagination}
        maxPage={maxPage}
        path={path}
      />
    </PaginationCustom>
  );
};
PostLockerPagination.propTypes = {
  noPagination: Proptypes.bool,
  currentPage: Proptypes.string,
  maxPage: Proptypes.number,
  path: Proptypes.string,
};

PostLockerPagination.defaultProps = {
  noPagination: false,
  currentPage: '1',
  maxPage: 1,
  path: 'myPost',
};

const SmallSpan = styled.span`
  font-size: 0.8rem;
`;

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

export default memo(observer(PostLockerPagination));
