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

  const { getDataPostMine } = BoardPostStore;
  const { getDataReplyMine } = BoardReplyStore;
  const { getDataFavorite } = UserFavoriteStore;
  const { activeTab } = ComponentPostLockerStore;
  const { loginCheck } = UtilStore;
  const { doLoading, setLoading } = UtilLoadingStore;

  useEffect(() => {
    if (loginCheck()) {
      doLoading();
      getDataPostMine();
      getDataReplyMine();
      getDataFavorite();
    }

    return () => {
      setLoading(true);
    };
  }, [
    loginCheck, getDataReplyMine, getDataPostMine, getDataFavorite, activeTab,
    doLoading, setLoading,
  ]);

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
