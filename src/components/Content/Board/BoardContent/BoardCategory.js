import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Proptypes from 'prop-types';

const BoardCategory = ({ data }) => {
  console.log(data);
  return (
    <NavLink>
      {data.name}
    </NavLink>
  );
};

BoardCategory.propTypes = {
  data: Proptypes.shape({
  }).isRequired,
};

export default BoardCategory;
