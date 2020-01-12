import React, { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import {
  CustomInput, Button, Input, Row, Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useStores from '../../../../stores/useStores';

const Posting = (props) => {
  const { BoardStore, PostStore } = useStores();
  const { boardList, setBoardOptions } = BoardStore;
  const {
    post, setPostBoard, onChangeValue, addPost,
  } = PostStore;
  const { match } = props;
  const { params } = match;
  const { board } = params;

  useEffect(() => {
    setPostBoard(board);
    setBoardOptions();
  }, [BoardStore, board, setPostBoard, setBoardOptions]);

  return (
    <PostingWrapper>
      <PostingHeader>
        <Col xs="12">
          <SelectInput type="select" name="board" value={post.board} onChange={onChangeValue}>
            {boardList}
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
      />
      <PostingFooter>
        <CustomCheckbox type="checkbox" id="replyAllow" name="replyAllow" value="Y" label="댓글 허용" onChange={onChangeValue} />
        <CustomCheckbox type="checkbox" id="secret" name="secret" value="Y" label="비밀글" onChange={onChangeValue} />
        <CustomCheckbox type="checkbox" id="secretReplyAllow" name="secretReplyAllow" value="Y" label="비밀 댓글 허용" onChange={onChangeValue} />
      </PostingFooter>
      <PostingFooter>
        <MarginButton color="secondary">작성취소</MarginButton>
        <MarginButton color="info">
          <FontAwesomeIcon icon={faChartBar} />
          &nbsp;설문 추가
        </MarginButton>
        <RightButton color="danger" onClick={addPost}>
          <FontAwesomeIcon icon={faPen} />
          &nbsp;쓰기
        </RightButton>
      </PostingFooter>
    </PostingWrapper>
  );
};

Posting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      board: PropTypes.string,
    }),
  }).isRequired,
};

const PostingWrapper = styled.div`
  background-color : white;
  padding : 14px;
  
  & .ck-content {
    height : 500px;
    font-family: 'NanumSquareRound',sans-serif !important;
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
