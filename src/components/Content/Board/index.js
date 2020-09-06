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
  const {
    BoardStore, BoardPostStore, UtilLoadingStore,
    SystemCodeStore,
  } = useStores();
  const { params } = match;
  const { board } = params;

  let { isPagination } = parentProps;
  let { currentPage, currentCategory } = params;
  isPagination = !!isPagination;
  currentPage = currentPage || '1';
  currentCategory = currentCategory || '';

  const { getCodeComponent } = SystemCodeStore;
  const { setClearPostView, getBoardPostNoticeList, getBoardPostList } = BoardPostStore;
  const { loadingProcess } = UtilLoadingStore;
  const {
    setCurrentBoardPath, judgeFilterMode, setCurrentBoardPage, currentBoardPath,
    setIsPagination, boardPathCheck, getBoardCategoryList,
  } = BoardStore;
  const query = qs.parse(location.search);

  useEffect(() => {
    boardPathCheck(board);
    setCurrentBoardPath(board);
    judgeFilterMode(query);
    setCurrentBoardPage(currentPage);
    setIsPagination(isPagination);
    setClearPostView();
  }, [boardPathCheck, setCurrentBoardPath, judgeFilterMode, board]);

  // 차단목록?
  useLayoutEffect(() => {
    loadingProcess([
      () => getBoardCategoryList(board),
      () => getBoardPostNoticeList(board, currentPage),
      () => getBoardPostList(board, currentPage, currentCategory),
      setClearPostView,
    ]);
  }, [
    loadingProcess, setCurrentBoardPath, board, judgeFilterMode, query, setCurrentBoardPage,
    currentPage, setIsPagination, isPagination, getBoardPostNoticeList, getBoardPostList,
    setClearPostView, boardPathCheck, currentCategory, getCodeComponent, currentBoardPath,
  ]);

  return (
    <BoardWrapper>
      <TableWrapper>
        <BoardHeader />
        <BoardContent />
        <BoardFooter currentCategory={currentCategory} />
      </TableWrapper>
    </BoardWrapper>
  );
};

Board.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      board: Proptypes.string,
      currentPage: Proptypes.string,
      currentCategory: Proptypes.string,
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
