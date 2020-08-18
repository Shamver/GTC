import React, { memo, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import Board from './Board';

const BoardList = () => {
  const { SystemBoardStore, UserStore } = useStores();
  const { userData } = UserStore;
  const { getBoardList, boardList } = SystemBoardStore;

  useLayoutEffect(() => {
    getBoardList(userData);
  }, [getBoardList, userData]);

  return boardList.map((data) => <Board data={data} key={data.board} />);
};

export default memo(observer(BoardList));
