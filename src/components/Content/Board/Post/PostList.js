import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';
import Post from './index';

const PostList = ({ path, currentPage }) => {
  const {
    BoardStore, BoardPostStore, ComponentPostStore, UserIgnoreStore, UtilAlertStore, UtilRouteStore,
  } = useStores();
  const { setCurrentBoard } = BoardStore;
  const { getBoardPostList, boardPostList } = BoardPostStore;
  const { onSet } = ComponentPostStore;
  const { ignoreList } = UserIgnoreStore;
  const { toggleAlert } = UtilAlertStore;
  const { history } = UtilRouteStore;

  useEffect(() => {
    getBoardPostList(path, currentPage);
    setCurrentBoard(path);
  }, [path, getBoardPostList, setCurrentBoard, currentPage, ignoreList, toggleAlert, history]);

  if (!boardPostList[path] || boardPostList[path] === undefined) {
    toggleAlert('아직 구현되지 않은 route 입니다.');
    history.push('/');
    return null;
  }

  return boardPostList[path].map((data, index) => {
    onSet(index);
    return (
      <Post key={data.id} data={data} index={index} path={path} currentPage={currentPage} />
    );
  });
};

PostList.propTypes = {
  path: Proptypes.string,
  currentPage: Proptypes.string,
};

export default observer(PostList);
