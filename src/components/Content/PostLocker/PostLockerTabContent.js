import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import PostLockerMyPost from './PostLockerMyPost';
import PostLockerMyReply from './PostLockerMyReply';
import PostLockerFavorite from './PostLockerFavorite';

const PostLockerTabContent = ({ currentPage, noPagination, currentTab }) => (
  <TabContent activeTab={currentTab}>
    <PostLockerMyPost currentPage={currentPage} noPagination={noPagination} />
    <PostLockerMyReply currentPage={currentPage} noPagination={noPagination} />
    <PostLockerFavorite currentPage={currentPage} noPagination={noPagination} />
  </TabContent>
);

PostLockerTabContent.propTypes = {
  currentPage: Proptypes.string,
  currentTab: Proptypes.string,
  noPagination: Proptypes.bool,
};

PostLockerTabContent.defaultProps = {
  currentPage: '1',
  currentTab: 'myPost',
  noPagination: false,
};

export default memo(observer(PostLockerTabContent));
