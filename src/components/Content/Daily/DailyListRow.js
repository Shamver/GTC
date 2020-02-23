import React from 'react';
import styled from 'styled-components';

const DailyListRow = (title, data, index) => {
  const {
    username, message, point, combo, time,
  } = data;

  return (
    <tr key={title + index}>
      <TableTh scope="row">
        { index + 1 } 등
      </TableTh>
      <TableTd>
        { username }
      </TableTd>
      <TableTd>
        { message }
      </TableTd>
      <TableTd>
        { point }
      </TableTd>
      <TableTd>
        { combo }
      </TableTd>
      <TableTd>
        { time }
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

export default DailyListRow;
