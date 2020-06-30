import React, { useLayoutEffect, memo } from 'react';
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
import useStores from '../../../../stores/useStores';
import BoardOptionList from './BoardOptionList';
import BoardCategoryOptionList from './BoardCategoryOptionList';

const Posting = ({ match, isModify }) => {
  const {
    BoardPostStore, UtilRouteStore, UtilLoadingStore,
    SystemCodeStore,
  } = useStores();
  const {
    post, setPostBoard, onChangeValue, addPost,
    getModifyPost, modifyPost, setPostClear,
  } = BoardPostStore;
  const { goBack } = UtilRouteStore;
  const { getCodeComponent } = SystemCodeStore;
  const { loadingProcess } = UtilLoadingStore;
  const { params } = match;
  const { board, id } = params;

  useLayoutEffect(() => {
    loadingProcess([
      setPostClear,
      () => getCodeComponent(`BOARD_${board.toUpperCase()}_CATEGORY`),
      () => setPostBoard(board),
      () => getModifyPost(id, isModify),
    ]);
  }, [
    loadingProcess, setPostClear, setPostBoard, board, getModifyPost,
    isModify, id, getCodeComponent,
  ]);

  return (
    <PostingWrapper>
      <PostingHeader>
        <Col xs="12">
          <SelectInput type="select" name="board" value={post.board} onChange={onChangeValue}>
            <BoardOptionList />
          </SelectInput>
        </Col>
        <RightMarginlessCol xs="3">
          <SelectInput type="select" name="category" value={post.category} onChange={onChangeValue}>
            <BoardCategoryOptionList />
          </SelectInput>
        </RightMarginlessCol>
        <Col>
          <Input value={post.title} name="title" placeholder="제목을 입력해주세요..." onChange={onChangeValue} />
        </Col>
      </PostingHeader>
      <CKEditor
        editor={ClassicEditor}
        data={post.text}
        onChange={(event, editor) => onChangeValue(editor.getData())}
        config={
          {
            ckfinder: {
              uploadUrl: '/api/util/file/images',
            },
          }
        }
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
            <RightButton color="danger" onClick={() => modifyPost(match)}>
              <FontAwesomeIcon icon={faPen} />
              &nbsp;수정하기
            </RightButton>
          )
          : (
            <RightButton color="danger" onClick={() => addPost(match)}>
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

const RightMarginlessCol = styled(Col)`
  padding-right: 0 !important;
`;

const PostingWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
  padding : 14px;
  
  & .ck-content {
    height : 500px;
    font-family: 'Jeju Gothic', sans-serif !important;
  }
`;

const CustomCheckbox = styled(CustomInput)`
  display : inline-block !important;
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

export default memo(observer(Posting));
