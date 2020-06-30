import React, { memo } from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import ReportList from './ReportList';

const ReportTable = () => (
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
      <ReportList />
    </tbody>
  </CodeTable>
);

const CodeTable = styled(Table)`
  & > tbody > tr {
    cursor : pointer;
  }
  
  & > tbody > tr > td {
    vertical-align: middle;
  }
`;

export default memo(ReportTable);
