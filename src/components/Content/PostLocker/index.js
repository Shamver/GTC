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
    BoardPostStore, BoardReplyStore, UserFavoriteStore, ComponentPostLockerStore,
  } = useStores();

  const {
    getDataPost,
  } = BoardPostStore;

  const {
    getDataReply,
  } = BoardReplyStore;

  const {
    getDataFavorite,
  } = UserFavoriteStore;

  const {
    activeTab,
  } = ComponentPostLockerStore;

  useEffect(() => {
    getDataPost();
    getDataReply();
    getDataFavorite();
  }, [getDataReply, getDataPost, getDataFavorite, activeTab]);

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
