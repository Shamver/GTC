import React, { useLayoutEffect, memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import qs from 'query-string';
import { observer } from 'mobx-react';
import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';
import BoardFooter from './BoardFooter';
import useStores from '../../../stores/useStores';

const Board = ({ parentProps, location, match }) => {
  const { BoardPostStore, UtilLoadingStore, BoardStore } = useStores();
  const { params } = match;
  const { path } = params;
  let { isPagination } = parentProps;
  let { currentPage } = params;
  isPagination = !!isPagination;
  currentPage = currentPage || '1';

  const { setClearPostView, getBoardPostNoticeList, getBoardPostList } = BoardPostStore;
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
  match: Proptypes.shape({
    params: Proptypes.shape({
      path: Proptypes.string,
      currentPage: Proptypes.string,
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
