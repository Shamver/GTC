import React, { useLayoutEffect, memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import qs from 'query-string';
import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';
import BoardFooter from './BoardFooter';
import useStores from '../../../stores/useStores';
import {observer} from "mobx-react";

const Board = ({
  path, currentPage, isPagination, location,
}) => {
  const { BoardPostStore, UtilLoadingStore, BoardStore } = useStores();
  const {
    setClearPostView, getBoardPostNoticeList, getBoardPostList, isSearch,
  } = BoardPostStore;
  const { loadingProcess } = UtilLoadingStore;
  const {
    setCurrentBoardPath, judgeFilterMode, setCurrentBoardPage,
    setIsPagination, boardPathCheck,
  } = BoardStore;
  const query = qs.parse(location.search);

  // 차단목록?
  useLayoutEffect(() => {
    loadingProcess([
      () => boardPathCheck(path),
      () => setCurrentBoardPath(path),
      () => judgeFilterMode(query),
      () => setCurrentBoardPage(currentPage),
      () => setIsPagination(isPagination),
      () => getBoardPostNoticeList(path, currentPage),
      () => getBoardPostList(path, currentPage),
      setClearPostView,
    ]);
  }, [
    loadingProcess, setCurrentBoardPath, path, judgeFilterMode,
    query, setCurrentBoardPage, currentPage, setIsPagination, isPagination,
    getBoardPostNoticeList, getBoardPostList, setClearPostView, boardPathCheck,
    isSearch,
  ]);

  return (
    <BoardWrapper>
      <TableWrapper>
        <BoardHeader />
        <BoardContent />
        <BoardFooter />
      </TableWrapper>
    </BoardWrapper>
  );
};

Board.propTypes = {
  path: Proptypes.string.isRequired,
  currentPage: Proptypes.string,
  isPagination: Proptypes.bool,
  location: Proptypes.shape({
    search: Proptypes.string,
  }).isRequired,
};

Board.defaultProps = {
  currentPage: '1',
  isPagination: false,
};

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

export default memo(observer(Board));
