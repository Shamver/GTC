import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyList = ({ bpId }) => {
  const { BoardReplyStore, ComponentReplyStore } = useStores();
  const { getReply, postReplyList } = BoardReplyStore;
  const { onSet } = ComponentReplyStore;

  useEffect(() => {
    getReply(bpId);
  }, [getReply, bpId]);


  return postReplyList.map((data, index) => {
    onSet(`replyIndex${index}`);

    return (
      <Reply id={`reply${data.id}`} key={data.id} data={data} index={index} />
    );
  });
};

export default observer(ReplyList);
