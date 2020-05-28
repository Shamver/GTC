import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';
import Post from './index';

const PostList = ({ path, currentPage }) => {
  const {
    BoardStore, BoardPostStore, ComponentPostStore, UserIgnoreStore,
  } = useStores();
  const { setCurrentBoard } = BoardStore;
  const { getBoardPostList, getBoardBestPostList, boardPostList } = BoardPostStore;
  const { onSet } = ComponentPostStore;
  const { ignoreList } = UserIgnoreStore;

  useEffect(() => {
    getBoardPostList(path, currentPage);
    getBoardBestPostList(path, currentPage);
    setCurrentBoard(path);
  }, [path, getBoardPostList, setCurrentBoard, currentPage, ignoreList]);

  return boardPostList[path].map((data, index) => {
    onSet(index);
    return (<Post key={data.id} data={data} index={index} path={path} currentPage={currentPage} />);
  });
};

PostList.propTypes = {
  path: Proptypes.string,
  currentPage: Proptypes.string,
};

export default observer(PostList);
