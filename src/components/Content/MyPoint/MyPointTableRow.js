import React from 'react';
import styled from 'styled-components';

const MyPointTableRow = (title, data) => {
  const {
    id, type, point, date, postId,
  } = data;

  let desc;

  if (type === 'POST' && point > 0) {
    desc = '글 작성';
  } else if (type === 'POST' && point < 0) {
    desc = '글 삭제';
  } else if (type === 'REPLY' && point > 0) {
    desc = '댓글 작성';
  } else if (type === 'REPLY' && point < 0) {
    desc = '댓글 삭제';
  }

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
