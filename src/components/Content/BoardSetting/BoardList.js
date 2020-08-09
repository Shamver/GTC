import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import Board from './Board';

const BoardList = () => {
  const { SystemBoardStore } = useStores();
  const { boardList } = SystemBoardStore;

  return !!boardList.length && boardList.map(
    (data) => <Board data={data} key={data.board} />,
  );
};

export default memo(observer(BoardList));
