import React from 'react';
import useStores from '../../../stores/useStores';
import Index from './index';

const CurrentBoard = () => {
  const { BoardStore } = useStores();
  const { currentBoard } = BoardStore;

  if (currentBoard === '/free') {
    return (
      <Index pathname="/free" />
    );
  }

  return (
    <Index pathname="/free" />
  );
};

export default CurrentBoard;
