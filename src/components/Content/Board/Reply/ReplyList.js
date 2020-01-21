import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyList = ({ bpId, secretReplyAllow}) => {
  const { BoardReplyStore } = useStores();
  const { getReply, postReplyList } = BoardReplyStore;

  useEffect(() => {
    getReply(bpId);
  }, [getReply, bpId]);


  return postReplyList.map((data) => (
    <Reply key={data.id} data={data} secretReplyAllow={secretReplyAllow} />
  ));
};

export default observer(ReplyList);
