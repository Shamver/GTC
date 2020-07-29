import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';

const MyPointTableRow = ({ data }) => {
  const {
    point, pointType, date, postId,
  } = data;
  return (
    <tr>
      <TableTh scope="row">
        { date }
      </TableTh>
      <TableTd>
        { point } 점
      </TableTd>
      <TableTd>
        { pointType } (#{ postId })
      </TableTd>
    </tr>
  );
};

MyPointTableRow.propTypes = {
  data: Proptypes.shape({
    type: Proptypes.string,
    point: Proptypes.number,
    date: Proptypes.string,
    postId: Proptypes.number,
    pointType: Proptypes.string,
  }).isRequired,
};


const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

export default memo(MyPointTableRow);
