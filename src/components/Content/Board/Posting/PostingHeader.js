import React from 'react';
import { Col, Input, Row } from 'reactstrap';
import styled from 'styled-components';
import BoardOptionList from './BoardOptionList';
import BoardCategoryOptionList from './BoardCategoryOptionList';
import useStores from '../../../../stores/useStores';

const PostingHeader = () => {
  const { LoadingStore } = useStores();
  return (
    <PostingHeaderRow>
      <Col xs="12">
        <SelectInput type="select" name="board" value={post.board} onChange={onChangeValue}>
          <BoardOptionList board={board} />
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
    </PostingHeaderRow>
  );
};

const RightMarginlessCol = styled(Col)`
  padding-right: 0 !important;
`;

const PostingHeaderRow = styled(Row)`
  padding : 10px 0px;
`;

const SelectInput = styled(Input)`
  margin-bottom : 10px;
`;

export default PostingHeader;
