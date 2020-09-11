import React, { memo } from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import AdvertiseList from './AdvertiseList';

const WorkOnAdvertise = () => (
  <Wrapper size="sm">
    <Row className="content-header">
      <Col className="col-sm-12">
        <TableHeader>
          <ColCell className="col-4">
            닉네임
          </ColCell>
          <ColCell className="col-8">
            메시지
          </ColCell>
        </TableHeader>
      </Col>
    </Row>
    <AdvertiseList />
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 0px 1rem;
  border-bottom: 1px solid #dee2e6;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  & .center {
    text-align: center;
  }
  
  @media (max-width: 740px) {
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
  padding: 12px 6px;
`;

export default memo(WorkOnAdvertise);
