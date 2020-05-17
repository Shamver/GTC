import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AdvertiseRow = ({ data }) => (
  <tr>
    <BoldTd>{data.name}</BoldTd>
    <td>
      {data.url ? (
        <Link to={data.url}>
          <Span>
            (링크) {data.message}
          </Span>
        </Link>
      ) : (
        <span>
          {data.message}
        </span>
      )}
    </td>
  </tr>
);

AdvertiseRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const Span = styled.span`
  color: black;
`;

const BoldTd = styled.td`
  font-weight : bold;
`;

export default AdvertiseRow;
