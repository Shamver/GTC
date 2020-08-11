import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';
import { Button } from 'reactstrap';

const Board = ({ data }) => {
  const { SystemBoardStore } = useStores();
  const { getBoard, getCategory } = SystemBoardStore;
  const {
    name, path, useFl,
  } = data;

  return (
    <tr onClick={() => getCategory(data.board)}>
      <td>{name}</td>
      <td>{path}</td>
      <td>{useFl}</td>
      <td>
        <Button size="sm" color="danger" onClick={(event) => getBoard(data.board, event)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </td>
    </tr>
  );
};

Board.propTypes = {
  data: Proptypes.shape({
    board: Proptypes.string,
    name: Proptypes.string,
    path: Proptypes.string,
    useFl: Proptypes.string,
  }).isRequired,
};

export default memo(Board);
