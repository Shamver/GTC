import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';

const BoardOptionList = ({ board }) => {
  const { BoardStore, BoardPostStore } = useStores();
  const { boardList, setBoardList } = BoardStore;
  const { setPostBoard } = BoardPostStore;

  useEffect(() => {
    setBoardList();
    setPostBoard(board);
  }, [setBoardList, setPostBoard, board]);

  return boardList.map((data) => (
    <option
      value={data.id}
      key={data.id}
    >
      {data.name}
    </option>
  ));
};

BoardOptionList.propTypes = {
  board: Proptypes.string.isRequired,
};

export default memo(observer(BoardOptionList));
