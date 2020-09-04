import React, { memo } from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import MyPointTableRow from './MyPointTableRow';
import useStores from '../../../stores/useStores';

const MyPointTable = () => {
  const { UserPointStore } = useStores();
  const { pointList } = UserPointStore;
  const MyPointTableData = pointList.map((v) => (<MyPointTableRow data={v} key={v.id} />));

  return (
    <>
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-3">
                포인트
              </ColCell>
              <ColCell className="col-4">
                설명
              </ColCell>
              <ColCell className="col-5">
                시간
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        <Row className="content-body">
          {MyPointTableData.length === 0 ? (
            <ColCell className="col-sm-12">
              획득한 포인트가 없습니다.
            </ColCell>
          ) : MyPointTableData}
        </Row>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 0px 1rem;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  @media (max-width: 578px) {
    & .content-header {
      display: none;
    }
    
    & .content-body {
      display: block;
    }
    
    .col {
      max-width: 100%;
    }
  }
`;

const TableHeader = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  
`;

const ColCell = styled(Col)`
  padding: 6px;
  
  &.head, &.collapse-non-active {
    border: none;
  }
  &.collapse-active {
    border: 1px solid;
  }
  &.active {
    background-color: #d9d9d9;
  }
  &.head:hover {
    background-color: #d9d9d9;
    cursor: pointer;
  }
`;


export default memo(observer(MyPointTable));
