import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Proptypes from 'prop-types';

const BoardCategory = ({ data }) => {
  const { name, fullpath } = data;
  return (
    <NavLink to={fullpath} activeClassName="active">
      {name}
    </NavLink>
  );
};

BoardCategory.propTypes = {
  data: Proptypes.shape({
    name: Proptypes.string,
    fullpath: Proptypes.string,
  }).isRequired,
};

export default BoardCategory;
