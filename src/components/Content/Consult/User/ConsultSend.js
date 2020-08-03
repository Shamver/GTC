import React, { memo } from 'react';
import {
  TabPane, FormGroup, Form, Label, CustomInput, Input, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const ConsultSend = () => {
  return (
    <TabPane tabId="send">
      <Wrapper>
        <Form>
          <FormGroup>
            <Label for="consultCategory">문의 종류</Label>
            <CustomInput type="select" id="consultCategory" name="customSelect">
              <option value="">선택</option>
              <option>버그 관련</option>
              <option>유저 관련</option>
              <option>게시글 관련</option>
              <option>포인트 관련</option>
              <option>기타</option>
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="consultSubject">제목</Label>
            <Input type="text" id="consultSubject" name="customSelect" placeHolder="제목" />
          </FormGroup>
          <FormGroup>
            <Label for="consultText">내용</Label>
            <Input
              className="text-area"
              type="textarea"
              id="consultText"
              name="customSelect"
              placeHolder="내용"
            />
          </FormGroup>
        </Form>
        <div>
          <Button color="primary">등록</Button>
        </div>
      </Wrapper>
    </TabPane>
  );
};

const Wrapper = styled.div`
  padding-top: 6px;
  
  & .text-area {
    min-height: 100px;
    max-height: 200px;
  }
`;

export default memo(observer(ConsultSend));
