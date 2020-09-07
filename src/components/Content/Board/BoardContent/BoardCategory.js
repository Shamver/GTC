import React from 'react';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';

const BoardCategory = ({ data }) => {
  return (
    <Link to={"chat"}>
      {data.name}
    </Link>
  );
};

BoardCategory.propTypes = {
  data: Proptypes.shape({
  }).isRequired,
};

export default BoardCategory;
