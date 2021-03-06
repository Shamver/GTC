import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import useStores from '../../../../../stores/useStores';

const ReplyModify = ({ content }) => {
  const { BoardReplyStore } = useStores();
  const { onChangeValue, modifyReply, modifyMode } = BoardReplyStore;
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo'],
        }}
        onChange={(event, editor) => onChangeValue(editor.getData())}
      />
      <Button size="sm" outline onClick={() => modifyMode(0)}>취소</Button>
      <RightButton size="sm" color="info" onClick={modifyReply}>
        <FontAwesomeIcon icon={faPen} />
        &nbsp; 댓글 수정
      </RightButton>
    </>
  );
};

ReplyModify.propTypes = {
  content: Proptypes.string.isRequired,
};

const RightButton = styled(Button)`
  float : right;
`;

export default memo(ReplyModify);
