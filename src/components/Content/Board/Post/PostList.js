import React, { memo } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';
import Post from '.';

const PostList = ({ isNotice }) => {
  const { BoardStore, BoardPostStore } = useStores();
  const { currentBoardPath, currentBoardPage } = BoardStore;
  const { boardPostList, boardPostNoticeList } = BoardPostStore;

  if (isNotice && Number(currentBoardPage) === 1) {
    return boardPostNoticeList[currentBoardPath].map((data, index) => (
      <Post key={data.id} data={data} index={index} isNotice />
    ));
  } if (isNotice) {
    return null;
  }

  return boardPostList[currentBoardPath].map((data, index) => (
    <Post key={data.id} data={data} index={index} />
  ));
};

PostList.propTypes = {
  isNotice: Proptypes.bool,
};

PostList.defaultProps = {
  isNotice: false,
};

export default memo(observer(PostList));
