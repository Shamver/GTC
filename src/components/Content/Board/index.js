import React, { useLayoutEffect, useEffect, memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import qs from 'query-string';
import { observer } from 'mobx-react';
import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';
import BoardFooter from './BoardFooter';
import useStores from '../../../stores/useStores';

const Board = ({ parentProps, location, match }) => {
  const { BoardStore, BoardPostStore, UtilLoadingStore } = useStores();

  const {
    setCurrentBoardPath, setCurrentBoardPage, setIsPagination,
    getBoardCategoryList, setIsBestFilter,
  } = BoardStore;
  const { getBoardPostNoticeList, getBoardPostList } = BoardPostStore;
  const { loadingProcess } = UtilLoadingStore;

  const { params } = match;
  const { board } = params;
  let { page, category } = params;
  let { isPagination } = parentProps;
  const query = qs.parse(location.search);
  const isBestFilter = !!query.filter_mode;

  category = category || '';
  isPagination = !!isPagination;
  page = page || '1';

  useEffect(() => {
    setCurrentBoardPath(board);
    setCurrentBoardPage(page);
    setIsPagination(isPagination);
    setIsBestFilter(isBestFilter);
  }, [
    setCurrentBoardPath, setCurrentBoardPage, setIsPagination,
    board, page, isPagination, setIsBestFilter, isBestFilter,
  ]);

  useLayoutEffect(() => {
    loadingProcess([
      () => getBoardCategoryList(board, category),
      () => getBoardPostNoticeList(board, page),
      () => getBoardPostList(board, category, page, isBestFilter),
    ]);
  }, [
    getBoardCategoryList, getBoardPostNoticeList, getBoardPostList,
    board, page, category, loadingProcess, query, isBestFilter,
  ]);

  return (
    <BoardWrapper>
      <TableWrapper>
        <BoardHeader />
        <BoardContent />
        <BoardFooter category={category} />
      </TableWrapper>
    </BoardWrapper>
  );
};

Board.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      board: Proptypes.string,
      category: Proptypes.string,
      page: Proptypes.string,
    }).isRequired,
  }).isRequired,
  parentProps: Proptypes.shape({
    isPagination: Proptypes.bool,
  }).isRequired,
  location: Proptypes.shape({
    search: Proptypes.string,
  }).isRequired,
};

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
  @media (max-width: 992px) {
    padding : 0px;
  }
`;

export default memo(observer(Board));
