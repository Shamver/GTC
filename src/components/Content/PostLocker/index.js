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
    BoardPostStore, BoardReplyStore, UserFavoriteStore, ComponentPostLockerStore, UtilStore,
    UtilLoadingStore,
  } = useStores();

  const { getPostMine } = BoardPostStore;
  const { getDataReplyMine } = BoardReplyStore;
  const { getFavorite } = UserFavoriteStore;
  const { activeTab } = ComponentPostLockerStore;
  const { loginCheck } = UtilStore;
  const { doLoading } = UtilLoadingStore;

  doLoading();

  useEffect(() => {
    if (loginCheck()) {
      getPostMine();
      getDataReplyMine();
      getFavorite();
    }
  }, [
    loginCheck, getDataReplyMine, getPostMine, getFavorite, activeTab,
  ]);

  return (
    <MainContainer>
      <PostLockerNav />
      <PostLockerTabContent />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 14px !important;
`;

export default observer(PostLocker);
