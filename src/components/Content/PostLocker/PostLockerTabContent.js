import React from 'react';
import {
  TabContent,
} from 'reactstrap';

import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

import PostLockerMyPost from './PostLockerMyPost';
import PostLockerMyReply from './PostLockerMyReply';
import PostLockerFavorite from './PostLockerFavorite';

import Loading from '../../util/Loading';

const PostLockerTabContent = () => {
  const { ComponentPostLockerStore, UtilLoadingStore } = useStores();
  const { activeTab } = ComponentPostLockerStore;
  const { loading } = UtilLoadingStore;

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <TabContent activeTab={activeTab}>
      <PostLockerMyPost />
      <PostLockerMyReply />
      <PostLockerFavorite />
    </TabContent>
  );
};

export default observer(PostLockerTabContent);
