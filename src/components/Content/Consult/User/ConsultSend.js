import React, { memo } from 'react';
import {
  TabPane, FormGroup, Form, Label, CustomInput, Input, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';

const ConsultSend = ({ currentPage }) => {
  const { ConsultStore } = useStores();

  const {
    consultCategoryCodeList, currentCategory, onChangeCategory,
    subject, text, onChangeValue, isDisabled, addConsult,
  } = ConsultStore;

  // eslint-disable-next-line max-len
  const categories = consultCategoryCodeList.map((v) => <option key={v.code} value={v.code}>{v.codeName}</option>);

  return (
    <TabPane tabId="send">
      <Wrapper>
        <Form>
          <FormGroup>
            <Label for="consultCategory">문의 종류</Label>
            <CustomInput
              type="select"
              id="consultCategory"
              value={currentCategory}
              onChange={onChangeCategory}
              name="customSelect"
            >
              <option value="">선택</option>
              { categories }
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="consultSubject">제목</Label>
            <Input
              type="text"
              id="consultSubject"
              value={subject}
              name="subject"
              placeholder="제목"
              maxLength={199}
              onChange={onChangeValue}
            />
          </FormGroup>
          <FormGroup>
            <Label for="consultText">내용</Label>
            <Input
              className="text-area"
              type="textarea"
              id="consultText"
              name="text"
              value={text}
              placeholder="내용"
              onChange={onChangeValue}
            />
          </FormGroup>
        </Form>
        <div>
          <Button disabled={isDisabled} color="primary" onClick={() => addConsult(currentPage)}>등록</Button>
        </div>
      </Wrapper>
    </TabPane>
  );
};

ConsultSend.propTypes = {
  currentPage: Proptypes.string.isRequired,
};

const Wrapper = styled.div`
  padding-top: 6px;
  
  & .text-area {
    min-height: 100px;
    max-height: 200px;
  }
`;

export default memo(observer(ConsultSend));
