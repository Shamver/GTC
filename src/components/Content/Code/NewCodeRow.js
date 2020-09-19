import React, { memo } from 'react';
import {
  Button, Col, Input, Row,
} from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';
import CodeFlag from './CodeFlag';

const NewCodeRow = () => {
  const { SystemCodeStore } = useStores();
  const {
    setIsAddCode, code, onChangeCode, addCode,
  } = SystemCodeStore;
  const {
    id, name, desc, order, useYN,
  } = code;

  return (
    <TableBody>
      <div className="responsive-wrap-column flex-4">
        <div className="responsive-wrap">
          <ColCell className="col-1">
            <Input bsSize="sm" onChange={onChangeCode} name="id" value={id} placeholder="공통 코드" />
          </ColCell>
          <ColCell className="col-2">
            <Input bsSize="sm" onChange={onChangeCode} name="name" value={name} placeholder="공통 코드명" />
          </ColCell>
          <ColCell className="col-3">
            <Input bsSize="sm" onChange={onChangeCode} name="order" value={order} placeholder="순서" />
          </ColCell>
          <ColCell className="col-3">
            <Input bsSize="sm" onChange={onChangeCode} name="desc" value={desc} placeholder="공통 그룹 설명" />
          </ColCell>
          <ColCell className="col-1">
            <Input type="select" bsSize="sm" onChange={onChangeCode} name="useYN" value={useYN}>
              <CodeFlag />
            </Input>
          </ColCell>
        </div>
      </div>
      <div className="responsive-wrap-row button-section flex-2">
        <ColCell className="col-1">
          <Button size="sm" color="danger" onClick={addCode}>
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </ColCell>
        <ColCell className="col-1">
          <Button size="sm" color="danger" onClick={() => setIsAddCode(false)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>
        </ColCell>
      </div>
    </TableBody>
  );
};

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .responsive-wrap, .responsive-wrap-column, .responsive-wrap-row {
    display: contents;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  & .button-section {
    text-align: center;
  }
  
  &.active {
    background-color : #ffd7d4;
  }
  
  @media (max-width: 800px) {
    display: block !important;
  
    & .col {
      display: block !important;
      padding: 0 5px !important;
      margin: 5px 0 !important;
    }
    
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 32px;
      font-size: 14px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
    }
    
    & .responsive-wrap-row {
      display: block;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      vertical-align: middle;
    }
    
    & .flex-4 {
      flex: 4;
    }
    
    & .flex-2 {
      flex: 2;
    }
    
    & .button-section {
      text-align: right;
      justify-content: flex-end;
      padding-right: 0.7rem;
      
      & .col-1 {
        padding-left: 0.5rem;
        display: inline-block !important;
        width: inherit !important;
      }
      
      & .btn-sm {
        padding: .2rem 0.4rem;
      }
    }
    
    .info {
      color: #989898;
      font-size: 13px;
      line-height: 24px;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(observer(NewCodeRow));
