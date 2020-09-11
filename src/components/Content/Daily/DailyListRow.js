import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const DailyListRow = ({ data, index }) => {
  const {
    nickname, message, point, combo, time,
  } = data;

  return (
    <TableBody>
      <div className="responsive-wrap center">
        <ColCell className="col-1 center index">
          {index + 1} 등
        </ColCell>
      </div>
      <div className="responsive-wrap-column">
        <div className="responsive-wrap">
          <ColCell className="col-4">
            {message}
          </ColCell>
        </div>
        <div className="responsive-wrap info">
          <ColCell className="col-2">
            {nickname}
          </ColCell>
          <ColCell className="col-2">
            {point}<span className="point"> 포인트</span>
          </ColCell>
          <ColCell className="col-1">
            {combo}<span className="combo"> 콤보</span>
          </ColCell>
          <ColCell className="col-2">
            {time}
          </ColCell>
        </div>
      </div>
    </TableBody>
  );
};

DailyListRow.propTypes = {
  data: Proptypes.shape({
    nickname: Proptypes.string,
    message: Proptypes.string,
    point: Proptypes.number,
    combo: Proptypes.number,
    time: Proptypes.string,
  }).isRequired,
  index: Proptypes.number.isRequired,
};

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .center {
    text-align: center;
  }
  
  & .point, .combo {
    display: none;
  }
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
  }
  
  @media (max-width: 740px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 26px;
      font-size: 13px;
      flex: 1;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
      flex: 5;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      vertical-align: middle;
      padding-left: 10px;
    }
    
    .index {    
      color: #dc3545;
      font-size: 14px;    
      font-weight: 600;
      padding-left: 0;
    }
    
    .info {
      color: #989898;
      font-size: 11px;
      line-height: 24px;
    }
    
    .point, .combo {
      display: inline;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(DailyListRow);
