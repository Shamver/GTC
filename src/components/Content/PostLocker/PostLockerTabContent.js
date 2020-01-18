import React from 'react';
import {
  TabContent,
} from 'reactstrap';
import useStores from '../../../stores/useStores';

import PostLockerMyPost from './PostLockerMyPost';
import PostLockerMyReply from './PostLockerMyReply';
import PostLockerFavorite from './PostLockerFavorite';

const PostLockerTabContent = () => {
  const {
    ComponentPostLockerStore,
  } = useStores();

  const {
    activeTab,
  } = ComponentPostLockerStore;

  return (
    <TabContent activeTab={activeTab}>
      <PostLockerMyPost />
      <PostLockerMyReply />
      <PostLockerFavorite />
    </TabContent>
  );
};

export default PostLockerTabContent;
