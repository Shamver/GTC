import React, { memo } from 'react';
import { Button, Input } from 'reactstrap';
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
      <tr>
        <td>{code}</td>
        <td>
          <Input bsSize="sm" onChange={onChangeCode} value={name} name="name" />
        </td>
        <td>
          <Input bsSize="sm" onChange={onChangeCode} value={order} name="order" />
        </td>
        <td>
          <Input bsSize="sm" onChange={onChangeCode} value={desc} name="desc" />
        </td>
        <td>
          <Input type="select" bsSize="sm" onChange={onChangeCode} name="useFl" value={useFl}>
            <CodeFlag />
          </Input>
        </td>
        <CenterPaddingEditTd>
          <Button size="sm" color="danger" onClick={modifyCode}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </CenterPaddingEditTd>
        <CenterPaddingEditTd>
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
        </CenterPaddingEditTd>
      </tr>
    );
  }

  return (
    <tr>
      <td>{code}</td>
      <td>{codeName}</td>
      <CenterTd>{codeOrder}</CenterTd>
      <td>{codeDesc}</td>
      <CenterTd>{codeUseYN}</CenterTd>
      <CenterPaddingTd>
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
      </CenterPaddingTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={() => toggleConfirmAlert('해당 코드 그룹을 정말로 삭제하시겠습니까?', () => deleteCode(codeGroup, code))}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </CenterPaddingTd>
    </tr>
  );
};

CodeRow.propTypes = {
  data: Proptypes.shape({
    code: Proptypes.string,
    codeGroup: Proptypes.string,
    codeName: Proptypes.string,
    codeOrder: Proptypes.string,
    codeDesc: Proptypes.string,
    useYN: Proptypes.number,
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

export default memo(observer(CodeRow));
