import React from 'react';
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const CodeGroup = ({ data }) => {
  const { SystemCodeStore } = useStores();
  const {
    getCodeList, setGroupEditModeId, groupEditModeId, onChangeCodeGroup,
    modifyCodeGroup, codeGroup,
  } = SystemCodeStore;
  const { group, groupName, groupDesc } = data;
  const { name, desc } = codeGroup;

  if (group === groupEditModeId) {
    return (
      <tr>
        <td>{group}</td>
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
    <tr onClick={() => getCodeList(group)}>
      <td>{group}</td>
      <td>{groupName}</td>
      <td>{groupDesc}</td>
      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={() => setGroupEditModeId({ id: group, name: groupName, desc: groupDesc })}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </CenterPaddingTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </CenterPaddingTd>
    </tr>
  );
};

CodeGroup.propTypes = {
  data: Proptypes.shape({
    group: Proptypes.string,
    groupName: Proptypes.string,
    groupDesc: Proptypes.string,
  }).isRequired,
};

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
