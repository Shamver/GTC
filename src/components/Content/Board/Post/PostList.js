import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';
import Post from './index';

const PostList = ({ path, currentPage }) => {
  const { BoardStore, BoardPostStore } = useStores();
  const { setCurrentBoard } = BoardStore;
  const { getBoardPostList, boardPostList } = BoardPostStore;

  useEffect(() => {
    getBoardPostList(path, currentPage);
    setCurrentBoard(path);
  }, [path, getBoardPostList, setCurrentBoard, currentPage]);
  return boardPostList[path].map((data) => (<Post key={data.id} data={data} />));
};

PostList.propTypes = {
  path: Proptypes.string,
  currentPage: Proptypes.string,
};

export default observer(PostList);
