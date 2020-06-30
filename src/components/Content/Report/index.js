import React, { memo } from 'react';
import styled from 'styled-components';
import ReportTable from './ReportTable';

const Report = () => (
  <BoardWrapper>
    <TableWrapper>
      <h3>신고 관리</h3>
      <ReportTableCol>
        <ReportTable />
      </ReportTableCol>
    </TableWrapper>
  </BoardWrapper>
);

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

const ReportTableCol = styled.div`
  width : 100%;
`;

export default memo(Report);
