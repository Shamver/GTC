import React, { memo } from 'react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const ReportList = () => {
  // const { BoardReportStore } = useStores();
  // const { getDetailReport } = BoardReportStore;
  return (
    // <tr onClick={() => getDetailReport(reportId)}>
    //   <TdCenter>{index + 1}</TdCenter>
    //   <td>{reason}</td>
    //   <td>{reasonDetail}</td>
    //   <td>{userId}</td>
    //   <td>{targetName}</td>
    //   <td>{targetContents}</td>
    //   <td>{reportDate}</td>
    // </tr>
  );
};

const TdCenter = styled.td`
  text-align: center;
`;

export default memo(ReportList);