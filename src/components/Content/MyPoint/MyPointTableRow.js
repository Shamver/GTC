import React from 'react';
import styled from 'styled-components';

const MyPointTableRow = (title, data) => {
  const {
    id, point, date, desc, postId,
  } = data;

  return (
    <tr key={title + id}>
      <TableTh scope="row">
        { date }
      </TableTh>
      <TableTd>
        { point } 점
      </TableTd>
      <TableTd>
        { desc } (#{postId})
      </TableTd>
    </tr>
  );
};

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px !important;
`;

export default MyPointTableRow;
