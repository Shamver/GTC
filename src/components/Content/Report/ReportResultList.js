import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const ReportResultList = ({ data }) => {
  const { BoardReportStore } = useStores();
  const { getDetailReport } = BoardReportStore;
  const {
    userId, reason, reportDate, targetName, reportResult, rejectDate, contents, reportId,
  } = data;

  return (
    <tr onClick={() => getDetailReport(reportId)}>
      <TdCenter>{reportId}</TdCenter>
      <td>{reason}</td>
      <td>{userId}</td>
      <td>{targetName}</td>
      <td>{contents}</td>
      <td>{reportDate}</td>
      <td>{rejectDate}</td>
      <td>{reportResult}</td>
    </tr>
  );
};

ReportResultList.propTypes = {
  data: Proptypes.shape({
    reportId: Proptypes.number,
    userId: Proptypes.string,
    reason: Proptypes.string,
    reasonDetail: Proptypes.string,
    contents: Proptypes.string,
    reportDate: Proptypes.string,
    rejectDate: Proptypes.string,
    targetName: Proptypes.string,
    reportResult: Proptypes.string,
  }).isRequired,
};

const TdCenter = styled.td`
  text-align: center;
`;

export default memo(ReportResultList);
