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
          <Text>
            {postTitle}
          </Text>
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

const Text = styled.span`
  max-width: 550px;
  line-height: 21px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle !important;
`;

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
