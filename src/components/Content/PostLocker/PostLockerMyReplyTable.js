import React, { memo } from 'react';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';

const PostLockerMyReplyTable = ({ data }) => {
  const {
    postId, replyId, postTitle, replyContent, replyDate,
  } = data;

  return (
    <TableTr>
      <TableTd>
        <Link to={`/post/${postId}#${replyId}`}>
          <Text post>{postTitle}</Text>
        </Link>
      </TableTd>
      <TableTd width={60}>
        <Text>{renderHTML(replyContent)}</Text>
      </TableTd>
      <TableTd>{replyDate}</TableTd>
    </TableTr>
  );
};

PostLockerMyReplyTable.propTypes = {
  data: Proptypes.shape({
    postId: Proptypes.number,
    replyId: Proptypes.number,
    postTitle: Proptypes.string,
    replyContent: Proptypes.string,
    replyDate: Proptypes.string,
  }).isRequired,
};

const Text = styled.span`
  max-width: ${(props) => (props.post ? '180px' : '500px')};
  line-height: 21px;
  display: inline-block;
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
  padding: 8px !important;
`;

export default memo(PostLockerMyReplyTable);
