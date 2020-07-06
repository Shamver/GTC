import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Table, TabPane } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import ReportUserList from './ReportUserList';

const ReportUser = () => {
  const { BoardReportStore, UtilLoadingStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { getReportList, reportDataList, activeTab } = BoardReportStore;
  const reportUserList = reportDataList.map(
    (v, index) => (<ReportUserList data={v} key={v.reportId} index={index} />),
  );

  useLayoutEffect(() => {
    loadingProcess([
      getReportList,
    ]);
  }, [activeTab, getReportList]);

  return (
    <TabPane tabId="ReportUser">
      <CodeTable bordered hover>
        <thead>
          <tr>
            <ThCenter width="6%">순서</ThCenter>
            <th width="20%">신고 사유</th>
            <th width="11%">신고자</th>
            <th width="11%">피신고자</th>
            <th width="7%">컨텐츠</th>
            <th width="12%">신고 날짜</th>
            <th width="12%">처리 날짜</th>
            <th width="20%">처리 결과</th>
          </tr>
        </thead>
        <tbody>
          {reportUserList}
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
`;

export default memo(observer(ReportUser));
