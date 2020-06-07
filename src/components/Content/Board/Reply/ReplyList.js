import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyList = () => {
  const { BoardReplyStore, ComponentReplyStore } = useStores();
  const { postReplyList } = BoardReplyStore;
  const { onSet } = ComponentReplyStore;

  return postReplyList.map((data, index) => {
    onSet(`replyIndex${index}`);
    console.log(data);
    return (
      <Reply id={`reply${data.id}`} key={data.id} data={data} index={index} bpId={data.bpId} />
    );
  });
};

export default observer(ReplyList);
