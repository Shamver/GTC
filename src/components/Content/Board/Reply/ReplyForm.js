import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';
import ReplyList from './ReplyList';
import ReplyEdit from './ReplyEdit';

const ReplyForm = () => {
  const { BoardReplyStore } = useStores();
  const {
    replyEditId, postReplyList, modifyModeId, CurrentReplyOption,
  } = BoardReplyStore;
  const { commentAllowFl } = CurrentReplyOption;
  return (
    <>
      <ReplyHeader>
        <ReplyH5>
          <FontAwesomeIcon icon={faCommentDots} /> 댓글 {postReplyList.length}개
        </ReplyH5>
      </ReplyHeader>
      <ReplyListWrapper>
        <ReplyList />
      </ReplyListWrapper>
      { replyEditId === 0 && modifyModeId === 0 && commentAllowFl
        ? (<ReplyEdit />)
        : ''}
    </>
  );
};

const ReplyListWrapper = styled.div`
  margin-bottom : 40px;      
`;

const ReplyH5 = styled.h5`
  font-size: 14px;
  font-weight : bold;
`;

const ReplyHeader = styled.div`
  padding: 1em 7px 0.7em;
  color : #DC3545;
`;

export default observer(ReplyForm);
