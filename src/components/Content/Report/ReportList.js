import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const ReportList = ({ data, index }) => {
  const { BoardReportStore } = useStores();
  const { getDetailReport } = BoardReportStore;
  const {
    userId, reason, reasonDetail, reportId, reportDate, targetName, targetContents,
  } = data;

  return (
    <tr onClick={() => getDetailReport(reportId)}>
      <TdCenter>{index + 1}</TdCenter>
      <td>{reason}</td>
      <td>{reasonDetail}</td>
      <td>{userId}</td>
      <td>{targetName}</td>
      <td>{targetContents}</td>
      <td>{reportDate}</td>
    </tr>
  );
};

ReportList.propTypes = {
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

export default memo(observer(ReportList));
