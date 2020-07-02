import React, { memo } from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';
import ReportList from './ReportList';
import useStores from '../../../stores/useStores';

const ReportTable = () => {
  const { BoardReportStore } = useStores();
  const { reportDataList } = BoardReportStore;
  const reportList = reportDataList.map(
    (v, index) => (<ReportList data={v} key={v.reportId} index={index} />),
  );

  return (
    <CodeTable bordered hover>
      <thead>
        <tr>
          <ThCenter width="6%">순서</ThCenter>
          <th width="20%">신고 사유</th>
          <th width="20%">신고 상세 사유</th>
          <th width="11%">신고자</th>
          <th width="11%">피신고자</th>
          <th width="7%">컨텐츠</th>
          <th width="12%">신고 날짜</th>
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

const ThCenter = styled.td`
  text-align: center;
`;

export default memo(observer(ReportTable));
