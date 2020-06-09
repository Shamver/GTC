import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import * as Proptypes from 'prop-types';
import { toast } from 'react-toastify';
import useStores from '../../../../stores/useStores';
import Post from './index';

// const BoardCategoryOptions = () => {
//   const { SystemCodeStore } = useStores();
//   const { setCodeList } = SystemCodeStore;
//
//   return setCodeList.map((data) => (
//     <option
//       value={data.NAME}
//       key={data.CODE}
//     >
//       {data.NAME}
//     </option>
//   ));
// };

const PostList = ({
  path, currentPage, isNotice = false, query,
}) => {
  const {
    BoardStore, BoardPostStore, ComponentPostStore, UserIgnoreStore, UtilRouteStore,
    SystemCodeStore,
  } = useStores();
  const { setCurrentBoard } = BoardStore;
  const {
    getBoardPostList, boardPostList,
    getBoardPostNoticeList, boardPostNoticeList,
  } = BoardPostStore;
  const { onSet } = ComponentPostStore;
  const { ignoreList } = UserIgnoreStore;
  const { history } = UtilRouteStore;
  const { getCodeComponent } = SystemCodeStore;

  useEffect(() => {
    getCodeComponent('BOARD_FREE_CATEGORY', path);
    setCurrentBoard(path);
    if (isNotice) {
      getBoardPostNoticeList(path);
    } else {
      getBoardPostList(path, currentPage, query);
    }
  }, [
    path, getBoardPostList, setCurrentBoard, currentPage, ignoreList,
    history, getBoardPostNoticeList, getCodeComponent, isNotice, query,
  ]);

  if (!boardPostList[path] || boardPostList[path] === undefined) {
    toast.error('아직 구현되지 않은 route 입니다.');
    history.push('/');
    return null;
  }

  if (isNotice) {
    return boardPostNoticeList[path].map((data, index) => {
      onSet(index);
      return (
        <Post
          key={data.id}
          data={data}
          index={index}
          path={path}
          currentPage={currentPage}
          isNotice
        />
      );
    });
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
  isNotice: Proptypes.bool,
  query: Proptypes.shape({
    filter_mode: Proptypes.string,
  }),
};

PostList.defaultProps = {
  query: null,
};

export default observer(PostList);
