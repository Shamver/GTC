import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';

const PostLockerMyPostTable = ({ data }) => {
  const {
    postId, postTitle, postDate, viewCnt,
  } = data;

  return (
    <TableTr key={postId}>
      <TableTd scope="row">
        <b>{postId}</b>
      </TableTd>
      <TableTd>
        <Link to={`/post/${postId}`}>
          <Text>{postTitle}</Text>
        </Link>
      </TableTd>
      <TableTd>{postDate}</TableTd>
      <TableTd>{viewCnt}</TableTd>
    </TableTr>
  );
};

PostLockerMyPostTable.propTypes = {
  data: Proptypes.shape({
    postId: Proptypes.number,
    postTitle: Proptypes.string,
    postDate: Proptypes.string,
    viewCnt: Proptypes.number,
  }).isRequired,
};

const Text = styled.span`
  max-width: 550px;
  line-height: 21px;
  display: inline-block;
  vertical-align: middle !important;
`;

const TableTr = styled.tr`
  height: 30px;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  padding: 8px !important;
`;

export default memo(PostLockerMyPostTable);
