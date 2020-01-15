import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

import PostLockerNav from './PostLockerNav';
import PostLockerTabContent from './PostLockerTabContent';

const PostLocker = () => {
  const {
    BoardPostStore, BoardReplyStore, UserFavoriteStore,
  } = useStores();

  const {
    postList, getDataPost,
  } = BoardPostStore;

  const {
    replyList, getDataReply,
  } = BoardReplyStore;

  const {
    favoriteList, getDataFavorite,
  } = UserFavoriteStore;

  useEffect(() => {
    getDataPost();
    getDataReply();
    getDataFavorite();
  }, [getDataReply, getDataPost, getDataFavorite, postList, replyList, favoriteList]);

  return (
    <MainContainer>
      <PostLockerNav />
      <PostLockerTabContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 14px !important;
`;

export default observer(PostLocker);
