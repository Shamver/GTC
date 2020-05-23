import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyList = () => {
  const { BoardPostStore, BoardReplyStore, ComponentReplyStore } = useStores();
  const { postView } = BoardPostStore;
  const { getReply, postReplyList } = BoardReplyStore;
  const { onSet } = ComponentReplyStore;
  const { id } = postView;

  useEffect(() => {
    getReply(id);
  }, [getReply, id]);


  return postReplyList.map((data, index) => {
    onSet(`replyIndex${index}`);

    return (
      <Reply id={`reply${data.id}`} key={data.id} data={data} index={index} />
    );
  });
};

export default observer(ReplyList);
