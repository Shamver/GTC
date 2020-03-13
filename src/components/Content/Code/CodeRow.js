import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';

const CodeRow = ({ data }) => {
  const {
    code, codeName, codeOrder, codeDesc, codeUseYN,
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
        <Button size="sm" color="danger">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </CenterPaddingTd>
    </tr>
  );
};

CodeRow.propTypes = {
  data: Proptypes.shape({
    code: Proptypes.string,
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
