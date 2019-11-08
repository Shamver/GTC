import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import {
  CustomInput, Button, Input, Row, Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

const PostingWrapper = styled.div`
  background-color : white;
  padding : 14px;
  
  & .ql-container {
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

const Posting = ({ ContentStore }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const handleChangeText = (value) => setText(value);
  const handleChangeTitle = (value) => setTitle(value);
  const AddPost = ({ history }) => {
    axios.post('api/addPost', {
      board: 'FREE',
      category: 'ALL',
      title,
      writer: 'admin',
      content: text,
      depth: 1,
    })
      .then((response) => {
        if (response.data) {
          ContentStore.history_.push('/tempBoard');
        }
      })
      .catch((response) => { console.log(response); });
  };

  return (
    <PostingWrapper>
      <PostingHeader>
        <Col xs="2">
          <CustomCheckbox type="select" id="exampleCustomSelect" name="customSelect">
            <option value="FREE">자유</option>
          </CustomCheckbox>
        </Col>
        <Col>
          <Input id="exampleEmail" placeholder="제목을 입력해주세요..." onChange={handleChangeTitle} />
        </Col>
      </PostingHeader>
      <ReactQuill value={text} onChange={handleChangeText} />
      <PostingFooter>
        <CustomCheckbox type="checkbox" id="exampleCustomCheckbox" label="댓글 허용" />
        <CustomCheckbox type="checkbox" id="exampleCustomCheckbox2" label="비밀글" />
        <CustomCheckbox type="checkbox" id="exampleCustomCheckbox3" label="비밀 댓글 허용" />
      </PostingFooter>
      <PostingFooter>
        <MarginButton color="secondary">작성취소</MarginButton>
        <MarginButton color="info">
          <FontAwesomeIcon icon={faChartBar} />
          &nbsp;설문 추가
        </MarginButton>
        <RightButton color="danger" onClick={AddPost}>
          <FontAwesomeIcon icon={faPen} />
          &nbsp;쓰기
        </RightButton>
      </PostingFooter>
    </PostingWrapper>
  );
};

export default inject('ContentStore')(Posting);
