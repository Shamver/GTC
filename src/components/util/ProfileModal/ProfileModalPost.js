import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import {Link} from "react-router-dom";

const ProfileModalPost = ({ postData }) => {
  const { postId, postTitle, postCreated, postCommentCount } = postData;
  return (
    <tr>
      <td>
        <PostTitle to={`/post/${postId}`}>{postTitle} [{postCommentCount}]</PostTitle>
      </td>
      <td>{postCreated}</td>
    </tr>
    );
  };

const PostTitle = styled(Link)`
  cursor: pointer
  color : black;
  
  &:hover {
    text-decoration: none;
  }
`;

export default observer(ProfileModalPost);