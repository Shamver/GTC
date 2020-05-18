import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';

import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';
import BoardFooter from './BoardFooter';

import useStores from '../../../stores/useStores';

const Board = ({ path, currentPage, noPagination }) => {
  const { UtilLoadingStore, BoardPostStore } = useStores();
  const { doLoading } = UtilLoadingStore;
  const { setCurrentPostId } = BoardPostStore;

  useEffect(() => {
    setCurrentPostId(0);
  }, [setCurrentPostId]);

  doLoading();
  return (
    <BoardWrapper>
      <TableWrapper>
        <BoardHeader path={path} />
        <BoardContent path={path} currentPage={currentPage} />
        <BoardFooter path={path} currentPage={currentPage} noPagination={noPagination} />
      </TableWrapper>
    </BoardWrapper>
  );
};

Board.propTypes = {
  path: Proptypes.string.isRequired,
  currentPage: Proptypes.string,
  noPagination: Proptypes.bool,
};

Board.defaultProps = {
  currentPage: '1',
  noPagination: false,
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

export default observer(Board);
