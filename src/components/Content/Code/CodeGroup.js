import React, { memo } from 'react';
import {
  Button, Col, Input, Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const CodeGroup = ({ data }) => {
  const { SystemCodeStore, UtilAlertStore } = useStores();
  const {
    getCodeList, setGroupEditModeId, groupEditModeId, onChangeCodeGroup,
    modifyCodeGroup, codeGroup, deleteCodeGroup, code,
  } = SystemCodeStore;
  const { toggleConfirmAlert } = UtilAlertStore;

  const { groupId, groupName, groupDesc } = data;
  const { name, desc } = codeGroup;
  const { group: currentGroup } = code;

  if (groupId === groupEditModeId) {
    return (
      <TableBody>
        <div className="responsive-wrap-column">
          <div className="responsive-wrap">
            <ColCell className="col-4">
              {groupId}
            </ColCell>
          </div>
          <div className="responsive-wrap">
            <ColCell className="col-3">
              <Input bsSize="sm" onChange={onChangeCodeGroup} value={name} name="name" />
            </ColCell>
            <ColCell className="col-3">
              <Input bsSize="sm" onChange={onChangeCodeGroup} value={desc} name="desc" />
            </ColCell>
          </div>
        </div>
        <div className="responsive-wrap-column">
          <div className="responsive-wrap">
            <ColCell className="col-1">
              <Button size="sm" color="danger" onClick={modifyCodeGroup}>
                수정
              </Button>
            </ColCell>
            <ColCell className="col-1">
              <Button size="sm" color="danger" onClick={() => setGroupEditModeId({ id: '', name: '', desc: '' })}>
                취소
              </Button>
            </ColCell>
          </div>
        </div>
      </TableBody>
    );
  }

  return (
    <TableBody className={currentGroup === groupId ? 'active' : null} onClick={() => getCodeList(groupId)}>
      <div className="responsive-wrap-column flex-4">
        <div className="responsive-wrap">
          <ColCell className="col-4">
            {groupId}
          </ColCell>
        </div>
        <div className="responsive-wrap">
          <ColCell className="col-3">
            {groupName}
          </ColCell>
          <ColCell className="col-3">
            {groupDesc}
          </ColCell>
        </div>
      </div>
      <div className="responsive-wrap-column center flex-2">
        <div className="responsive-wrap">
          <ColCell className="col-1">
            <Button size="sm" color="danger" onClick={() => setGroupEditModeId({ id: groupId, name: groupName, desc: groupDesc })}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </ColCell>
          <ColCell className="col-1">
            <Button size="sm" color="danger" onClick={() => toggleConfirmAlert('해당 코드 그룹을 정말로 삭제하시겠습니까?', () => deleteCodeGroup(groupId))}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ColCell>
        </div>
      </div>
    </TableBody>
  );
};

CodeGroup.propTypes = {
  data: Proptypes.shape({
    groupId: Proptypes.string,
    groupName: Proptypes.string,
    groupDesc: Proptypes.string,
  }).isRequired,
};

const ActiveTr = styled.tr`
  &.active {
    background-color : #ffd7d4;
  }
`;

const CenterTd = styled.td`
  text-align : center;
`;

const CenterPaddingEditTd = styled(CenterTd)`
  padding : .8rem !important;
`;

const CenterPaddingTd = styled(CenterTd)`
  padding : .4rem !important;
`;

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

export default memo(observer(CodeGroup));
