import React, { useLayoutEffect, memo } from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';
import ReportList from './ReportList';
import useStores from '../../../stores/useStores';

const ReportTable = () => {
  const { BoardReportStore, UtilLoadingStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { reportDataList, getReportList } = BoardReportStore;

  useLayoutEffect(() => {
    loadingProcess([
      getReportList,
    ]);
  }, [loadingProcess, getReportList]);

  const reportList = reportDataList.map(
    (item) => <ReportList reportData={item} key={item.reportId} />,
  );

  return (
    <CodeTable bordered hover>
      <thead>
        <tr>
          <th>순서</th>
          <th>신고 사유</th>
          <th>신고 상세 사유</th>
          <th>신고자</th>
          <th>피신고자</th>
          <th>날짜</th>
          <th>처리</th>
        </tr>
      </thead>
      <tbody>
        { reportList }
      </tbody>
    </CodeTable>
  );
};

const CodeTable = styled(Table)`
  & > tbody > tr {
    cursor : pointer;
  }
  
  & > tbody > tr > td {
    vertical-align: middle;
  }
`;

export default memo(observer(ReportTable));
