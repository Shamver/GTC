import React, { memo } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import { toast } from 'react-toastify';
import useStores from '../../../../stores/useStores';
import Post from '.';

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

const PostList = ({ isNotice }) => {
  const { BoardStore, BoardPostStore, UtilRouteStore } = useStores();
  const { currentBoardPath, currentBoardPage } = BoardStore;
  const { boardPostList, boardPostNoticeList } = BoardPostStore;
  const { history } = UtilRouteStore;

  if (!boardPostList[currentBoardPath] || boardPostList[currentBoardPath] === undefined) {
    toast.error('아직 구현되지 않은 route 입니다.');
    history.push('/');
    return null;
  }

  if (isNotice && Number(currentBoardPage) === 1) {
    return boardPostNoticeList[currentBoardPath].map((data, index) => (
      <Post key={data.id} data={data} index={index} isNotice />
    ));
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
