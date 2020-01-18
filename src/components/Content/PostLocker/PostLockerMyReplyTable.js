import React from 'react';
import styled from 'styled-components';
import renderHTML from 'react-render-html';

import { Link } from 'react-router-dom';

const PostLockerMyReplyTable = (title, data) => {
  const {
    postId, replyId, postTitle, replyContent, replyDate,
  } = data;

  return (
    <TableTr key={title + postId}>
      <TableTd>
        <Link to={`/post/${postId}#${replyId}`}>
          {postTitle}
        </Link>
      </TableTd>
      <TableTd width={60}>
        {renderHTML(replyContent)}
      </TableTd>
      <TableTd>
        {replyDate}
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

export default PostLockerMyReplyTable;
