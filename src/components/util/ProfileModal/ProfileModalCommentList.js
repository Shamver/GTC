import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalComment from './ProfileModalComment';
import ProfileModalPost from "./ProfileModalPost";

const ProfileModalCommentList = () => {
  const { UtilStore } = useStores();
  const { profileCommentData } = UtilStore;
  const commentList =  profileCommentData.map( index => (
    <ProfileModalComment commentData={index} key={index.commentId}/>
    ));
  return (
    <table>
      <tr>
        <th>제목</th>
      </tr>
      {commentList}
    </table>
  );
};

export default observer(ProfileModalCommentList);