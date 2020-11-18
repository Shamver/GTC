import React, { memo } from 'react';
import { PaginationItem } from 'reactstrap';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';

const BoardPaginationList = ({ category }) => {
  const { BoardPostStore, BoardStore } = useStores();
  const { currentBoardMaxPage } = BoardPostStore;
  const {
    bestFilterMode, currentBoardPath, currentBoardPage, isPagination,
    searchMode, searchKeyword, searchTarget,
  } = BoardStore;

  const currentPageNum = Number(currentBoardPage);
  const min = (currentPageNum - 3) <= 0 ? 1 : currentPageNum - 3;
  let max = (currentPageNum + 3) > currentBoardMaxPage ? currentBoardMaxPage : currentPageNum + 3;
  max = min > max ? min : max;
  const array = new Array((max - min) + 1 < 0 ? 0 : (max - min) + 1);
  let url = `/${currentBoardPath}/`;
  if (category) {
    url += `${category}/`;
  }
  url += 'page/';

  let filterUrl;

  if (bestFilterMode && searchMode) {
    filterUrl = `?filter_mode=true&search=${searchKeyword}&search_target=${searchTarget}`;
  } else if (searchMode) {
    filterUrl = `?search=${searchKeyword}&search_target=${searchTarget}`;
  } else if (bestFilterMode) {
    filterUrl = '?filter_mode=true';
  } else {
    filterUrl = '';
  }

  // 1이 아닌이상 무조건 < 페이지는 표시해야 함.
  if (currentPageNum > 1) {
    array.push(
      <PaginationItem key={0}>
        <CustomLink className="page-link" activeClassName="active" to={`${url}${currentPageNum - 1}${filterUrl}`}>
          ＜
        </CustomLink>
      </PaginationItem>,
    );
  }

  // 1부터 maximum 까지
  for (let i = min; i <= max; i += 1) {
    array.push(
      <PaginationItem active={(i === 1 && !isPagination) || currentPageNum === i} key={i}>
        <CustomLink className="page-link" activeClassName="active" to={`${url}${i}${filterUrl}`}>
          {i}
        </CustomLink>
      </PaginationItem>,
    );
  }

  // 현재 페이지가 맥시멈 페이지가 아니면 > 페이지 표시
  if (currentPageNum < currentBoardMaxPage) {
    array.push(
      <PaginationItem key={-1}>
        <CustomLink className="page-link" activeClassName="active" to={`${url}${currentPageNum + 1}${filterUrl}`}>
          ＞
        </CustomLink>
      </PaginationItem>,
    );
  }

  // 추후 max 값 조정후 추가
  return array;
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

BoardPaginationList.propTypes = {
  category: Proptypes.string.isRequired,
};

export default memo(observer(BoardPaginationList));
