import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import {Link} from "react-router-dom";

const ProfileModalComment = ({ commentData }) => {
  const { commentId, commentContent, commentCreated, postCommentId } = commentData;
  return (
    <tr>
      <td>
        <CommentTitle to={`/post/${postCommentId}`}>{commentContent}</CommentTitle>
      </td>
      <td>{commentCreated}</td>
    </tr>
  );
};

const CommentTitle = styled(Link)`
  cursor: pointer
  color : black;
  
  &:hover {
    text-decoration: none;
  }
`;

export default observer(ProfileModalComment);