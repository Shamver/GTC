import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const CodeRow = ({ data }) => {
  const { SystemCodeStore, UtilAlertStore } = useStores();
  const { deleteCode } = SystemCodeStore;
  const { toggleConfirmAlert } = UtilAlertStore;

  const {
    code, codeGroup, codeName, codeOrder, codeDesc, codeUseYN,
  } = data;

  return (
    <tr>
      <td>{code}</td>
      <td>{codeName}</td>
      <CenterTd>{codeOrder}</CenterTd>
      <td>{codeDesc}</td>
      <CenterTd>{codeUseYN}</CenterTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger">
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
    codeOrder: Proptypes.number,
    codeDesc: Proptypes.string,
    codeUseYN: Proptypes.string,
  }).isRequired,
};

const CenterTd = styled.td`
  text-align : center;
`;

const CenterPaddingTd = styled(CenterTd)`
  padding : .4rem !important;
`;

export default CodeRow;
