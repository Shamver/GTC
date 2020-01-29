import { observer } from 'mobx-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, CustomInput } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import useStores from '../../../../stores/useStores';

const ReplyEdit = () => {
  const { BoardReplyStore } = useStores();
  const {
    onChangeValue, reply, setReplyEditId, addReply, replyEditId, modifyModeId,
    CurrentReplyOption,
  } = BoardReplyStore;
  const { text, secretYN } = reply;
  const { secretReplyAllow } = CurrentReplyOption;

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onInit={() => {}}
        onChange={(event, editor) => {
          const ReplyContent = editor.getData();
          onChangeValue(ReplyContent);
        }}
        placeholder="내용을 작성해주세요."
      />
      { secretReplyAllow === 'Y'
        ? (
          <>
            <CustomCheckbox type="checkbox" id="secretYN" name="secretYN" value="Y" onChange={onChangeValue} label="비밀 댓글 🔒 " checked={secretYN === 'Y'} />
          </>
        )
        : ''}
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

const CustomCheckbox = styled(CustomInput)`
  display : inline !important;
  margin-right : 10px;
  
  & label {
    padding-top : 3.2px;
    font-size : 13px !important;
  }
`;

export default observer(ReplyEdit);
