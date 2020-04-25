import React from 'react';
import { Button, Input } from 'reactstrap';
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
      <tr>
        <td>{groupId}</td>
        <td>
          <Input bsSize="sm" onChange={onChangeCodeGroup} value={name} name="name" />
        </td>
        <td>
          <Input bsSize="sm" onChange={onChangeCodeGroup} value={desc} name="desc" />
        </td>
        <CenterPaddingEditTd>
          <Button size="sm" color="danger" onClick={modifyCodeGroup}>
            수정
          </Button>
        </CenterPaddingEditTd>
        <CenterPaddingEditTd>
          <Button size="sm" color="danger" onClick={() => setGroupEditModeId({ id: '', name: '', desc: '' })}>
            취소
          </Button>
        </CenterPaddingEditTd>
      </tr>
    );
  }

  return (
    <ActiveTr className={currentGroup === groupId ? 'active' : null} onClick={() => getCodeList(groupId)}>
      <td>{groupId}</td>
      <td>{groupName}</td>
      <td>{groupDesc}</td>
      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={() => setGroupEditModeId({ id: groupId, name: groupName, desc: groupDesc })}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </CenterPaddingTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={() => toggleConfirmAlert('해당 코드 그룹을 정말로 삭제하시겠습니까?', () => deleteCodeGroup(groupId))}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </CenterPaddingTd>
    </ActiveTr>
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

export default observer(CodeGroup);
