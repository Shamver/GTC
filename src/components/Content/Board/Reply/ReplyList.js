import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyList = ({ bpId }) => {
  const { ReplyStore } = useStores();
  const { getReply, postReplyList } = ReplyStore;

  useEffect(() => {
    getReply(bpId);
  }, [getReply, bpId]);


  return postReplyList.map((data) => (
    <Reply key={data.id} data={data} />
  ));
};

export default observer(ReplyList);
