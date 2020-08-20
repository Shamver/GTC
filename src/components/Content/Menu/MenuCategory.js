import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const MenuCategory = ({ data }) => {
  const { SystemBoardStore } = useStores();
  const { getCategory } = SystemBoardStore;
  const {
    id, name, path, useFl,
    board,
  } = data;
  return (
    <tr onClick={() => getCategory(board, id)}>
      <td>{name}</td>
      <td>{path}</td>
      <td>{useFl}</td>
    </tr>
  );
};

MenuCategory.propTypes = {
  data: Proptypes.shape({
    board: Proptypes.string,
    id: Proptypes.string,
    name: Proptypes.string,
    path: Proptypes.string,
    useFl: Proptypes.string,
  }).isRequired,
};

export default memo(MenuCategory);
