import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const MyPointTableRow = ({ data }) => {
  const {
    point, pointType, date, postId,
  } = data;

  return (
    <Col className="col-sm-12">
      <TableBody>
        <ColCell className="col-3 point">
          { point } 점
        </ColCell>
        <div className="responsive-wrap">
          <ColCell className="col-4">
            { pointType } (#{ postId })
          </ColCell>
          <ColCell className="col-5">
            { date }
          </ColCell>
        </div>
      </TableBody>
    </Col>
  );
};

MyPointTableRow.propTypes = {
  data: Proptypes.shape({
    type: Proptypes.string,
    point: Proptypes.number,
    date: Proptypes.string,
    postId: Proptypes.number,
    pointType: Proptypes.string,
  }).isRequired,
};

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  
  & .responsive-wrap {
    display: contents;
  }
  
  @media (max-width: 578px) {
    & .responsive-wrap {
      display: flex;
      flex: 0 0 75%;
      flex-direction: column;
      font-size: 14px;
    }
    
    & .point {
      font-size: 15px;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
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

export default memo(MyPointTableRow);
