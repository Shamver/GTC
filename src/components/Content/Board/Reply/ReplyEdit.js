import { observer } from 'mobx-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import useStores from '../../../../stores/useStores';

const ReplyEdit = () => {
  const { BoardReplyStore } = useStores();
  const {
    onChangeReplyValue, reply, setReplyEditId, addReply, replyEditId, modifyModeId,
  } = BoardReplyStore;
  const { text } = reply;

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onInit={() => {}}
        onChange={(event, editor) => {
          const ReplyContent = editor.getData();
          onChangeReplyValue(ReplyContent);
        }}
        placeholder="내용을 작성해주세요."
      />
      { replyEditId === 0 && modifyModeId === 0 ? '' : (
        <Button size="sm" outline onClick={() => setReplyEditId(0)}>취소</Button>
      )}
      <RightButton size="sm" color="info" onClick={addReply}>
        <FontAwesomeIcon icon={faPen} />
        &nbsp;
        댓글 쓰기
      </RightButton>
    </>
  );
};

const RightButton = styled(Button)`
  float : right;
`;

export default observer(ReplyEdit);
