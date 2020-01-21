import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyList = ({ bpId }) => {
  const { BoardReplyStore } = useStores();
  const { getReply, postReplyList } = BoardReplyStore;

  useEffect(() => {
    getReply(bpId);
  }, [getReply, bpId]);


  return postReplyList.map((data) => (
    <Reply id={`reply${data.id}`} key={data.id} data={data} />
  ));
};

export default observer(ReplyList);
