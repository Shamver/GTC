import React from 'react';
import useStores from '../../Stores/useStores';
import FreeBoard from './FreeBoard';

const CurrentBoard = () => {
  const { BoardStore } = useStores();
  const { currentBoard } = BoardStore;

  if (currentBoard === '/free') {
    return (
      <FreeBoard pathname="/free" />
    );
  }

  return (
    <FreeBoard pathname="/free" />
  );
};

export default CurrentBoard;
