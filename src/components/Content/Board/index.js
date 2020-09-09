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
  const { params } = match;
  const { board, category } = params;
  let { page } = params;

  let { isPagination } = parentProps;
  isPagination = !!isPagination;
  page = page || '1';

  const { setClearPostView, getBoardPostNoticeList, getBoardPostList } = BoardPostStore;
  const { loadingProcess } = UtilLoadingStore;
  const {
    setCurrentBoardPath, judgeFilterMode, setCurrentBoardPage,
    setIsPagination, getBoardCategoryList,
  } = BoardStore;
  const query = qs.parse(location.search);

  console.log('Board!');
  useEffect(() => {
    setCurrentBoardPath(board);
    judgeFilterMode(query);
    setCurrentBoardPage(page);
    setIsPagination(isPagination);
    setClearPostView();
  }, [
    setCurrentBoardPath, judgeFilterMode, query,
    setCurrentBoardPage, setIsPagination, setClearPostView, board,
    page, isPagination,
  ]);

  useLayoutEffect(() => {
    loadingProcess([
      () => getBoardCategoryList(board, category),
      () => getBoardPostNoticeList(board, page),
      () => getBoardPostList(board, page, category),
    ]);
  }, [
    getBoardCategoryList, getBoardPostNoticeList, getBoardPostList,
    board, page, category, loadingProcess,
  ]);

  return (
    <BoardWrapper>
      <TableWrapper>
        <BoardHeader />
        <BoardContent />
        <BoardFooter currentCategory={category} />
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
