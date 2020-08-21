import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const MenuCategory = ({ data }) => {
  const { SystemMenuStore } = useStores();
  const { getCategory } = SystemMenuStore;
  const {
    id, name, path, useFl,
    menu,
  } = data;
  return (
    <tr onClick={() => getCategory(menu, id)}>
      <td>{name}</td>
      <td>{path}</td>
      <td>{useFl}</td>
    </tr>
  );
};

MenuCategory.propTypes = {
  data: Proptypes.shape({
    menu: Proptypes.string,
    id: Proptypes.string,
    name: Proptypes.string,
    path: Proptypes.string,
    useFl: Proptypes.string,
  }).isRequired,
};

export default memo(MenuCategory);
