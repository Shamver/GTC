import { observer } from 'mobx-react';
import React, { memo } from 'react';
import useStores from '../../../../../stores/useStores';
import Reply from './index';

const ReplyList = () => {
  const { BoardReplyStore } = useStores();
  const { postReplyList } = BoardReplyStore;

  return postReplyList.map((data, index) => (
    <Reply key={data.id} data={data} index={index} />));
};

export default memo(observer(ReplyList));
