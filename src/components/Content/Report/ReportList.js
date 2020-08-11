import React, { memo } from 'react';
import styled from 'styled-components';
import { Label, Input } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const ReportList = ({ data }) => {
  const { BoardReportStore } = useStores();
  const { getDetailReport } = BoardReportStore;
  const {
    userId, reason, reportId, reportDate, targetName, contents,
  } = data;

  return (
    <tr onClick={() => getDetailReport(reportId)}>
      <TdCenter>{reportId}</TdCenter>
      <td>{reason}</td>
      <td>{userId}</td>
      <td>{targetName}</td>
      <td>{contents}</td>
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
    reportDate: Proptypes.string,
    targetName: Proptypes.string,
    contents: Proptypes.string,
  }).isRequired,
};

const TdCenter = styled.td`
  text-align: center;
  
  label {
    margin-bottom: .5rem;
  }
  
  input {
    margin: 0 auto;
  }
`;

export default memo(observer(ReportList));
