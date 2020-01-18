import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const PostLockerMyPostTable = (title, data) => {
  const {
    postId, postTitle, postDate, postViews,
  } = data;

  return (
    <TableTr key={title + postId}>
      <TableTd scope="row">
        <b>{postId}</b>
      </TableTd>
      <TableTd>
        <Link to={`/post/${postId}`}>
          {postTitle}
        </Link>
      </TableTd>
      <TableTd>
        {postDate}
      </TableTd>
      <TableTd>
        {postViews}
      </TableTd>
    </TableTr>
  );
};

const TableTr = styled.tr`
  height: 30px;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px !important;
`;

export default PostLockerMyPostTable;
