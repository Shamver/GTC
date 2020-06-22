import { observer } from 'mobx-react';
import React, { memo } from 'react';
import useStores from '../../../../../stores/useStores';
import Reply from './index';

const ReplyList = () => {
  const { BoardReplyStore, ComponentReplyStore } = useStores();
  const { postReplyList } = BoardReplyStore;
  const { onSet } = ComponentReplyStore;

  return postReplyList.map((data, index) => {
    onSet(`replyIndex${index}`);
    return (
      <Reply id={`reply${data.id}`} key={data.id} data={data} index={index} bpId={data.bpId} />
    );
  });
};

export default memo(observer(ReplyList));
