import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  CustomInput, Button, Input, Row, Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import useStores from '../../../../stores/useStores';

const BoardOptions = () => {
  const { BoardStore } = useStores();
  const { boards } = BoardStore;

  return boards.map((data) => (
    <option
      value={data.value}
      key={data.value}
    >
      {data.name}
    </option>
  ));
};

const Posting = (props) => {
  const { BoardStore, BoardPostStore, UtilRouteStore } = useStores();
  const {
    post, setPostBoard, onChangeValue, addPost,
    getModifyPost, modifyPost, setPostClear,
  } = BoardPostStore;
  const { goBack } = UtilRouteStore;
  const { match, isModify } = props;
  const { params } = match;
  const { board, id } = params;

  useEffect(() => {
    setPostClear();
    setPostBoard(board);
    if (isModify) {
      getModifyPost(id, true);
    }
  }, [BoardStore, board, setPostBoard, getModifyPost, id, isModify, setPostClear]);

  return (
    <PostingWrapper>
      <PostingHeader>
        <Col xs="12">
          <SelectInput type="select" name="board" value={post.board} onChange={onChangeValue}>
            <BoardOptions />
          </SelectInput>
        </Col>
        <Col xs="2">
          <SelectInput type="select" name="category" value={post.category} onChange={onChangeValue}>
            <option value="">선택</option>
            <option value="FREE">자유</option>
            <option value="TALK">잡담</option>
          </SelectInput>
        </Col>
        <Col>
          <Input value={post.title} name="title" placeholder="제목을 입력해주세요..." onChange={onChangeValue} />
        </Col>
      </PostingHeader>
      <CKEditor
        editor={ClassicEditor}
        data={post.text}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChangeValue(data);
        }}
        config={{
          plugins: [SimpleUploadAdapter],
          simpleUpload: {
            uploadUrl: 'http://localhost:3000/uploads/image',
          },
        }}
      />
      <PostingFooter>
        <CustomCheckbox type="checkbox" id="replyAllow" name="commentAllowFl" label="댓글 허용" value={post.commentAllowFl} onChange={onChangeValue} checked={post.commentAllowFl} />
        <CustomCheckbox type="checkbox" id="secret" name="secretFl" label="비밀글" value={post.secretFl} onChange={onChangeValue} checked={post.secretFl} disabled />
        <CustomCheckbox type="checkbox" id="secretReplyAllow" name="secretCommentAllowFl" value={post.secretCommentAllowFl} label="비밀 댓글 허용" onChange={onChangeValue} checked={post.secretCommentAllowFl} />
        <CustomCheckbox type="checkbox" id="noticeFl" name="noticeFl" value={post.noticeFl} label="공지 여부" onChange={onChangeValue} checked={post.noticeFl} />
      </PostingFooter>
      <PostingFooter>
        <MarginButton onClick={goBack} color="secondary">작성취소</MarginButton>
        { isModify
          ? (
            <RightButton color="danger" onClick={modifyPost}>
              <FontAwesomeIcon icon={faPen} />
              &nbsp;수정하기
            </RightButton>
          )
          : (
            <RightButton color="danger" onClick={addPost}>
              <FontAwesomeIcon icon={faPen} />
              &nbsp;쓰기
            </RightButton>
          )}

      </PostingFooter>
    </PostingWrapper>
  );
};

Posting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      board: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
  isModify: PropTypes.bool,
};

Posting.defaultProps = {
  isModify: false,
};

const PostingWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
  padding : 14px;
  
  & .ck-content {
    height : 500px;
    font-family: 'Nanum Gothic',sans-serif !important;
  }
`;

const CustomCheckbox = styled(CustomInput)`
  display : inline !important;
  margin-right : 10px;
`;

const MarginButton = styled(Button)`
  margin-right : 5px;
`;

const RightButton = styled(Button)`
  float : right;
`;

const PostingFooter = styled.div`
  margin-top : 15px;
`;

const PostingHeader = styled(Row)`
  padding : 10px 0px;
`;

const SelectInput = styled(Input)`
  margin-bottom : 10px;
`;

export default observer(Posting);
