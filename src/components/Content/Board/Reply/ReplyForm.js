import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';
import ReplyList from './ReplyList';
import ReplyEdit from './ReplyEdit';

const ReplyForm = observer(({ match }) => {
  const { params } = match;
  const { id } = params;
  const { ReplyStore } = useStores();
  const { replyEditId, postReplyList } = ReplyStore;
  const { modifyModeId } = ReplyStore;

  return (
    <>
      <ReplyHeader>
        <ReplyH5>
          <FontAwesomeIcon icon={faCommentDots} /> 댓글 {postReplyList.length}개
        </ReplyH5>
      </ReplyHeader>
      <ReplyListWrapper>
        <ReplyList bpId={id} />
      </ReplyListWrapper>
      { replyEditId === 0 && modifyModeId === 0
        ? (<ReplyEdit />)
        : ''}
    </>
  );
});

ReplyForm.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }).isRequired,
  }).isRequired,
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

export default ReplyForm;
