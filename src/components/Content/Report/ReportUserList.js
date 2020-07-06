import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';

const ReportUserList = ({ data, index }) => {
  const {
    userId, reason, reportDate, targetName, targetContents,
  } = data;

  return (
    <tr>
      <TdCenter>{index + 1}</TdCenter>
      <td>{reason}</td>
      <td>{userId}</td>
      <td>{targetName}</td>
      <td>{targetContents}</td>
      <td>{reportDate}</td>
      <td>{reportDate}</td>
      <td>{}</td>
    </tr>
  );
};

ReportUserList.propTypes = {
  data: Proptypes.shape({
    reportId: Proptypes.number,
    userId: Proptypes.string,
    reason: Proptypes.string,
    reasonDetail: Proptypes.string,
    targetContents: Proptypes.string,
    reportDate: Proptypes.string,
    targetName: Proptypes.string,
  }).isRequired,
  index: Proptypes.number.isRequired,
};

const TdCenter = styled.td`
  text-align: center;
`;

export default memo(ReportUserList);
