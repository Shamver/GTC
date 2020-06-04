import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';
import Post from './index';

const BoardCategoryOptions = () => {
  const { SystemCodeStore } = useStores();
  const { setCodeList } = SystemCodeStore;

  return setCodeList.map((data) => (
    <option
      value={data.NAME}
      key={data.CODE}
    >
      {data.NAME}
    </option>
  ));
};

const PostList = ({ path, currentPage }) => {
  const {
    BoardStore, BoardPostStore, ComponentPostStore, UserIgnoreStore, SystemCodeStore,
  } = useStores();
  const { setCurrentBoard } = BoardStore;
  const { getBoardPostList, boardPostList } = BoardPostStore;
  const { onSet } = ComponentPostStore;
  const { ignoreList } = UserIgnoreStore
  const { getCodeComponent } = SystemCodeStore;

  useEffect(() => {
    getCodeComponent('BOARD_FREE_CATEGORY', path);
    getBoardPostList(path, currentPage);
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
