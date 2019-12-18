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
import useStores from '../../stores/useStores';

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

const Posting = (props) => {
  const { BoardStore } = useStores();
  const { post } = BoardStore;
  const { match } = props;
  const { params } = match;

  useEffect(() => {
    BoardStore.setPostBoard(params.board);
    BoardStore.setPostBoardOptions();
  }, [BoardStore, params.board]);

  return (
    <PostingWrapper>
      <PostingHeader>
        <Col xs="12">
          <SelectInput type="select" name="board" value={post.board} onChange={BoardStore.onChangeValue}>
            {BoardStore.boardList}
          </SelectInput>
        </Col>
        <Col xs="2">
          <CustomCheckbox type="select" id="bpCategory">
            <option value="FREE">자유</option>
          </CustomCheckbox>
        </Col>
        <Col>
          <Input value={post.title} placeholder="제목을 입력해주세요..." onChange={BoardStore.onChangeValue} name="title" />
        </Col>
      </PostingHeader>
      <CKEditor
        editor={ClassicEditor}
        data={post.text}
        onChange={(event, editor) => {
          const data = editor.getData();
          BoardStore.onChangeValue(data);
        }}
      />
      <PostingFooter>
        <CustomCheckbox type="checkbox" id="bpReplyAllow" label="댓글 허용" />
        <CustomCheckbox type="checkbox" id="bpSecret" label="비밀글" />
        <CustomCheckbox type="checkbox" id="bpSecretReplyAllow" label="비밀 댓글 허용" />
      </PostingFooter>
      <PostingFooter>
        <MarginButton color="secondary">작성취소</MarginButton>
        <MarginButton color="info">
          <FontAwesomeIcon icon={faChartBar} />
          &nbsp;설문 추가
        </MarginButton>
        <RightButton color="danger" onClick={BoardStore.addPost}>
          <FontAwesomeIcon icon={faPen} />
          &nbsp;쓰기
        </RightButton>
      </PostingFooter>
    </PostingWrapper>
  );
};

Posting.propTypes = {
  ContentStore: PropTypes.shape({
    post: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      board: PropTypes.string,
    }),
    setPostBoard: PropTypes.func,
    setPostBoardOptions: PropTypes.func,
    onChangeValue: PropTypes.func,
    addPost: PropTypes.func,
    boardList: PropTypes.array,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      board: PropTypes.string,
    }),
  }).isRequired,
};

Posting.defaultProps = {
  ContentStore: null,
};

export default observer(Posting);
