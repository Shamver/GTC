import React, { memo } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const Board = ({ data }) => {
  const { SystemBoardStore } = useStores();
  const { toggleDetailBoard } = SystemBoardStore;
  const {
    board, name, path, useFl,
  } = data;
  return (
    <tr onCiick={() => toggleDetailBoard(data.board)}>
      <td>{board}</td>
      <td>{name}</td>
      <td>{path}</td>
      <td>{useFl}</td>
    </tr>
  );
};

Board.propTypes = {
  data: Proptypes.shape({
    board: Proptypes.string,
    name: Proptypes.string,
    path: Proptypes.string,
    useFl: Proptypes.number,
  }).isRequired,
};

export default memo(Board);
