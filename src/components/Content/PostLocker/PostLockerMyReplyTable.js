import React from 'react';
import styled from 'styled-components';
import renderHTML from 'react-render-html';

import { Link } from 'react-router-dom';

const PostLockerMyReplyTable = (title, data) => {
  const {
    postId, replyId, postTitle, replyContent, replyDate,
  } = data;

  return (
    <TableTr key={title + replyId}>
      <TableTd>
        <Link to={`/post/${postId}#${replyId}`}>
          <Text post>
            {postTitle}
          </Text>
        </Link>
      </TableTd>
      <TableTd width={60}>
        <Text>
          {renderHTML(replyContent)}
        </Text>
      </TableTd>
      <TableTd>
        {replyDate}
      </TableTd>
    </TableTr>
  );
};

const Text = styled.span`
  max-width: ${(props) => (props.post ? '180px' : '500px')};
  line-height: 21px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle !important;
  & > p {
    margin-bottom: 0 !important;
  }
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

export default PostLockerMyReplyTable;
