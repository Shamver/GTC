import React from 'react';
import {
  Button,
} from 'reactstrap';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const PostLockerFavoriteTable = (title, data, onClickEvent) => {
  const {
    postId, postTitle, postDate, postViews,
  } = data;

  return (
    <TableTr key={title + postId}>
      <TableTd>
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
      <TableTd>
        <DeleteBtn color="danger" size="sm" onClick={() => { onClickEvent(postId, 'postLocker'); }}>
          삭제
        </DeleteBtn>
      </TableTd>
    </TableTr>
  );
};

const Text = styled.span`
  max-width: 130px;
  line-height: 21px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
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

const DeleteBtn = styled(Button)`
  margin: -5px 0 !important;
`;

export default PostLockerFavoriteTable;
