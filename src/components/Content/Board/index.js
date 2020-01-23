import React from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';

import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';
import BoardFooter from './BoardFooter';

import useStores from '../../../stores/useStores';

const Board = ({ path }) => {
  const { UtilLoadingStore } = useStores();

  const { doLoading } = UtilLoadingStore;

  doLoading();

  return (
    <>
      <BoardWrapper>
        <TableWrapper>
          <BoardHeader path={path} />
          <BoardContent path={path} />
          <BoardFooter path={path} />
        </TableWrapper>
      </BoardWrapper>
    </>
  );
};

Board.propTypes = {
  path: Proptypes.string.isRequired,
};

const BoardWrapper = styled.div`
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

export default observer(Board);
