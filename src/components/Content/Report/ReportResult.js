import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Table, TabPane } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import ReportResultList from './ReportResultList';

const ReportResult = () => {
  const { BoardReportStore, UtilLoadingStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { getReportList, reportDataList, activeTab } = BoardReportStore;
  const reportResultList = reportDataList.map(
    (v, index) => (<ReportResultList data={v} key={v.reportId} index={index} />),
  );

  useLayoutEffect(() => {
    loadingProcess([
      getReportList,
    ]);
  }, [activeTab, getReportList, loadingProcess]);

  return (
    <TabPane tabId="ReportResult">
      <CodeTable bordered hover>
        <thead>
          <tr>
            <ThCenter width="7%">신고ID</ThCenter>
            <th width="20%">신고 사유</th>
            <th width="10%">신고자</th>
            <th width="10%">피신고자</th>
            <th width="8%">컨텐츠</th>
            <th width="12%">신고 날짜</th>
            <th width="12%">처리 날짜</th>
            <th width="10%">처리 결과</th>
          </tr>
        </thead>
        <tbody>
          {reportResultList}
        </tbody>
      </CodeTable>
    </TabPane>
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

const ThCenter = styled.td`
  text-align: center;
  font-weight: 600;
`;

export default memo(observer(ReportResult));
