import React, { memo } from 'react';
import styled from 'styled-components';
import {Table, TabPane} from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const ReportResult = () => {
  // const { BoardReportStore } = useStores();
  // const { reportDataList } = BoardReportStore;

  return (
    <TabPane tabId="ReportResult">
      <CodeTable bordered hover>
        <thead>
          <tr>
            <ThCenter width="6%">순서</ThCenter>
            <th width="20%">신고 사유</th>
            <th width="11%">신고자</th>
            <th width="11%">피신고자</th>
            <th width="7%">컨텐츠</th>
            <th width="12%">신고 날짜</th>
            <th width="20%">처리 결과</th>
          </tr>
        </thead>
        <tbody>
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

export default memo(observer(ReportResult));
