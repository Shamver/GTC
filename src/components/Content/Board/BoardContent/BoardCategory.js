import React from 'react';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';

const BoardCategory = ({ data }) => {
  const { name, fullpath } = data;
  return (
    <Link to={fullpath}>
      {name}
    </Link>
  );
};

BoardCategory.propTypes = {
  data: Proptypes.shape({
    name: Proptypes.string,
    fullpath: Proptypes.string,
  }).isRequired,
};

export default BoardCategory;
