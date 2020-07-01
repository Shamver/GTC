import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {Button, InputGroup} from 'reactstrap';
import * as Proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';

const ReportList = ({ data, index }) => {
  const {
    userId, reason, reasonDetail, typeCode, reportDate, targetName,
  } = data;

  return (
    <tr>
      <TdCenter>{index}</TdCenter>
      <td>{reason}</td>
      <td>{reasonDetail}</td>
      <td>{userId}</td>
      <td>{targetName}</td>
      <td>{typeCode}</td>
      <td>{reportDate}</td>
      <TdCenter>
        <ButtonCustom color="danger" size="sm">
          <FontAwesomeIcon icon={faUserTimes} />
          &nbsp;&nbsp;사용자 밴
        </ButtonCustom>
      </TdCenter>
    </tr>
  );
};

ReportList.propTypes = {
  data: Proptypes.shape({
    userId: Proptypes.string,
    reason: Proptypes.string,
    reasonDetail: Proptypes.string,
    typeCode: Proptypes.string,
    reportDate: Proptypes.string,
    targetName: Proptypes.string,
  }).isRequired,
  index: Proptypes.number.isRequired,
};

const TdCenter = styled.td`
  text-align: center;
`;

const ButtonCustom = styled(Button)`
`;

export default memo(ReportList);
