import React, { memo } from 'react';
import {
  Button, Col, Input, Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import CodeFlag from './CodeFlag';

const CodeRow = ({ data }) => {
  const { SystemCodeStore, UtilAlertStore } = useStores();
  const {
    deleteCode, codeEditModeId, onChangeCode, setCodeEditModeId,
    code: codeObject, modifyCode,
  } = SystemCodeStore;
  const { toggleConfirmAlert } = UtilAlertStore;

  const {
    code, codeGroup, codeName, codeOrder, codeDesc, useYN: codeUseYN,
    useFl: codeUseFl,
  } = data;
  const {
    name, order, desc, useFl,
  } = codeObject;

  if (code === codeEditModeId) {
    return (
      <TableBody>
        <div className="responsive-wrap-column flex-1">
          <div className="responsive-wrap">
            <ColCell className="col-1 center">
              <Input bsSize="sm" onChange={onChangeCode} value={order} name="order" />
            </ColCell>
          </div>
        </div>
        <div className="responsive-wrap-column flex-4">
          <div className="responsive-wrap">
            <ColCell className="col-2">
              {code}
            </ColCell>
            <ColCell className="col-3">
              <Input bsSize="sm" onChange={onChangeCode} value={name} name="name" />
            </ColCell>
          </div>
          <div className="responsive-wrap">
            <ColCell className="col-3">
              <Input bsSize="sm" onChange={onChangeCode} value={desc} name="desc" />
            </ColCell>
            <ColCell className="col-1 center">
              <Input type="select" bsSize="sm" onChange={onChangeCode} name="useFl" value={useFl}>
                <CodeFlag />
              </Input>
            </ColCell>
          </div>
        </div>
        <div className="responsive-wrap-column flex-4">
          <div className="responsive-wrap">
            <ColCell className="col-1 center">
              <Button size="sm" color="danger" onClick={modifyCode}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </ColCell>
          </div>
          <div className="responsive-wrap">
            <ColCell className="col-1 center">
              <Button
                size="sm"
                color="danger"
                onClick={() => setCodeEditModeId({
                  id: '',
                  name: '',
                  order: '',
                  desc: '',
                  useYN: '',
                })}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </Button>
            </ColCell>
          </div>
        </div>
      </TableBody>
    );
  }

  return (
    <TableBody>
      <div className="responsive-wrap-column flex-1">
        <div className="responsive-wrap">
          <ColCell className="col-1 center">
            {codeOrder}
          </ColCell>
        </div>
      </div>
      <div className="responsive-wrap-column flex-4">
        <div className="responsive-wrap">
          <ColCell className="col-2">
            {code}
          </ColCell>
          <ColCell className="col-3">
            {codeName}
          </ColCell>
        </div>
        <div className="responsive-wrap">
          <ColCell className="col-3">
            {codeDesc}
          </ColCell>
          <ColCell className="col-1 center">
            {codeUseYN}
          </ColCell>
        </div>
      </div>
      <div className="responsive-wrap-column flex-4">
        <div className="responsive-wrap">
          <ColCell className="col-1 center">
            <Button
              size="sm"
              color="danger"
              onClick={() => setCodeEditModeId({
                id: code,
                group: codeGroup,
                name: codeName,
                order: codeOrder,
                desc: codeDesc,
                useFl: codeUseFl,
              })}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </ColCell>
        </div>
        <div className="responsive-wrap">
          <ColCell className="col-1 center">
            <Button size="sm" color="danger" onClick={() => toggleConfirmAlert('해당 코드 그룹을 정말로 삭제하시겠습니까?', () => deleteCode(codeGroup, code))}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ColCell>
        </div>
      </div>
    </TableBody>
  );
};

CodeRow.propTypes = {
  data: Proptypes.shape({
    code: Proptypes.string,
    codeGroup: Proptypes.string,
    codeName: Proptypes.string,
    codeOrder: Proptypes.string,
    codeDesc: Proptypes.string,
    useYN: Proptypes.string,
    useFl: Proptypes.number,
  }).isRequired,
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
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &.active {
    background-color : #ffd7d4;
  }
  
  @media (max-width: 800px) {
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

export default memo(observer(CodeRow));
