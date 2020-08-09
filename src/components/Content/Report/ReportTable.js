import React, { memo } from 'react';
import styled from 'styled-components';
import { Table, TabPane } from 'reactstrap';
import { observer } from 'mobx-react';
import ReportList from './ReportList';
import useStores from '../../../stores/useStores';
import ReportBottom from './ReportBottom';

const ReportTable = () => {
  const { BoardReportStore } = useStores();
  const { reportDataList } = BoardReportStore;
  const reportList = reportDataList.map(
    (v, index) => (<ReportList data={v} key={v.reportId} index={index} />),
  );

  return (
    <TabPane tabId="reportTable">
      <CodeTable bordered hover>
        <thead>
          <tr>
            <ThCenter width="5%" />
            <ThCenter width="7%">신고ID</ThCenter>
            <th width="25%">신고 사유</th>
            <th width="15%">신고자</th>
            <th width="15%">피신고자</th>
            <th width="10%">컨텐츠</th>
            <th width="13%">신고 날짜</th>
          </tr>
        </thead>
        <tbody>
          { reportList }
        </tbody>
      </CodeTable>
      <ReportBottom />
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

export default memo(observer(ReportTable));
