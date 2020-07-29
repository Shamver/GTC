import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import PostLockerMyPost from './PostLockerMyPost';
import PostLockerMyReply from './PostLockerMyReply';
import PostLockerFavorite from './PostLockerFavorite';

const PostLockerTabContent = ({ currentPage, noPagination, currentTab }) => (
  <TabContent activeTab={currentTab}>
    <PostLockerMyPost
      currentPage={currentPage}
      noPagination={noPagination}
      currentTab={currentTab}
    />
    <PostLockerMyReply
      currentPage={currentPage}
      noPagination={noPagination}
      currentTab={currentTab}
    />
    <PostLockerFavorite
      currentPage={currentPage}
      noPagination={noPagination}
      currentTab={currentTab}
    />
  </TabContent>
);

PostLockerTabContent.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(PostLockerTabContent));
