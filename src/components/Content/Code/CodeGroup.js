import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const CodeGroup = ({ data }) => {
  const { SystemCodeStore } = useStores();
  const { getCodeList } = SystemCodeStore;
  const { group, groupName, groupDesc } = data;
  return (
    <tr onClick={() => getCodeList(group)}>
      <td>{group}</td>
      <td>{groupName}</td>
      <td>{groupDesc}</td>
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

const CenterPaddingTd = styled(CenterTd)`
  padding : .4rem !important;
`;

export default CodeGroup;
