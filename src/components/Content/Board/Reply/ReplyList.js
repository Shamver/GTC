import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyList = ({ bpId }) => {
  const { BoardReplyStore, ComponentReplyStore, UserIgnoreStore } = useStores();
  const { getReply, postReplyList } = BoardReplyStore;
  const { onSet } = ComponentReplyStore;
  const { ignoreList } = UserIgnoreStore;

  useEffect(() => {
    getReply(bpId);
  }, [getReply, bpId, ignoreList, postReplyList]);


  return postReplyList.map((data, index) => {
    onSet(`replyIndex${index}`);

    return (
      <Reply id={`reply${data.id}`} key={data.id} data={data} index={index} bpId={bpId} />
    );
  });
};

export default observer(ReplyList);
