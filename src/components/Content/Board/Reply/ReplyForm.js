import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Proptypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Button } from 'reactstrap';
import useStores from '../../../../stores/useStores';
import Reply from './index';

const ReplyForm = observer(({ match }) => {
  const { params } = match;
  const { id } = params;
  const { BoardStore, ReplyStore } = useStores();
  const { replyEditId, postReplyList } = BoardStore;
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

const ReplyList = observer(({ bpId }) => {
  const { BoardStore } = useStores();
  const { getReply, postReplyList } = BoardStore;

  useEffect(() => {
    getReply(bpId);
  }, [getReply, bpId, BoardStore]);

  return postReplyList.map((data) => (
    <Reply key={data.id} data={data} />
  ));
});

const ReplyEdit = observer(() => {
  const { BoardStore } = useStores();
  const {
    onChangeReplyValue, reply, addReply,
  } = BoardStore;
  const { text } = reply;
  return (
    <>
      <CKEditorCustom
        editor={ClassicEditor}
        data={text}
        onInit={() => {}}
        onChange={(event, editor) => {
          const ReplyContent = editor.getData();
          onChangeReplyValue(ReplyContent);
        }}
        placeholder="내용을 작성해주세요."
      />
      <RightButton size="sm" color="info" onClick={addReply}>
        <FontAwesomeIcon icon={faPen} />
        &nbsp;
        댓글 쓰기
      </RightButton>
    </>
  );
});

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

const RightButton = styled(Button)`
  float : right;
`;

const CKEditorCustom = styled(CKEditor)`
  margin-bottom : 5px !important;
`;

export default ReplyForm;
